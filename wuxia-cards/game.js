// ╔══════════════════════════════════════╗
// ║  江湖卡牌 - 武侠水墨对战卡牌游戏     ║
// ╚══════════════════════════════════════╝

'use strict';

// ===== CARD DEFINITIONS =====
const CARD_DEFS = [
  {
    id:'zhuifeng', name:'追风', cost:1, attack:2, health:1,
    type:'assassin', icon:'风', skill:'踏雪无痕',
    desc:'冲锋：登场即可攻击',
    keywords:['charge'],
  },
  {
    id:'duyi', name:'毒医', cost:2, attack:1, health:3,
    type:'poison', icon:'毒', skill:'以毒攻毒',
    desc:'剧毒：消灭任何被此随从伤害的随从',
    keywords:['poisonous'],
  },
  {
    id:'hufa', name:'护法', cost:3, attack:2, health:6,
    type:'shield', icon:'护', skill:'金钟罩',
    desc:'嘲讽：敌方必须优先攻击此随从',
    keywords:['taunt'],
  },
  {
    id:'cike', name:'刺客', cost:3, attack:4, health:2,
    type:'assassin', icon:'刺', skill:'暗影突袭',
    desc:'冲锋：登场即可攻击',
    keywords:['charge'],
  },
  {
    id:'xiake', name:'侠客', cost:4, attack:3, health:5,
    type:'sword', icon:'侠', skill:'仗义疏财',
    desc:'登场时抽一张牌',
    keywords:[], battlecry:'drawCard',
  },
  {
    id:'huanshi', name:'幻师', cost:5, attack:3, health:4,
    type:'magic', icon:'幻', skill:'镜花水月',
    desc:'登场时召唤一个2/2的幻影',
    keywords:[], battlecry:'summonPhantom',
  },
  {
    id:'jiansheng', name:'剑圣', cost:6, attack:5, health:5,
    type:'sword', icon:'剑', skill:'万剑归宗',
    desc:'登场时对一个随机敌方随从造成3点伤害',
    keywords:[], battlecry:'damage3random',
  },
  {
    id:'daxia', name:'大侠', cost:7, attack:6, health:7,
    type:'sword', icon:'大', skill:'降龙十八掌',
    desc:'登场时对所有敌方随从造成2点伤害',
    keywords:[], battlecry:'aoe2',
  },
];

// Token card (not collectible, summoned by 幻师)
const PHANTOM_DEF = {
  id:'phantom', name:'幻影', cost:0, attack:2, health:2,
  type:'magic', icon:'影', skill:'虚无',
  desc:'幻师召唤的幻影', keywords:[], isToken:true,
};

const TYPE_NAMES = {
  sword:'剑', assassin:'刃', shield:'盾', poison:'毒',
  heal:'医', buff:'辅', magic:'道',
};

