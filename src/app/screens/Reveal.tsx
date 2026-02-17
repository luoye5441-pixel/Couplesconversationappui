import { useNavigate } from 'react-router';
import { ArrowLeft, Heart, MessageCircle, Home } from 'lucide-react';
import type { ConversationState } from '../App';

interface RevealProps {
  conversationState: ConversationState;
  setConversationState: React.Dispatch<React.SetStateAction<ConversationState>>;
}

export default function Reveal({ conversationState, setConversationState }: RevealProps) {
  const navigate = useNavigate();

  const handleSave = () => {
    alert('对话已收藏到你们的回忆库');
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#8B6B7A' }} />
        </button>
        <div className="px-4 py-2 rounded-full flex items-center gap-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
          <Heart className="w-4 h-4" style={{ color: '#FFB5BA' }} fill="#FFB5BA" />
          <span className="text-sm font-medium" style={{ color: '#8B6B7A' }}>答案揭晓</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Question */}
      <div 
        className="p-5 rounded-2xl mb-6" 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: '#8B6B7A', lineHeight: '1.7' }}>
          {conversationState.questionText}
        </p>
      </div>

      {/* Answers */}
      <div className="flex-1 space-y-5 mb-6">
        {/* Answer 1 */}
        <div 
          className="p-6 rounded-3xl" 
          style={{ 
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F7 100%)',
            boxShadow: '0 6px 20px rgba(255, 181, 186, 0.15)'
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FDE2E4' }}>
              <span className="text-sm font-medium" style={{ color: '#8B6B7A' }}>你</span>
            </div>
            <span className="text-sm font-medium" style={{ color: '#8B6B7A' }}>的回答</span>
          </div>
          <p className="text-base leading-relaxed" style={{ color: '#5A4553', lineHeight: '1.8' }}>
            {conversationState.player1Answer}
          </p>
        </div>

        {/* Answer 2 */}
        <div 
          className="p-6 rounded-3xl" 
          style={{ 
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9F5 100%)',
            boxShadow: '0 6px 20px rgba(255, 166, 201, 0.15)'
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF1E6' }}>
              <span className="text-sm font-medium" style={{ color: '#8B6B7A' }}>TA</span>
            </div>
            <span className="text-sm font-medium" style={{ color: '#8B6B7A' }}>的回答</span>
          </div>
          <p className="text-base leading-relaxed" style={{ color: '#5A4553', lineHeight: '1.8' }}>
            {conversationState.player2Answer}
          </p>
        </div>
      </div>

      {/* Conversation prompt */}
      <div 
        className="p-5 rounded-2xl mb-6" 
        style={{ 
          background: 'linear-gradient(135deg, #FFF9F5 0%, #FFF5F7 100%)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          borderLeft: '3px solid #FFB5BA'
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-4 h-4" style={{ color: '#FFB5BA' }} />
          <span className="text-xs font-medium" style={{ color: '#C4A5B3' }}>对话引导</span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#8B6B7A', lineHeight: '1.7' }}>
          {conversationState.followUp}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl font-medium transition-all hover:scale-[1.02]"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: '#8B6B7A',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
        >
          收藏本次对话
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full py-4 rounded-2xl font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
          style={{ 
            background: 'linear-gradient(135deg, #FFB5BA 0%, #FFA6C9 100%)',
            boxShadow: '0 4px 16px rgba(255, 181, 186, 0.4)'
          }}
        >
          <Home className="w-5 h-5" />
          <span>返回首页</span>
        </button>
      </div>
    </div>
  );
}
