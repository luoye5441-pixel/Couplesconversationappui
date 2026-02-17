import { useNavigate } from 'react-router';
import { getTodayQuestion, getDayNumber, getCategoryById } from '../data/questions';
import { Heart, Sparkles, User } from 'lucide-react';
import type { ConversationState } from '../App';
import type { UserProfile } from '../App';

interface DailyQuestionProps {
  conversationState: ConversationState;
  setConversationState: React.Dispatch<React.SetStateAction<ConversationState>>;
  userProfile: UserProfile;
}

export default function DailyQuestion({ conversationState, setConversationState, userProfile }: DailyQuestionProps) {
  const navigate = useNavigate();
  const todayQuestion = getTodayQuestion();
  const dayNumber = getDayNumber();
  const category = getCategoryById(todayQuestion.categoryId);

  const handleStartAnswering = () => {
    setConversationState({
      questionId: todayQuestion.id,
      questionText: todayQuestion.text,
      category: category?.name || '',
      followUp: todayQuestion.followUp,
      player1Answer: '',
      player2Answer: '',
      currentPlayer: 1
    });
    navigate('/answering');
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFB5BA 0%, #FFA6C9 100%)', boxShadow: '0 4px 12px rgba(255, 181, 186, 0.3)' }}>
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#8B6B7A' }}>
              {userProfile.name} & {userProfile.partnerName}
            </p>
            <p className="text-xs" style={{ color: '#C4A5B3' }}>
              相恋第 {Math.floor((Date.now() - new Date(userProfile.relationshipStart).getTime()) / (1000 * 60 * 60 * 24))} 天
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
          style={{ backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}
        >
          <User className="w-5 h-5" style={{ color: '#8B6B7A' }} />
        </button>
      </div>

      {/* Streak indicator */}
      <div className="mb-8 px-4 py-3 rounded-2xl flex items-center justify-between" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: '#FFB5BA' }} />
          <span className="text-sm font-medium" style={{ color: '#8B6B7A' }}>
            连续 {userProfile.streak} 天互动
          </span>
        </div>
        <span className="text-xs" style={{ color: '#C4A5B3' }}>
          已完成 {userProfile.completedQuestions} 题
        </span>
      </div>

      {/* Main question card */}
      <div className="flex-1 flex items-center justify-center mb-8">
        <div 
          className="w-full p-8 rounded-3xl transition-all hover:scale-[1.02]" 
          style={{ 
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F7 100%)',
            boxShadow: '0 8px 24px rgba(255, 181, 186, 0.2), 0 2px 8px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Day number badge */}
          <div className="inline-flex px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#FDE2E4' }}>
            <span className="text-sm font-medium" style={{ color: '#8B6B7A' }}>
              第 {dayNumber} 天
            </span>
          </div>

          {/* Question */}
          <h1 className="text-2xl font-medium leading-relaxed mb-6" style={{ color: '#5A4553', lineHeight: '1.7' }}>
            {todayQuestion.text}
          </h1>

          {/* Category */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-full" style={{ backgroundColor: '#FFB5BA' }} />
            <span className="text-sm" style={{ color: '#C4A5B3' }}>
              {category?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        <button
          onClick={handleStartAnswering}
          className="w-full py-4 rounded-2xl font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, #FFB5BA 0%, #FFA6C9 100%)',
            boxShadow: '0 4px 16px rgba(255, 181, 186, 0.4)'
          }}
        >
          开始作答
        </button>
        <button
          onClick={() => navigate('/showcase')}
          className="w-full py-4 rounded-2xl font-medium transition-all hover:scale-[1.02]"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: '#8B6B7A',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
        >
          查看效果展示
        </button>
      </div>

      {/* Bottom decoration */}
      <div className="mt-8 text-center">
        <p className="text-xs" style={{ color: '#D4BCC8' }}>
          每天一个问题，让彼此更懂彼此
        </p>
      </div>
    </div>
  );
}
