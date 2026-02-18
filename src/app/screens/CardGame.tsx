import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RotateCcw, Sparkles, Heart, ChevronRight } from 'lucide-react';
import {
  cards,
  cardCategories,
  shuffleCards,
  getCardsByCategory,
  difficultyConfig,
  type Card,
  type CardCategory,
} from '../data/cardGameData';

type GamePhase = 'home' | 'category' | 'playing' | 'reveal';

export default function CardGame() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<GamePhase>('home');
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<CardCategory | null>(null);

  const startGame = useCallback((categoryId?: string) => {
    const pool = categoryId ? getCardsByCategory(categoryId) : [...cards];
    setDeck(shuffleCards(pool));
    setCurrentIndex(0);
    setFlipped(false);
    setShowFollowUp(false);
    setCompletedCount(0);
    setPhase('playing');
  }, []);

  const flipCard = () => {
    if (!flipped) {
      setFlipped(true);
    }
  };

  const nextCard = () => {
    setCompletedCount((c) => c + 1);
    if (currentIndex + 1 < deck.length) {
      setFlipped(false);
      setShowFollowUp(false);
      setTimeout(() => setCurrentIndex((i) => i + 1), 300);
    } else {
      setPhase('reveal');
    }
  };

  const currentCard = deck[currentIndex];

  // ── Home Screen ──
  if (phase === 'home') {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #1A0A0A 0%, #2D0F0F 40%, #4A1A1A 100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center px-5 pt-6 pb-2">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <ArrowLeft size={20} color="#D4A574" />
          </button>
        </div>

        {/* Title Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Decorative top border */}
          <div
            className="w-48 h-[1px] mb-8"
            style={{
              background:
                'linear-gradient(90deg, transparent, #D4A574, transparent)',
            }}
          />

          {/* Main title with Chinese calligraphy style */}
          <div className="text-center mb-4">
            <div
              className="text-sm tracking-[0.5em] mb-3"
              style={{ color: '#D4A574', fontWeight: 300 }}
            >
              情侣对话
            </div>
            <h1
              className="text-5xl mb-2"
              style={{
                color: '#F5E6D3',
                fontWeight: 300,
                letterSpacing: '0.15em',
              }}
            >
              缘牌
            </h1>
            <div
              className="text-xs tracking-[0.3em]"
              style={{ color: 'rgba(212,165,116,0.6)' }}
            >
              YUAN PAI
            </div>
          </div>

          {/* Decorative element — stylized Chinese knot shape */}
          <div className="my-8 relative w-20 h-20 flex items-center justify-center">
            <div
              className="absolute w-16 h-16 rounded-full border"
              style={{ borderColor: 'rgba(212,165,116,0.3)' }}
            />
            <div
              className="absolute w-12 h-12 rounded-full border"
              style={{ borderColor: 'rgba(212,165,116,0.2)' }}
            />
            <Heart size={20} color="#C41E3A" fill="#C41E3A" />
          </div>

          <p
            className="text-center text-sm leading-7 max-w-[280px] mb-12"
            style={{ color: 'rgba(245,230,211,0.7)' }}
          >
            以五行为引，以真心为牌
            <br />
            每一张卡牌，都是通往彼此内心的一道门
          </p>

          {/* Start buttons */}
          <button
            onClick={() => startGame()}
            className="w-full max-w-[300px] py-4 rounded-2xl mb-4 transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #C41E3A, #8B1A2B)',
              color: '#F5E6D3',
              fontSize: '1rem',
              letterSpacing: '0.2em',
              boxShadow: '0 8px 32px rgba(196,30,58,0.3)',
            }}
          >
            随缘抽牌
          </button>

          <button
            onClick={() => setPhase('category')}
            className="w-full max-w-[300px] py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(212,165,116,0.3)',
              color: '#D4A574',
              fontSize: '1rem',
              letterSpacing: '0.2em',
            }}
          >
            选择主题
          </button>

          {/* Decorative bottom border */}
          <div
            className="w-48 h-[1px] mt-12"
            style={{
              background:
                'linear-gradient(90deg, transparent, #D4A574, transparent)',
            }}
          />
        </div>

        {/* Stats bar */}
        <div
          className="flex justify-center gap-8 px-6 py-6"
          style={{ color: 'rgba(212,165,116,0.5)', fontSize: '0.75rem' }}
        >
          <span>{cards.length} 张卡牌</span>
          <span>·</span>
          <span>{cardCategories.length} 大主题</span>
          <span>·</span>
          <span>三种深度</span>
        </div>
      </div>
    );
  }

  // ── Category Selection ──
  if (phase === 'category') {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #1A0A0A 0%, #2D0F0F 40%, #4A1A1A 100%)',
        }}
      >
        <div className="flex items-center px-5 pt-6 pb-4">
          <button
            onClick={() => setPhase('home')}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <ArrowLeft size={20} color="#D4A574" />
          </button>
          <h2
            className="flex-1 text-center pr-10 text-lg"
            style={{ color: '#F5E6D3', letterSpacing: '0.15em' }}
          >
            五行选牌
          </h2>
        </div>

        <div className="px-5 pt-2 pb-8">
          <p
            className="text-center text-sm mb-8"
            style={{ color: 'rgba(245,230,211,0.6)' }}
          >
            五行相生，情意相通
          </p>

          <div className="flex flex-col gap-4">
            {cardCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat);
                  startGame(cat.id);
                }}
                className="w-full rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid ${cat.color}33`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: `${cat.color}20`,
                      border: `1px solid ${cat.color}40`,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className="text-base"
                        style={{
                          color: '#F5E6D3',
                          letterSpacing: '0.1em',
                          fontWeight: 500,
                        }}
                      >
                        {cat.name}
                      </h3>
                      <ChevronRight size={18} color="rgba(212,165,116,0.4)" />
                    </div>
                    <p
                      className="text-xs leading-5"
                      style={{ color: 'rgba(245,230,211,0.5)' }}
                    >
                      {cat.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Results / Reveal ──
  if (phase === 'reveal') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{
          background: 'linear-gradient(180deg, #1A0A0A 0%, #2D0F0F 40%, #4A1A1A 100%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-6">
            <Sparkles size={40} color="#D4A574" />
          </div>
          <h2
            className="text-3xl mb-3"
            style={{
              color: '#F5E6D3',
              letterSpacing: '0.15em',
              fontWeight: 300,
            }}
          >
            缘尽今宵
          </h2>
          <p className="text-sm mb-2" style={{ color: 'rgba(245,230,211,0.6)' }}>
            今日共翻 <span style={{ color: '#D4A574' }}>{completedCount}</span> 张缘牌
          </p>
          <p
            className="text-xs leading-6 max-w-[260px] mx-auto mb-10"
            style={{ color: 'rgba(245,230,211,0.4)' }}
          >
            每一次对话，都是一次心灵的靠近
            <br />
            愿你们的爱，如水长流
          </p>

          <div
            className="w-48 h-[1px] mx-auto mb-10"
            style={{
              background:
                'linear-gradient(90deg, transparent, #D4A574, transparent)',
            }}
          />

          <button
            onClick={() => setPhase('home')}
            className="w-full max-w-[260px] py-4 rounded-2xl mb-4 transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #C41E3A, #8B1A2B)',
              color: '#F5E6D3',
              letterSpacing: '0.2em',
              boxShadow: '0 8px 32px rgba(196,30,58,0.3)',
            }}
          >
            再来一局
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full max-w-[260px] py-4 rounded-2xl transition-all hover:scale-[1.02]"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(212,165,116,0.3)',
              color: '#D4A574',
              letterSpacing: '0.2em',
            }}
          >
            回到首页
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Playing Phase ──
  const diffConf = currentCard ? difficultyConfig[currentCard.difficulty] : null;
  const catColor = currentCard?.category.color ?? '#C41E3A';

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #1A0A0A 0%, #2D0F0F 40%, #4A1A1A 100%)',
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <button
          onClick={() => setPhase('home')}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
        >
          <ArrowLeft size={20} color="#D4A574" />
        </button>

        <div className="text-center">
          <div className="text-xs" style={{ color: 'rgba(212,165,116,0.6)' }}>
            {selectedCategory?.name ?? '随缘抽牌'}
          </div>
          <div
            className="text-sm mt-0.5"
            style={{ color: '#D4A574', letterSpacing: '0.1em' }}
          >
            第 {currentIndex + 1} / {deck.length} 张
          </div>
        </div>

        <button
          onClick={() => startGame(selectedCategory?.id)}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
        >
          <RotateCcw size={18} color="#D4A574" />
        </button>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <div
          className="relative w-full max-w-[340px]"
          style={{ perspective: '1200px' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard?.id}
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{
                opacity: 1,
                rotateY: flipped ? 0 : 0,
              }}
              exit={{ opacity: 0, x: -200, rotate: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {!flipped ? (
                /* Card Back */
                <button
                  onClick={flipCard}
                  className="w-full rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    aspectRatio: '3/4.5',
                    background:
                      'linear-gradient(145deg, #2A1215 0%, #4A1A1A 50%, #2A1215 100%)',
                    border: '1px solid rgba(212,165,116,0.25)',
                    boxShadow:
                      '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,165,116,0.1)',
                  }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    {/* Corner decorations */}
                    <div
                      className="absolute top-4 left-4 w-8 h-8 border-t border-l"
                      style={{ borderColor: 'rgba(212,165,116,0.3)' }}
                    />
                    <div
                      className="absolute top-4 right-4 w-8 h-8 border-t border-r"
                      style={{ borderColor: 'rgba(212,165,116,0.3)' }}
                    />
                    <div
                      className="absolute bottom-4 left-4 w-8 h-8 border-b border-l"
                      style={{ borderColor: 'rgba(212,165,116,0.3)' }}
                    />
                    <div
                      className="absolute bottom-4 right-4 w-8 h-8 border-b border-r"
                      style={{ borderColor: 'rgba(212,165,116,0.3)' }}
                    />

                    {/* Inner decorative border */}
                    <div
                      className="absolute inset-6 rounded-2xl border"
                      style={{ borderColor: 'rgba(212,165,116,0.12)' }}
                    />

                    {/* Center pattern */}
                    <div className="relative">
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center"
                        style={{
                          background: 'rgba(196,30,58,0.15)',
                          border: '1px solid rgba(196,30,58,0.3)',
                        }}
                      >
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{
                            background: 'rgba(196,30,58,0.2)',
                            border: '1px solid rgba(196,30,58,0.4)',
                          }}
                        >
                          <span className="text-3xl" style={{ color: '#C41E3A' }}>
                            缘
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="mt-6 text-xs tracking-[0.3em]"
                      style={{ color: 'rgba(212,165,116,0.4)' }}
                    >
                      点击翻牌
                    </div>
                  </div>
                </button>
              ) : (
                /* Card Front */
                <motion.div
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="w-full rounded-3xl overflow-hidden"
                  style={{
                    aspectRatio: '3/4.5',
                    background: `linear-gradient(170deg, ${catColor}15 0%, #1E0E0E 40%, ${catColor}10 100%)`,
                    border: `1px solid ${catColor}40`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${catColor}15`,
                  }}
                >
                  <div className="w-full h-full flex flex-col p-6 relative">
                    {/* Corner decorations */}
                    <div
                      className="absolute top-4 left-4 w-6 h-6 border-t border-l"
                      style={{ borderColor: `${catColor}40` }}
                    />
                    <div
                      className="absolute top-4 right-4 w-6 h-6 border-t border-r"
                      style={{ borderColor: `${catColor}40` }}
                    />
                    <div
                      className="absolute bottom-4 left-4 w-6 h-6 border-b border-l"
                      style={{ borderColor: `${catColor}40` }}
                    />
                    <div
                      className="absolute bottom-4 right-4 w-6 h-6 border-b border-r"
                      style={{ borderColor: `${catColor}40` }}
                    />

                    {/* Category & difficulty header */}
                    <div className="flex items-center justify-between mb-6 px-2 pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{currentCard.category.icon}</span>
                        <span
                          className="text-xs"
                          style={{
                            color: catColor,
                            letterSpacing: '0.1em',
                            opacity: 0.8,
                          }}
                        >
                          {currentCard.category.name}
                        </span>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: `${diffConf?.color}20`,
                          color: diffConf?.color,
                          border: `1px solid ${diffConf?.color}40`,
                          letterSpacing: '0.1em',
                        }}
                      >
                        {diffConf?.label}
                      </div>
                    </div>

                    {/* Decorative line */}
                    <div
                      className="w-full h-[1px] mb-8"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${catColor}40, transparent)`,
                      }}
                    />

                    {/* Question text */}
                    <div className="flex-1 flex items-center justify-center px-2">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center text-xl leading-9"
                        style={{
                          color: '#F5E6D3',
                          fontWeight: 300,
                          letterSpacing: '0.05em',
                        }}
                      >
                        {currentCard.text}
                      </motion.p>
                    </div>

                    {/* Follow-up section */}
                    <div className="px-2 pb-2">
                      <div
                        className="w-full h-[1px] mb-4"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${catColor}30, transparent)`,
                        }}
                      />

                      {!showFollowUp ? (
                        <button
                          onClick={() => setShowFollowUp(true)}
                          className="w-full text-center text-xs py-2 transition-opacity hover:opacity-80"
                          style={{
                            color: `${catColor}80`,
                            letterSpacing: '0.15em',
                          }}
                        >
                          — 查看追问 —
                        </button>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center text-sm leading-6"
                          style={{
                            color: 'rgba(245,230,211,0.5)',
                            fontStyle: 'italic',
                          }}
                        >
                          「{currentCard.followUp}」
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="px-6 pb-8 pt-2">
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={nextCard}
              className="w-full py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${catColor}, ${catColor}CC)`,
                color: '#F5E6D3',
                letterSpacing: '0.2em',
                boxShadow: `0 8px 32px ${catColor}30`,
              }}
            >
              {currentIndex + 1 < deck.length ? '下一张' : '结束本轮'}
            </button>
          </motion.div>
        )}

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {deck.slice(0, Math.min(deck.length, 20)).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i < currentIndex
                    ? '#D4A574'
                    : i === currentIndex
                    ? catColor
                    : 'rgba(212,165,116,0.2)',
                transform: i === currentIndex ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
          {deck.length > 20 && (
            <span
              className="text-xs ml-1"
              style={{ color: 'rgba(212,165,116,0.3)' }}
            >
              +{deck.length - 20}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
