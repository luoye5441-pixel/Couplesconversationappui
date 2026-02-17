import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Send } from 'lucide-react';
import type { ConversationState } from '../App';

interface AnsweringProps {
  conversationState: ConversationState;
  setConversationState: React.Dispatch<React.SetStateAction<ConversationState>>;
}

export default function Answering({ conversationState, setConversationState }: AnsweringProps) {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const maxLength = 300;

  const handleSubmit = () => {
    if (!answer.trim()) return;

    if (conversationState.currentPlayer === 1) {
      setConversationState(prev => ({
        ...prev,
        player1Answer: answer,
        currentPlayer: 2
      }));
      // Show handoff message
      alert('请将手机交给对方');
      setAnswer('');
    } else {
      setConversationState(prev => ({
        ...prev,
        player2Answer: answer
      }));
      navigate('/reveal');
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-8 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#8B6B7A' }} />
        </button>
        <div>
          <p className="text-sm font-medium" style={{ color: '#8B6B7A' }}>
            {conversationState.currentPlayer === 1 ? '对方 1' : '对方 2'} 正在作答
          </p>
          <p className="text-xs" style={{ color: '#C4A5B3' }}>
            {conversationState.category}
          </p>
        </div>
      </div>

      {/* Question card */}
      <div 
        className="p-6 rounded-3xl mb-6" 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
        }}
      >
        <p className="text-lg font-medium leading-relaxed" style={{ color: '#5A4553', lineHeight: '1.7' }}>
          {conversationState.questionText}
        </p>
      </div>

      {/* Answer input */}
      <div 
        className="flex-1 p-6 rounded-3xl mb-6" 
        style={{ 
          backgroundColor: 'white',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
        }}
      >
        <textarea
          value={answer}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setAnswer(e.target.value);
            }
          }}
          placeholder="写下你此刻的想法..."
          className="w-full h-full bg-transparent resize-none focus:outline-none text-base"
          style={{ 
            color: '#5A4553',
            lineHeight: '1.8',
            minHeight: '200px'
          }}
          autoFocus
        />
      </div>

      {/* Character count */}
      <div className="mb-6 text-center">
        <span className="text-sm" style={{ color: answer.length >= maxLength ? '#FFB5BA' : '#C4A5B3' }}>
          {answer.length} / {maxLength}
        </span>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!answer.trim()}
        className="w-full py-4 rounded-2xl font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        style={{ 
          background: 'linear-gradient(135deg, #FFB5BA 0%, #FFA6C9 100%)',
          boxShadow: '0 4px 16px rgba(255, 181, 186, 0.4)'
        }}
      >
        <span>提交回答</span>
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}
