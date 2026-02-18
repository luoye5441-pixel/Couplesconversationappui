// 中国风情侣卡牌游戏数据
// Chinese-style Couples Card Game Data

export interface Card {
  id: string;
  text: string;
  category: CardCategory;
  difficulty: '浅' | '中' | '深'; // Shallow, Medium, Deep
  followUp: string;
}

export interface CardCategory {
  id: string;
  name: string;
  element: string; // 五行 element
  color: string; // Primary color
  bgColor: string; // Background gradient start
  icon: string; // Emoji/symbol
  description: string;
}

// 五行 (Five Elements) card categories
export const cardCategories: CardCategory[] = [
  {
    id: 'fire',
    name: '火·热情',
    element: '火',
    color: '#C41E3A',
    bgColor: '#FFF1F0',
    icon: '🔥',
    description: '点燃心中的热情，分享让你心跳加速的故事',
  },
  {
    id: 'water',
    name: '水·深情',
    element: '水',
    color: '#1A5276',
    bgColor: '#EBF5FB',
    icon: '💧',
    description: '如水般柔软，探索内心深处的情感',
  },
  {
    id: 'wood',
    name: '木·成长',
    element: '木',
    color: '#1E8449',
    bgColor: '#EAFAF1',
    icon: '🌿',
    description: '像树木一样扎根，见证彼此的成长',
  },
  {
    id: 'earth',
    name: '土·踏实',
    element: '土',
    color: '#7D6608',
    bgColor: '#FEF9E7',
    icon: '⛰️',
    description: '脚踏实地，聊聊生活中平凡却珍贵的日常',
  },
  {
    id: 'metal',
    name: '金·珍贵',
    element: '金',
    color: '#8B6914',
    bgColor: '#FDF2E9',
    icon: '✨',
    description: '如金子般珍贵，分享那些最特别的时刻',
  },
];