// ===== UTILITY =====
let _uid = 0;
function uid() { return ++_uid; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

// ===== GAME STATE =====
const MAX_BOARD = 7;
const MAX_HAND = 8;
const STARTING_HP = 30;
const MAX_MANA = 10;
const DECK_SIZE = 20;

let game = null;

function createPlayer(isAI) {
  return {
    isAI,
    hp: STARTING_HP,
    maxMana: 0,
    mana: 0,
    deck: [],
    hand: [],
    board: [],
    fatigue: 0,
  };
}

function createMinion(def, owner) {
  return {
    uid: uid(),
    def,
    attack: def.attack,
    health: def.health,
    maxHealth: def.health,
    canAttack: def.keywords.includes('charge'),
    hasAttacked: false,
    owner,
    justPlayed: true,
    keywords: [...def.keywords],
  };
}

function buildDeck() {
  // 8 unique cards: low-cost cards get 3 copies, high-cost get 2 → exactly 20
  // Cost 1-3: 3 copies each (4 cards × 3 = 12)
  // Cost 4-7: 2 copies each (4 cards × 2 = 8)
  // Total: 12 + 8 = 20
  let pool = [];
  for (const d of CARD_DEFS) {
    const copies = d.cost <= 3 ? 3 : 2;
    for (let i = 0; i < copies; i++) pool.push(d);
  }
  return shuffle(pool).slice(0, DECK_SIZE);
}

function initGame() {
  _uid = 0;
  game = {
    player: createPlayer(false),
    opponent: createPlayer(true),
    turn: 0,
    phase: 'battle', // 'battle' | 'gameover'
    isPlayerTurn: true,
    selectedHandIndex: -1,
    selectedAttackerUid: -1,
    animating: false,
    stats: { playerDamageDealt:0, opponentDamageDealt:0, cardsPlayed:0, minionsKilled:0, turnsPlayed:0 },
  };
  game.player.deck = buildDeck();
  game.opponent.deck = buildDeck();

  // Mulligan: draw 3
  for (let i = 0; i < 3; i++) {
    drawCard(game.player);
    drawCard(game.opponent);
  }

  // Start turn 1
  startTurn();
}

// ===== CORE GAME LOGIC =====
function drawCard(player) {
  if (player.deck.length === 0) {
    player.fatigue++;
    player.hp -= player.fatigue;
    showDamageNumber(player.isAI ? 'opp' : 'player', player.fatigue);
    return null;
  }
  if (player.hand.length >= MAX_HAND) {
    player.deck.pop(); // burn
    return null;
  }
  const card = player.deck.pop();
  player.hand.push(card);
  return card;
}

function startTurn() {
  const p = game.isPlayerTurn ? game.player : game.opponent;
  game.turn++;
  game.stats.turnsPlayed++;

  // Gain mana
  if (p.maxMana < MAX_MANA) p.maxMana++;
  p.mana = p.maxMana;

  // Wake up minions
  for (const m of p.board) {
    m.canAttack = true;
    m.hasAttacked = false;
    m.justPlayed = false;
  }

  // Draw card
  drawCard(p);

  // End-of-turn heals on current player's minions are already handled in endTurn
  game.selectedHandIndex = -1;
  game.selectedAttackerUid = -1;

  render();

  if (!game.isPlayerTurn) {
    disableUI();
    setTimeout(() => aiTurn(), 800);
  } else {
    enableUI();
    showBattleMsg('你的回合', 800);
  }
}

function playCard(player, handIndex) {
  const def = player.hand[handIndex];
  if (!def || player.mana < def.cost) return false;
  if (player.board.length >= MAX_BOARD) return false;

  player.mana -= def.cost;
  player.hand.splice(handIndex, 1);
  game.stats.cardsPlayed++;

  const minion = createMinion(def, player === game.player ? 'player' : 'opponent');
  player.board.push(minion);

  // Ink splash effect
  spawnInkSplash(player === game.player ? 'player-board' : 'opponent-board');

  // Execute battlecry
  const enemy = player === game.player ? game.opponent : game.player;
  executeBattlecry(def.battlecry, player, enemy, minion);

  cleanDead();
  if (checkGameOver()) return true;
  render();
  return true;
}

function executeBattlecry(bc, owner, enemy, minion) {
  if (!bc) return;
  switch (bc) {
    case 'drawCard':
      drawCard(owner);
      break;
    case 'summonPhantom':
      if (owner.board.length < MAX_BOARD) {
        const phantom = createMinion(PHANTOM_DEF, minion.owner);
        phantom.canAttack = false;
        phantom.justPlayed = true;
        owner.board.push(phantom);
      }
      break;
    case 'damage3random': {
      const targets = enemy.board.filter(m => !m.keywords.includes('elusive'));
      if (targets.length > 0) {
        const t = pick(targets);
        t.health -= 3;
        showDamageNumber('minion-' + t.uid, 3);
      }
      break;
    }
    case 'aoe2':
      for (const m of enemy.board) {
        m.health -= 2;
        showDamageNumber('minion-' + m.uid, 2);
      }
      break;
  }
}

function doAttack(attackerUid, targetUid) {
  const attacker = findMinion(attackerUid);
  if (!attacker || attacker.hasAttacked || !attacker.canAttack) return false;

  const aOwner = attacker.owner === 'player' ? game.player : game.opponent;
  const enemy = attacker.owner === 'player' ? game.opponent : game.player;

  // Check taunt
  const tauntMinions = enemy.board.filter(m => m.keywords.includes('taunt'));

  if (targetUid === 'hero') {
    if (tauntMinions.length > 0) return false;
    enemy.hp -= attacker.attack;
    game.stats[attacker.owner === 'player' ? 'playerDamageDealt' : 'opponentDamageDealt'] += attacker.attack;
    attacker.hasAttacked = true;
    attacker.canAttack = false;
    showDamageNumber(enemy.isAI ? 'opp' : 'player', attacker.attack);
    animateAttack(attackerUid);
  } else {
    const target = findMinion(targetUid);
    if (!target) return false;
    if (tauntMinions.length > 0 && !target.keywords.includes('taunt')) return false;

    // Combat
    target.health -= attacker.attack;
    attacker.health -= target.attack;

    // Poisonous check
    if (attacker.keywords.includes('poisonous') && target.health > 0) target.health = 0;
    if (target.keywords.includes('poisonous') && attacker.health > 0) attacker.health = 0;

    attacker.hasAttacked = true;
    attacker.canAttack = false;

    showDamageNumber('minion-' + target.uid, attacker.attack);
    if (target.attack > 0) showDamageNumber('minion-' + attacker.uid, target.attack);
    animateAttack(attackerUid);
  }

  cleanDead();
  if (checkGameOver()) return true;
  render();
  return true;
}

function endTurn() {
  const p = game.isPlayerTurn ? game.player : game.opponent;

  game.isPlayerTurn = !game.isPlayerTurn;
  game.selectedHandIndex = -1;
  game.selectedAttackerUid = -1;
  startTurn();
}

function findMinion(mUid) {
  for (const m of game.player.board) if (m.uid === mUid) return m;
  for (const m of game.opponent.board) if (m.uid === mUid) return m;
  return null;
}

function cleanDead() {
  const countBefore = game.player.board.length + game.opponent.board.length;
  game.player.board = game.player.board.filter(m => m.health > 0);
  game.opponent.board = game.opponent.board.filter(m => m.health > 0);
  const countAfter = game.player.board.length + game.opponent.board.length;
  game.stats.minionsKilled += (countBefore - countAfter);
}

function checkGameOver() {
  if (game.phase === 'gameover') return true;
  if (game.player.hp <= 0 || game.opponent.hp <= 0) {
    game.phase = 'gameover';
    const won = game.opponent.hp <= 0;
    setTimeout(() => showGameOver(won), 600);
    return true;
  }
  return false;
}

// ===== AI LOGIC =====
async function aiTurn() {
  game.animating = true;
  await sleep(500);

  const ai = game.opponent;
  const player = game.player;

  // Phase 1: Play cards
  let played = true;
  while (played) {
    played = false;
    // Sort by cost descending for greedy play
    const playable = ai.hand
      .map((d, i) => ({ def: d, idx: i }))
      .filter(c => c.def.cost <= ai.mana && ai.board.length < MAX_BOARD)
      .sort((a, b) => b.def.cost - a.def.cost);

    if (playable.length > 0) {
      const choice = playable[0];
      playCard(ai, choice.idx);
      render();
      await sleep(600);
      if (game.phase === 'gameover') { game.animating = false; return; }
      played = true;
    }
  }

  // Phase 2: Attack with minions
  for (const m of [...ai.board]) {
    if (!m.canAttack || m.hasAttacked) continue;
    await sleep(400);

    const tauntTargets = player.board.filter(t => t.keywords.includes('taunt'));
    if (tauntTargets.length > 0) {
      // Must attack taunt
      const target = pickBestAttackTarget(m, tauntTargets);
      doAttack(m.uid, target.uid);
    } else if (player.board.length > 0) {
      // Try favorable trade or go face
      const canKill = player.board.filter(t =>
        t.health <= m.attack && !t.keywords.includes('elusive')
      );
      if (canKill.length > 0) {
        // Kill the highest value target
        const best = canKill.sort((a, b) => b.def.cost - a.def.cost)[0];
        doAttack(m.uid, best.uid);
      } else if (m.attack >= 3 || player.board.length === 0) {
        // Go face with big minions
        doAttack(m.uid, 'hero');
      } else {
        // Trade with weakest enemy
        const targets = player.board.filter(t => !t.keywords.includes('elusive'));
        if (targets.length > 0) {
          const weakest = targets.sort((a, b) => a.health - b.health)[0];
          doAttack(m.uid, weakest.uid);
        } else {
          doAttack(m.uid, 'hero');
        }
      }
    } else {
      doAttack(m.uid, 'hero');
    }

    render();
    if (game.phase === 'gameover') { game.animating = false; return; }
  }

  await sleep(400);
  game.animating = false;
  endTurn();
}

function pickBestAttackTarget(attacker, targets) {
  // Prefer to kill targets without dying
  const canKillAndLive = targets.filter(t =>
    t.health <= attacker.attack && t.attack < attacker.health
  );
  if (canKillAndLive.length > 0) {
    return canKillAndLive.sort((a, b) => b.def.cost - a.def.cost)[0];
  }
  // Otherwise just kill anything
  const canKill = targets.filter(t => t.health <= attacker.attack);
  if (canKill.length > 0) return canKill.sort((a, b) => b.def.cost - a.def.cost)[0];
  // Otherwise attack weakest
  return targets.sort((a, b) => a.health - b.health)[0];
}

// ===== RENDERING =====
function render() {
  if (!game || game.phase !== 'battle') return;

  // Opponent info
  $('#opp-hp').textContent = '❤ ' + game.opponent.hp;
  $('#opp-mana').textContent = '💎 ' + game.opponent.mana + '/' + game.opponent.maxMana;
  $('#opp-deck-count').textContent = '牌库: ' + game.opponent.deck.length;
  flashIfChanged('opp-hp', game.opponent.hp);

  // Player info
  $('#player-hp').textContent = '❤ ' + game.player.hp;
  $('#player-mana').textContent = '💎 ' + game.player.mana + '/' + game.player.maxMana;
  flashIfChanged('player-hp', game.player.hp);

  // Turn indicator
  $('#turn-indicator').textContent = '第 ' + Math.ceil(game.turn / 2) + ' 回合';

  // Opponent hand
  renderOpponentHand();
  // Boards
  renderBoard('opponent-board', game.opponent.board, false);
  renderBoard('player-board', game.player.board, true);
  // Player hand
  renderPlayerHand();

  // End turn button
  const btn = $('#btn-end-turn');
  if (game.isPlayerTurn && !game.animating) {
    btn.classList.remove('disabled');
  } else {
    btn.classList.add('disabled');
  }

  // Hero target zone
  updateHeroTarget();
}

const _prevHp = { 'opp-hp': STARTING_HP, 'player-hp': STARTING_HP };
function flashIfChanged(id, newVal) {
  if (_prevHp[id] !== undefined && _prevHp[id] !== newVal) {
    const el = $('#' + id);
    el.classList.remove('damaged');
    void el.offsetWidth;
    el.classList.add('damaged');
  }
  _prevHp[id] = newVal;
}

function renderOpponentHand() {
  const zone = $('#opponent-hand');
  zone.innerHTML = '';
  for (let i = 0; i < game.opponent.hand.length; i++) {
    const el = document.createElement('div');
    el.className = 'card-back';
    zone.appendChild(el);
  }
}

function renderPlayerHand() {
  const zone = $('#player-hand');
  zone.innerHTML = '';
  const hand = game.player.hand;
  for (let i = 0; i < hand.length; i++) {
    const def = hand[i];
    const el = document.createElement('div');
    el.className = 'hand-card';
    const canPlay = game.isPlayerTurn && !game.animating &&
      def.cost <= game.player.mana && game.player.board.length < MAX_BOARD;

    if (!canPlay && game.isPlayerTurn) el.classList.add('unplayable');
    if (i === game.selectedHandIndex) el.classList.add('selected');

    const kwText = def.keywords.map(k => ({ charge:'冲锋', taunt:'嘲讽', poisonous:'剧毒', elusive:'闪避' }[k] || '')).join(' ');

    el.innerHTML = `
      <div class="hc-top">
        <span class="hc-cost">${def.cost}</span>
        <span class="hc-kw">${kwText}</span>
      </div>
      <div class="hc-body"><span class="hc-icon">${def.icon}</span></div>
      <div class="hc-name">${def.name}</div>
      <div class="hc-skill">${def.desc}</div>
      <div class="hc-bottom">
        <span class="hc-atk">⚔${def.attack}</span>
        <span class="hc-hp">♥${def.health}</span>
      </div>
    `;

    el.addEventListener('click', () => onHandCardClick(i));
    el.addEventListener('contextmenu', (e) => { e.preventDefault(); showCardDetail(def); });
    zone.appendChild(el);
  }
}

function renderBoard(zoneId, board, isPlayer) {
  const zone = $('#' + zoneId);
  zone.innerHTML = '';
  for (const m of board) {
    const el = document.createElement('div');
    el.className = 'minion';
    el.id = 'minion-' + m.uid;

    if (m.keywords.includes('taunt')) el.classList.add('taunt');
    if (m.justPlayed) el.classList.add('just-played');

    if (isPlayer && game.isPlayerTurn && !game.animating) {
      if (m.canAttack && !m.hasAttacked) el.classList.add('can-attack');
      if (m.uid === game.selectedAttackerUid) el.classList.add('selected');
    }

    // Mark targetable enemies
    if (!isPlayer && game.selectedAttackerUid > 0 && game.isPlayerTurn) {
      const attacker = findMinion(game.selectedAttackerUid);
      if (attacker) {
        const tauntMinions = game.opponent.board.filter(t => t.keywords.includes('taunt'));
        if (tauntMinions.length === 0 || m.keywords.includes('taunt')) {
          el.classList.add('targetable');
        }
      }
    }

    const sleeping = isPlayer && m.justPlayed && !m.keywords.includes('charge');
    const hpClass = m.health < m.maxHealth ? 'hurt' : '';

    let kwBadge = '';
    if (m.keywords.includes('taunt')) kwBadge = '盾';
    else if (m.keywords.includes('poisonous')) kwBadge = '毒';
    else if (m.keywords.includes('elusive')) kwBadge = '隐';

    el.innerHTML = `
      ${sleeping ? '<span class="m-sleeping">zzz</span>' : ''}
      ${kwBadge ? '<span class="m-kw">' + kwBadge + '</span>' : ''}
      <span class="m-icon">${m.def.icon}</span>
      <span class="m-name">${m.def.name}</span>
      <div class="m-stats">
        <span class="m-atk">⚔${m.attack}</span>
        <span class="m-hp ${hpClass}">♥${m.health}</span>
      </div>
    `;

    el.addEventListener('click', () => onMinionClick(m.uid, isPlayer));
    zone.appendChild(el);
  }
}

function updateHeroTarget() {
  const zone = $('#opp-hero-target');
  if (game.selectedAttackerUid > 0 && game.isPlayerTurn) {
    const tauntMinions = game.opponent.board.filter(m => m.keywords.includes('taunt'));
    if (tauntMinions.length === 0) {
      zone.classList.add('active');
    } else {
      zone.classList.remove('active');
    }
  } else {
    zone.classList.remove('active');
  }
}

// ===== EVENT HANDLERS =====
function onHandCardClick(index) {
  if (!game.isPlayerTurn || game.animating) return;
  const def = game.player.hand[index];
  if (!def) return;

  if (game.selectedHandIndex === index) {
    // Double-tap to play
    if (def.cost <= game.player.mana && game.player.board.length < MAX_BOARD) {
      game.selectedHandIndex = -1;
      game.selectedAttackerUid = -1;
      playCard(game.player, index);
      if (game.phase !== 'gameover') render();
    }
    return;
  }

  // Long-press shows detail (handled by contextmenu), tap selects
  game.selectedHandIndex = index;
  game.selectedAttackerUid = -1;
  render();
}

function onMinionClick(mUid, isPlayerMinion) {
  if (!game.isPlayerTurn || game.animating) return;

  if (isPlayerMinion) {
    const m = findMinion(mUid);
    if (!m || m.hasAttacked || !m.canAttack) {
      // Show card detail on tap if can't attack
      showCardDetail(m.def);
      return;
    }
    if (game.selectedAttackerUid === mUid) {
      game.selectedAttackerUid = -1;
    } else {
      game.selectedAttackerUid = mUid;
      game.selectedHandIndex = -1;
    }
    render();
  } else {
    // Enemy minion clicked — attack target
    if (game.selectedAttackerUid > 0) {
      doAttack(game.selectedAttackerUid, mUid);
      game.selectedAttackerUid = -1;
      if (game.phase !== 'gameover') render();
    } else {
      // Show card detail
      const m = findMinion(mUid);
      if (m) showCardDetail(m.def);
    }
  }
}

function onHeroTargetClick() {
  if (!game.isPlayerTurn || game.animating) return;
  if (game.selectedAttackerUid > 0) {
    doAttack(game.selectedAttackerUid, 'hero');
    game.selectedAttackerUid = -1;
    if (game.phase !== 'gameover') render();
  }
}

function onEndTurnClick() {
  if (!game.isPlayerTurn || game.animating) return;
  disableUI();
  endTurn();
}

// ===== VISUAL EFFECTS =====
function spawnInkSplash(zoneId) {
  const zone = $('#' + zoneId);
  if (!zone) return;
  const rect = zone.getBoundingClientRect();
  const appRect = $('#app').getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'ink-splash';
  el.style.left = (rect.left - appRect.left + rect.width / 2 - 30) + 'px';
  el.style.top = (rect.top - appRect.top + rect.height / 2 - 30) + 'px';
  $('#fx-layer').appendChild(el);
  setTimeout(() => el.remove(), 700);
}

function showDamageNumber(targetId, amount) {
  const el = document.createElement('div');
  el.className = 'damage-number';
  el.textContent = '-' + amount;

  let target;
  if (targetId === 'opp') target = $('#opponent-info');
  else if (targetId === 'player') target = $('#player-info');
  else target = $('#' + targetId);

  if (!target) {
    $('#fx-layer').appendChild(el);
    el.style.left = '50%';
    el.style.top = '50%';
    setTimeout(() => el.remove(), 900);
    return;
  }

  const rect = target.getBoundingClientRect();
  const appRect = $('#app').getBoundingClientRect();
  el.style.left = (rect.left - appRect.left + rect.width / 2 - 10) + 'px';
  el.style.top = (rect.top - appRect.top + rect.height / 2 - 15) + 'px';
  $('#fx-layer').appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function showHealNumber(targetId, amount) {
  const el = document.createElement('div');
  el.className = 'damage-number heal-number';
  el.textContent = '+' + amount;

  const target = targetId === 'opp' ? $('#opponent-info') : $('#player-info');
  const rect = target.getBoundingClientRect();
  const appRect = $('#app').getBoundingClientRect();
  el.style.left = (rect.left - appRect.left + rect.width / 2 - 10) + 'px';
  el.style.top = (rect.top - appRect.top + rect.height / 2 - 15) + 'px';
  $('#fx-layer').appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function animateAttack(mUid) {
  const el = $('#minion-' + mUid);
  if (el) {
    el.classList.add('attacked');
    setTimeout(() => el.classList.remove('attacked'), 400);
  }
}

function showBattleMsg(text, duration) {
  const el = $('#battle-msg');
  el.textContent = text;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), duration || 1000);
}

function disableUI() {
  $('#btn-end-turn').classList.add('disabled');
}
function enableUI() {
  $('#btn-end-turn').classList.remove('disabled');
}

// ===== CARD DETAIL =====
function showCardDetail(def) {
  const overlay = $('#card-detail');
  const kwNames = def.keywords.filter(k => k !== 'endHeal1')
    .map(k => ({ charge:'冲锋', taunt:'嘲讽', poisonous:'剧毒', elusive:'闪避' }[k] || k)).join('、');

  $('#card-detail-content').innerHTML = `
    <div class="cd-cost">${def.cost}</div>
    <div class="cd-icon">${def.icon}</div>
    <div class="cd-name">${def.name}</div>
    <div class="cd-type">${TYPE_NAMES[def.type] || def.type}${kwNames ? ' · ' + kwNames : ''}</div>
    <div class="cd-line"></div>
    <div class="cd-skill-name">${def.skill}</div>
    <div class="cd-skill-desc">${def.desc}</div>
    <div class="cd-stats">
      <div class="s"><div class="v cd-atk">⚔ ${def.attack}</div><div class="l">攻击</div></div>
      <div class="s"><div class="v cd-hp-val">♥ ${def.health}</div><div class="l">生命</div></div>
    </div>
  `;
  overlay.classList.remove('hidden');
}

function hideCardDetail() {
  $('#card-detail').classList.add('hidden');
}

// ===== SCREENS =====
function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $('#' + id).classList.add('active');
}

