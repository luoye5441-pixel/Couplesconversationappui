import { useNavigate } from 'react-router';
import { Wind, BookOpen, Activity, Sparkles, TrendingDown, TrendingUp, Calendar, Heart } from 'lucide-react';
import type { JournalEntry, AnxietyLog } from '../App';

interface DashboardProps {
  journalEntries: JournalEntry[];
  anxietyLogs: AnxietyLog[];
  loading: boolean;
}

export default function Dashboard({ journalEntries, anxietyLogs, loading }: DashboardProps) {
  const navigate = useNavigate();

  // Calculate stats
  const recentAnxietyLogs = anxietyLogs.slice(0, 7);
  const averageAnxiety = recentAnxietyLogs.length > 0 
    ? (recentAnxietyLogs.reduce((sum, log) => sum + log.level, 0) / recentAnxietyLogs.length).toFixed(1)
    : 'N/A';
  
  const journalStreak = journalEntries.length;
  
  // Check if anxiety is trending up or down
  const isAnxietyImproving = recentAnxietyLogs.length >= 2 
    && recentAnxietyLogs[0].level < recentAnxietyLogs[recentAnxietyLogs.length - 1].level;

  return (
    <div className="min-h-screen px-6 py-8 md:px-12 md:py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-3" style={{ color: '#2D3748', fontFamily: 'Quicksand, sans-serif' }}>
          Welcome to Your Peace
        </h1>
        <p className="text-base md:text-lg" style={{ color: '#718096', lineHeight: '1.8' }}>
          Take a moment to check in with yourself. How are you feeling today?
        </p>
      </div>

      {/* Quick Stats */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Average Anxiety */}
          <div 
            className="p-6 rounded-3xl backdrop-blur-md transition-all hover:scale-[1.02]"
            style={{ 
              background: 'linear-gradient(135deg, rgba(224, 234, 221, 0.6) 0%, rgba(240, 244, 248, 0.6) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.5)'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-6 h-6" style={{ color: '#81A68D' }} />
              {isAnxietyImproving ? (
                <TrendingDown className="w-5 h-5" style={{ color: '#81A68D' }} />
              ) : (
                <TrendingUp className="w-5 h-5" style={{ color: '#E0EADD' }} />
              )}
            </div>
            <p className="text-3xl font-semibold mb-1" style={{ color: '#2D3748' }}>
              {averageAnxiety}
            </p>
            <p className="text-sm" style={{ color: '#718096' }}>
              Average anxiety (7 days)
            </p>
          </div>

          {/* Journal Entries */}
          <div 
            className="p-6 rounded-3xl backdrop-blur-md transition-all hover:scale-[1.02]"
            style={{ 
              background: 'linear-gradient(135deg, rgba(157, 201, 186, 0.3) 0%, rgba(240, 244, 248, 0.6) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.5)'
            }}
          >
            <BookOpen className="w-6 h-6 mb-3" style={{ color: '#6B9F8E' }} />
            <p className="text-3xl font-semibold mb-1" style={{ color: '#2D3748' }}>
              {journalStreak}
            </p>
            <p className="text-sm" style={{ color: '#718096' }}>
              Total journal entries
            </p>
          </div>

          {/* Days Active */}
          <div 
            className="p-6 rounded-3xl backdrop-blur-md transition-all hover:scale-[1.02]"
            style={{ 
              background: 'linear-gradient(135deg, rgba(224, 234, 221, 0.4) 0%, rgba(255, 255, 255, 0.7) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.5)'
            }}
          >
            <Calendar className="w-6 h-6 mb-3" style={{ color: '#8FAA9C' }} />
            <p className="text-3xl font-semibold mb-1" style={{ color: '#2D3748' }}>
              {anxietyLogs.length}
            </p>
            <p className="text-sm" style={{ color: '#718096' }}>
              Check-ins logged
            </p>
          </div>
        </div>
      )}

      {/* Card Game Banner */}
      <button
        onClick={() => navigate('/card-game')}
        className="w-full mb-8 p-8 rounded-3xl text-left transition-all hover:scale-[1.01] relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1A0A0A 0%, #3D1518 50%, #4A1A1A 100%)',
          boxShadow: '0 12px 40px rgba(196, 30, 58, 0.15)',
          border: '1px solid rgba(196, 30, 58, 0.2)',
        }}
      >
        <div className="absolute top-4 right-4 w-6 h-6 border-t border-r" style={{ borderColor: 'rgba(212,165,116,0.25)' }} />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l" style={{ borderColor: 'rgba(212,165,116,0.25)' }} />
        <div className="flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: 'rgba(196, 30, 58, 0.2)',
              border: '1px solid rgba(196, 30, 58, 0.35)',
            }}
          >
            <Heart className="w-8 h-8" style={{ color: '#C41E3A' }} fill="#C41E3A" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-semibold" style={{ color: '#F5E6D3', letterSpacing: '0.08em' }}>
                缘牌 · 情侣卡牌
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(196,30,58,0.3)', color: '#F5E6D3', letterSpacing: '0.1em' }}>
                中国风
              </span>
            </div>
            <p className="text-sm" style={{ color: 'rgba(212,165,116,0.7)', lineHeight: '1.8' }}>
              以五行为引，以真心为牌。抽一张缘牌，开启一段走心对话。
            </p>
          </div>
        </div>
      </button>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Breathing Guide */}
        <button
          onClick={() => navigate('/breathing')}
          className="group p-8 rounded-3xl text-left transition-all hover:scale-[1.02]"
          style={{ 
            background: 'linear-gradient(135deg, rgba(129, 166, 141, 0.15) 0%, rgba(224, 234, 221, 0.15) 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(129, 166, 141, 0.2)'
          }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ backgroundColor: 'rgba(129, 166, 141, 0.2)' }}>
            <Wind className="w-7 h-7" style={{ color: '#81A68D' }} />
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: '#2D3748', fontFamily: 'Quicksand, sans-serif' }}>
            Breathing Exercise
          </h2>
          <p className="text-base" style={{ color: '#718096', lineHeight: '1.8' }}>
            Calm your mind with guided breathing. Find your center in just 2 minutes.
          </p>
        </button>

        {/* Mood Journal */}
        <button
          onClick={() => navigate('/journal')}
          className="group p-8 rounded-3xl text-left transition-all hover:scale-[1.02]"
          style={{ 
            background: 'linear-gradient(135deg, rgba(107, 159, 142, 0.15) 0%, rgba(157, 201, 186, 0.15) 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(107, 159, 142, 0.2)'
          }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ backgroundColor: 'rgba(107, 159, 142, 0.2)' }}>
            <BookOpen className="w-7 h-7" style={{ color: '#6B9F8E' }} />
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: '#2D3748', fontFamily: 'Quicksand, sans-serif' }}>
            Mood Journal
          </h2>
          <p className="text-base" style={{ color: '#718096', lineHeight: '1.8' }}>
            Express your thoughts freely. Vent, reflect, and release what's on your mind.
          </p>
        </button>

        {/* Anxiety Tracker */}
        <button
          onClick={() => navigate('/tracker')}
          className="group p-8 rounded-3xl text-left transition-all hover:scale-[1.02]"
          style={{ 
            background: 'linear-gradient(135deg, rgba(143, 170, 156, 0.15) 0%, rgba(240, 244, 248, 0.15) 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(143, 170, 156, 0.2)'
          }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ backgroundColor: 'rgba(143, 170, 156, 0.2)' }}>
            <Activity className="w-7 h-7" style={{ color: '#8FAA9C' }} />
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: '#2D3748', fontFamily: 'Quicksand, sans-serif' }}>
            Anxiety Tracker
          </h2>
          <p className="text-base" style={{ color: '#718096', lineHeight: '1.8' }}>
            Log how you're feeling right now. Track patterns and celebrate progress.
          </p>
        </button>

        {/* Resources */}
        <button
          onClick={() => navigate('/resources')}
          className="group p-8 rounded-3xl text-left transition-all hover:scale-[1.02]"
          style={{ 
            background: 'linear-gradient(135deg, rgba(224, 234, 221, 0.2) 0%, rgba(255, 255, 255, 0.3) 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(224, 234, 221, 0.3)'
          }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ backgroundColor: 'rgba(224, 234, 221, 0.3)' }}>
            <Sparkles className="w-7 h-7" style={{ color: '#A3B8AB' }} />
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: '#2D3748', fontFamily: 'Quicksand, sans-serif' }}>
            Grounding Techniques
          </h2>
          <p className="text-base" style={{ color: '#718096', lineHeight: '1.8' }}>
            Quick tools for moments of overwhelm. Find relief when you need it most.
          </p>
        </button>
      </div>

      {/* Affirmation */}
      <div 
        className="p-8 rounded-3xl text-center"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(224, 234, 221, 0.3) 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}
      >
        <p className="text-lg md:text-xl italic mb-2" style={{ color: '#4A5568', lineHeight: '1.8', fontFamily: 'Quicksand, sans-serif' }}>
          "You are doing better than you think you are."
        </p>
        <p className="text-sm" style={{ color: '#A0AEC0' }}>
          Remember to be gentle with yourself today
        </p>
      </div>
    </div>
  );
}