// All cards organized by Five Elements
export const cards: Card[] = [
  // 🔥 火·热情 (Fire - Passion)
  {
    id: 'fire-01',
    text: '你第一次见到我时，心里在想什么？',
    category: cardCategories[0],
    difficulty: '浅',
    followUp: '那个第一印象现在还准确吗？',
  },
  {
    id: 'fire-02',
    text: '如果要用一个词形容我们之间的"化学反应"，你会选哪个？',
    category: cardCategories[0],
    difficulty: '中',
    followUp: '这种感觉是从什么时候开始的？',
  },
  {
    id: 'fire-03',
    text: '在一起后，你做过最疯狂的一件事是什么？',
    category: cardCategories[0],
    difficulty: '浅',
    followUp: '如果有机会，你还想再疯狂一次吗？',
  },
  {
    id: 'fire-04',
    text: '你觉得我最有魅力的时刻是什么时候？',
    category: cardCategories[0],
    difficulty: '中',
    followUp: '你知道吗，你那时候在我眼里也特别好看',
  },
  {
    id: 'fire-05',
    text: '如果我们要一起完成一个冒险清单，你最想先做哪件？',
    category: cardCategories[0],
    difficulty: '浅',
    followUp: '我们现在就可以开始计划了',
  },
  {
    id: 'fire-06',
    text: '你有没有一个关于我们的秘密幻想，从来没说过的？',
    category: cardCategories[0],
    difficulty: '深',
    followUp: '说出来以后感觉怎么样？',
  },
  {
    id: 'fire-07',
    text: '我们在一起最心跳加速的一次经历是什么？',
    category: cardCategories[0],
    difficulty: '中',
    followUp: '你希望那种感觉更多出现吗？',
  },
  {
    id: 'fire-08',
    text: '如果今晚是世界末日，你最想和我一起做什么？',
    category: cardCategories[0],
    difficulty: '深',
    followUp: '那为什么不从今天开始呢？',
  },

  // 💧 水·深情 (Water - Deep Emotion)
  {
    id: 'water-01',
    text: '你最近一次因为我而感动，是什么时候？',
    category: cardCategories[1],
    difficulty: '浅',
    followUp: '你知道那一刻对我也很特别吗？',
  },
  {
    id: 'water-02',
    text: '在你心里，"爱"这个字意味着什么？',
    category: cardCategories[1],
    difficulty: '深',
    followUp: '你觉得我们的爱符合你的定义吗？',
  },
  {
    id: 'water-03',
    text: '有没有一件小事，让你突然意识到"我真的很爱这个人"？',
    category: cardCategories[1],
    difficulty: '中',
    followUp: '那个瞬间你想过告诉我吗？',
  },
  {
    id: 'water-04',
    text: '你觉得我们之间最深的默契是什么？',
    category: cardCategories[1],
    difficulty: '中',
    followUp: '这种默契是怎么形成的？',
  },
  {
    id: 'water-05',
    text: '如果可以永远保留一段和我在一起的记忆，你选哪一段？',
    category: cardCategories[1],
    difficulty: '深',
    followUp: '为什么这段记忆对你如此珍贵？',
  },
  {
    id: 'water-06',
    text: '你最感激我为你做过的一件事是什么？',
    category: cardCategories[1],
    difficulty: '浅',
    followUp: '也许我做的时候并没有意识到它的意义',
  },
  {
    id: 'water-07',
    text: '你有没有在深夜想过关于"我们"的事？想了些什么？',
    category: cardCategories[1],
    difficulty: '深',
    followUp: '下次深夜想这些的时候，可以告诉我',
  },
  {
    id: 'water-08',
    text: '在所有我给你的东西里，哪一样对你最有意义？',
    category: cardCategories[1],
    difficulty: '中',
    followUp: '有些礼物不是用钱买的',
  },

  // 🌿 木·成长 (Wood - Growth)
  {
    id: 'wood-01',
    text: '认识我之后，你觉得自己最大的变化是什么？',
    category: cardCategories[2],
    difficulty: '中',
    followUp: '你喜欢这个变化吗？',
  },
  {
    id: 'wood-02',
    text: '你希望我们一起培养的一个新习惯是什么？',
    category: cardCategories[2],
    difficulty: '浅',
    followUp: '我们从明天就开始好不好？',
  },
  {
    id: 'wood-03',
    text: '如果我们一起去学一项新技能，你想学什么？',
    category: cardCategories[2],
    difficulty: '浅',
    followUp: '想象一下我们一起学的画面',
  },
  {
    id: 'wood-04',
    text: '在我们的关系中，你觉得自己成长最多的方面是什么？',
    category: cardCategories[2],
    difficulty: '深',
    followUp: '你觉得我有没有在同样的方面成长？',
  },
  {
    id: 'wood-05',
    text: '你最想和我一起读的一本书是什么？为什么？',
    category: cardCategories[2],
    difficulty: '浅',
    followUp: '也许我们可以一起开始读',
  },
  {
    id: 'wood-06',
    text: '有什么你曾经很害怕、但因为我而变得勇敢的事？',
    category: cardCategories[2],
    difficulty: '中',
    followUp: '你的勇气也给了我力量',
  },
  {
    id: 'wood-07',
    text: '你觉得三年后的我们，会比现在更好吗？为什么？',
    category: cardCategories[2],
    difficulty: '深',
    followUp: '我们可以一起努力，让那个未来变成现实',
  },
  {
    id: 'wood-08',
    text: '有什么事情，你希望我能教你？',
    category: cardCategories[2],
    difficulty: '浅',
    followUp: '我很乐意分享我知道的一切',
  },

  // ⛰️ 土·踏实 (Earth - Grounded)
  {
    id: 'earth-01',
    text: '你最喜欢我们一起做的日常小事是什么？',
    category: cardCategories[3],
    difficulty: '浅',
    followUp: '平凡的幸福最难得',
  },
  {
    id: 'earth-02',
    text: '你理想中周末的一天是怎样的？',
    category: cardCategories[3],
    difficulty: '浅',
    followUp: '下个周末我们就这样过好不好？',
  },
  {
    id: 'earth-03',
    text: '如果我们要一起做饭，你最想和我一起做什么菜？',
    category: cardCategories[3],
    difficulty: '浅',
    followUp: '做饭是最好的约会方式之一',
  },
  {
    id: 'earth-04',
    text: '在家里，什么时刻让你觉得最有"家"的感觉？',
    category: cardCategories[3],
    difficulty: '中',
    followUp: '我希望能给你更多这样的时刻',
  },
  {
    id: 'earth-05',
    text: '你觉得我们之间最好的分工是什么？',
    category: cardCategories[3],
    difficulty: '中',
    followUp: '好的团队合作是关系的基石',
  },
  {
    id: 'earth-06',
    text: '如果我们要养一只宠物，你想养什么？叫什么名字？',
    category: cardCategories[3],
    difficulty: '浅',
    followUp: '给它取的名字说明了什么？',
  },
  {
    id: 'earth-07',
    text: '你生病的时候，最希望我怎么照顾你？',
    category: cardCategories[3],
    difficulty: '中',
    followUp: '我会记住的',
  },
  {
    id: 'earth-08',
    text: '你觉得我们的"家"还缺少什么？',
    category: cardCategories[3],
    difficulty: '深',
    followUp: '一起把它变成我们都想要的样子',
  },

  // ✨ 金·珍贵 (Metal - Precious)
  {
    id: 'metal-01',
    text: '你最珍惜的一张我们的合照是哪张？为什么？',
    category: cardCategories[4],
    difficulty: '浅',
    followUp: '回去找找那张照片吧',
  },
  {
    id: 'metal-02',
    text: '在我们经历的所有事中，哪件最让你骄傲？',
    category: cardCategories[4],
    difficulty: '中',
    followUp: '能一起经历这些，我很幸运',
  },
  {
    id: 'metal-03',
    text: '如果要给我们的故事起个名字，你会叫什么？',
    category: cardCategories[4],
    difficulty: '中',
    followUp: '每个故事都值得被好好记录',
  },
  {
    id: 'metal-04',
    text: '你给我买过或做过的最用心的礼物是什么？',
    category: cardCategories[4],
    difficulty: '浅',
    followUp: '用心本身就是最好的礼物',
  },
  {
    id: 'metal-05',
    text: '如果要写一封信给十年后的我们，你会写什么？',
    category: cardCategories[4],
    difficulty: '深',
    followUp: '也许我们真的可以写一封，十年后打开',
  },
  {
    id: 'metal-06',
    text: '你觉得我们之间最独特的"传统"是什么？',
    category: cardCategories[4],
    difficulty: '中',
    followUp: '这些小传统是我们的专属记忆',
  },
  {
    id: 'metal-07',
    text: '如果能回到我们相遇的那天，你会做什么不同的事？',
    category: cardCategories[4],
    difficulty: '深',
    followUp: '也许一切都恰到好处',
  },
  {
    id: 'metal-08',
    text: '你想对现在的我说一句从来没说过的话吗？',
    category: cardCategories[4],
    difficulty: '深',
    followUp: '谢谢你的坦诚',
  },
];

// Shuffle cards using Fisher-Yates algorithm
export function shuffleCards(cardArray: Card[]): Card[] {
  const shuffled = [...cardArray];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get cards by category
export function getCardsByCategory(categoryId: string): Card[] {
  return cards.filter((c) => c.category.id === categoryId);
}

// Get cards by difficulty
export function getCardsByDifficulty(difficulty: Card['difficulty']): Card[] {
  return cards.filter((c) => c.difficulty === difficulty);
}

// Get a random card
export function getRandomCard(): Card {
  return cards[Math.floor(Math.random() * cards.length)];
}

// Difficulty labels and colors
export const difficultyConfig = {
  '浅': { label: '浅谈', color: '#52C41A', description: '轻松愉快的话题' },
  '中': { label: '细聊', color: '#FA8C16', description: '需要一些思考的话题' },
  '深': { label: '深入', color: '#C41E3A', description: '触及内心的话题' },
} as const;