function showGameOver(won) {
  const title = $('#gameover-title');
  const sub = $('#gameover-sub');
  const stats = $('#gameover-stats');

  title.textContent = won ? '胜' : '败';
  title.className = 'gameover-title' + (won ? ' victory' : '');
  sub.textContent = won ? '江湖路远，大侠好走！' : '胜败乃兵家常事，来日再战。';

  stats.innerHTML = `
    <div class="gs"><div class="num">${Math.ceil(game.turn/2)}</div><div class="label">回合数</div></div>
    <div class="gs"><div class="num">${game.stats.cardsPlayed}</div><div class="label">出牌数</div></div>
    <div class="gs"><div class="num">${game.stats.playerDamageDealt}</div><div class="label">造成伤害</div></div>
  `;

  // Save record
  saveRecord(won);
  showScreen('gameover-screen');
}

// ===== COLLECTION =====
function renderCollection() {
  const grid = $('#collection-grid');
  grid.innerHTML = '';
  for (const def of CARD_DEFS) {
    const el = document.createElement('div');
    el.className = 'col-card';
    el.innerHTML = `
      <span class="cc-cost">${def.cost}</span>
      <span class="cc-icon">${def.icon}</span>
      <span class="cc-name">${def.name}</span>
      <span class="cc-stats">⚔${def.attack} ♥${def.health}</span>
    `;
    el.addEventListener('click', () => showCardDetail(def));
    grid.appendChild(el);
  }
}

