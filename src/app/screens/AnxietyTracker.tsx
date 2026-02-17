import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { AnxietyLog } from '../App';

interface AnxietyTrackerProps {
  logs: AnxietyLog[];
  addLog: (log: Omit<AnxietyLog, 'id'>) => Promise<void>;
}

export default function AnxietyTracker({ logs, addLog }: AnxietyTrackerProps) {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const log = {
      date: new Date().toISOString().split('T')[0],
      level: currentLevel,
      timestamp: Date.now()
    };

    await addLog(log);
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Prepare chart data (last 14 days)
  const chartData = logs
    .slice(0, 14)
    .reverse()
    .map(log => ({
      date: new Date(log.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      level: log.level
    }));

  const getLevelColor = (level: number) => {
    if (level <= 3) return '#81A68D';
    if (level <= 6) return '#9DCABA';
    return '#8FAA9C';
  };

  const getLevelText = (level: number) => {
    if (level <= 2) return 'Very calm';
    if (level <= 4) return 'Calm';
    if (level <= 6) return 'Moderate';
    if (level <= 8) return 'Elevated';
    return 'High';
  };

  return (
    <div className="min-h-screen px-6 py-8 md:px-12 md:py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/')}
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-105"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
          }}
        >
          <ArrowLeft className="w-6 h-6" style={{ color: '#718096' }} />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: '#2D3748', fontFamily: 'Quicksand, sans-serif' }}>
            Anxiety Tracker
          </h1>
          <p className="text-sm" style={{ color: '#A0AEC0' }}>
            Monitor your emotional state
          </p>
        </div>
      </div>

      {/* Success message */}
      {showSuccess && (
        <div 
          className="mb-6 p-4 rounded-2xl flex items-center gap-3"
          style={{ 
            background: 'linear-gradient(135deg, rgba(129, 166, 141, 0.2) 0%, rgba(224, 234, 221, 0.2) 100%)',
            border: '1px solid rgba(129, 166, 141, 0.3)'
          }}
        >
          <TrendingDown className="w-5 h-5" style={{ color: '#81A68D' }} />
          <p className="text-sm" style={{ color: '#4A5568' }}>
            Your anxiety level has been logged
          </p>
        </div>
      )}

      {/* Current level input */}
      <div 
        className="mb-8 p-6 md:p-8 rounded-3xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(224, 234, 221, 0.2) 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}
      >
        <h2 className="text-lg font-medium mb-2" style={{ color: '#2D3748' }}>
          How anxious do you feel right now?
        </h2>
        <p className="text-sm mb-8" style={{ color: '#718096', lineHeight: '1.8' }}>
          Move the slider to indicate your current anxiety level
        </p>

        {/* Level display */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-4"
            style={{ 
              backgroundColor: `${getLevelColor(currentLevel)}20`,
              border: `3px solid ${getLevelColor(currentLevel)}`
            }}
          >
            <span className="text-4xl font-semibold" style={{ color: getLevelColor(currentLevel) }}>
              {currentLevel}
            </span>
          </div>
          <p className="text-xl font-medium" style={{ color: '#2D3748' }}>
            {getLevelText(currentLevel)}
          </p>
        </div>

        {/* Slider */}
        <div className="mb-8">
          <input
            type="range"
            min="1"
            max="10"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(parseInt(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #81A68D 0%, #9DCABA ${currentLevel * 10}%, #E0EADD ${currentLevel * 10}%, #E0EADD 100%)`,
              outline: 'none'
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm" style={{ color: '#A0AEC0' }}>1 (Very calm)</span>
            <span className="text-sm" style={{ color: '#A0AEC0' }}>10 (Very anxious)</span>
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          style={{ 
            background: 'linear-gradient(135deg, #81A68D 0%, #6B9F8E 100%)',
            boxShadow: '0 8px 24px rgba(129, 166, 141, 0.4)'
          }}
        >
          <Save className="w-5 h-5" />
          <span>{isSubmitting ? 'Saving...' : 'Log This Feeling'}</span>
        </button>
      </div>

      {/* Trends chart */}
      {chartData.length > 0 && (
        <div 
          className="p-6 md:p-8 rounded-3xl"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 244, 248, 0.5) 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}
        >
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#2D3748', fontFamily: 'Quicksand, sans-serif' }}>
            Your Anxiety Trends
          </h2>

          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0EADD" />
                <XAxis 
                  dataKey="date" 
                  stroke="#A0AEC0"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  domain={[0, 10]}
                  stroke="#A0AEC0"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #E0EADD',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#81A68D" 
                  strokeWidth={3}
                  dot={{ fill: '#81A68D', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-sm text-center" style={{ color: '#718096', lineHeight: '1.8' }}>
            Tracking your patterns helps you understand what affects your anxiety and celebrate progress
          </p>
        </div>
      )}

      {/* No data message */}
      {chartData.length === 0 && (
        <div 
          className="p-8 rounded-3xl text-center"
          style={{ 
            background: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}
        >
          <p style={{ color: '#A0AEC0', lineHeight: '1.8' }}>
            Start logging your anxiety levels to see trends and patterns over time
          </p>
        </div>
      )}
    </div>
  );
}