// ===== RECORDS =====
function getRecords() {
  try {
    return JSON.parse(localStorage.getItem('wuxia_records') || '{"wins":0,"losses":0,"games":[]}');
  } catch { return { wins: 0, losses: 0, games: [] }; }
}

function saveRecord(won) {
  const rec = getRecords();
  if (won) rec.wins++; else rec.losses++;
  rec.games.push({
    date: new Date().toLocaleDateString('zh-CN'),
    won,
    turns: Math.ceil(game.turn / 2),
    damage: game.stats.playerDamageDealt,
  });
  // Keep last 50
  if (rec.games.length > 50) rec.games = rec.games.slice(-50);
  localStorage.setItem('wuxia_records', JSON.stringify(rec));
}

function renderRecords() {
  const rec = getRecords();
  const total = rec.wins + rec.losses;
  const winRate = total > 0 ? Math.round(rec.wins / total * 100) : 0;
  const content = $('#records-content');

  let recentHTML = '';
  const recent = [...rec.games].reverse().slice(0, 10);
  for (const g of recent) {
    recentHTML += `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,26,14,.06);font-size:13px">
      <span style="color:${g.won ? '#c41e3a' : '#8b7355'}">${g.won ? '胜' : '败'}</span>
      <span style="color:#8b7355">${g.turns}回合</span>
      <span style="color:#8b7355">伤害 ${g.damage}</span>
      <span style="color:#a08b6f">${g.date}</span>
    </div>`;
  }

  content.innerHTML = `
    <div class="rec-stat-box">
      <div class="big-num">${total}</div>
      <div class="label">总对战场次</div>
    </div>
    <div class="rec-row">
      <div class="rec-cell"><div class="num" style="color:#c41e3a">${rec.wins}</div><div class="label">胜场</div></div>
      <div class="rec-cell"><div class="num">${rec.losses}</div><div class="label">败场</div></div>
      <div class="rec-cell"><div class="num">${winRate}%</div><div class="label">胜率</div></div>
    </div>
    <div style="margin-top:20px">
      <h3 style="font-size:16px;color:#5a4630;letter-spacing:.1em;margin-bottom:10px">近期战绩</h3>
      ${recentHTML || '<p style="color:#a08b6f;font-size:13px">暂无战绩记录</p>'}
    </div>
  `;
}

function renderMenuStats() {
  const rec = getRecords();
  const total = rec.wins + rec.losses;
  if (total > 0) {
    $('#menu-stats').textContent = `战绩 ${rec.wins}胜 ${rec.losses}败`;
  } else {
    $('#menu-stats').textContent = '踏入江湖，开始你的第一场对决';
  }
}

// ===== INIT =====
function init() {
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  // Menu buttons
  $('#btn-start').addEventListener('click', () => {
    initGame();
    showScreen('battle-screen');
    render();
  });

  $('#btn-collection').addEventListener('click', () => {
    renderCollection();
    showScreen('collection-screen');
  });

  $('#btn-records').addEventListener('click', () => {
    renderRecords();
    showScreen('records-screen');
  });

  $('#btn-col-back').addEventListener('click', () => showScreen('menu-screen'));
  $('#btn-rec-back').addEventListener('click', () => showScreen('menu-screen'));

  // Battle controls
  $('#btn-end-turn').addEventListener('click', onEndTurnClick);
  $('#opp-hero-target').addEventListener('click', onHeroTargetClick);

  // Card detail dismiss
  $('#card-detail').addEventListener('click', (e) => {
    if (e.target === $('#card-detail')) hideCardDetail();
  });

  // Game over buttons
  $('#btn-play-again').addEventListener('click', () => {
    initGame();
    showScreen('battle-screen');
    render();
  });
  $('#btn-back-menu').addEventListener('click', () => {
    renderMenuStats();
    showScreen('menu-screen');
  });

  // Deselect on empty board click
  $('#player-board').addEventListener('click', (e) => {
    if (e.target === $('#player-board') && game && game.selectedHandIndex >= 0) {
      const def = game.player.hand[game.selectedHandIndex];
      if (def && def.cost <= game.player.mana && game.player.board.length < MAX_BOARD) {
        const idx = game.selectedHandIndex;
        game.selectedHandIndex = -1;
        game.selectedAttackerUid = -1;
        playCard(game.player, idx);
        if (game.phase !== 'gameover') render();
      }
    }
  });

  renderMenuStats();
  showScreen('menu-screen');
}

document.addEventListener('DOMContentLoaded', init);
