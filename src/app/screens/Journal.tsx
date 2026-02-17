import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Send, Smile, Meh, Frown, Cloud, Sparkles } from 'lucide-react';
import type { JournalEntry } from '../App';

interface JournalProps {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id'>) => Promise<void>;
}

const moodOptions: { value: JournalEntry['mood']; icon: any; label: string; color: string }[] = [
  { value: 'peaceful', icon: Sparkles, label: 'Peaceful', color: '#81A68D' },
  { value: 'calm', icon: Smile, label: 'Calm', color: '#6B9F8E' },
  { value: 'neutral', icon: Meh, label: 'Neutral', color: '#A0AEC0' },
  { value: 'anxious', icon: Cloud, label: 'Anxious', color: '#8FAA9C' },
  { value: 'stressed', icon: Frown, label: 'Stressed', color: '#9DCABA' }
];

export default function Journal({ entries, addEntry }: JournalProps) {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [selectedMood, setSelectedMood] = useState<JournalEntry['mood']>('neutral');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setIsSubmitting(true);
    const entry = {
      date: new Date().toISOString().split('T')[0],
      text: text.trim(),
      mood: selectedMood,
      timestamp: Date.now()
    };

    await addEntry(entry);
    setText('');
    setSelectedMood('neutral');
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
            Mood Journal
          </h1>
          <p className="text-sm" style={{ color: '#A0AEC0' }}>
            Express yourself freely
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
          <Sparkles className="w-5 h-5" style={{ color: '#81A68D' }} />
          <p className="text-sm" style={{ color: '#4A5568' }}>
            Your thoughts have been saved
          </p>
        </div>
      )}

      {/* New entry form */}
      <div 
        className="mb-8 p-6 md:p-8 rounded-3xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(224, 234, 221, 0.2) 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}
      >
        <h2 className="text-lg font-medium mb-4" style={{ color: '#2D3748' }}>
          How are you feeling right now?
        </h2>

        {/* Mood selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all hover:scale-105"
              style={{ 
                backgroundColor: selectedMood === mood.value 
                  ? `${mood.color}20` 
                  : 'rgba(255, 255, 255, 0.7)',
                border: selectedMood === mood.value 
                  ? `2px solid ${mood.color}` 
                  : '2px solid transparent',
                color: selectedMood === mood.value ? mood.color : '#718096'
              }}
            >
              <mood.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Text area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write whatever comes to mind. This is your safe space to vent, reflect, or simply let it all out..."
          className="w-full h-48 p-4 rounded-2xl bg-white/80 resize-none focus:outline-none mb-4"
          style={{ 
            color: '#2D3748',
            lineHeight: '1.8',
            border: '1px solid rgba(129, 166, 141, 0.2)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isSubmitting}
          className="w-full py-4 rounded-2xl font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          style={{ 
            background: 'linear-gradient(135deg, #81A68D 0%, #6B9F8E 100%)',
            boxShadow: '0 8px 24px rgba(129, 166, 141, 0.4)'
          }}
        >
          <span>{isSubmitting ? 'Saving...' : 'Save Entry'}</span>
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Past entries */}
      <div>
        <h2 className="text-xl font-semibold mb-6" style={{ color: '#2D3748', fontFamily: 'Quicksand, sans-serif' }}>
          Your Journal History
        </h2>

        {entries.length === 0 ? (
          <div 
            className="p-8 rounded-3xl text-center"
            style={{ 
              background: 'rgba(255, 255, 255, 0.6)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.8)'
            }}
          >
            <p style={{ color: '#A0AEC0', lineHeight: '1.8' }}>
              No entries yet. Start journaling to see your thoughts here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => {
              const mood = moodOptions.find(m => m.value === entry.mood);
              const MoodIcon = mood?.icon || Meh;
              
              return (
                <div
                  key={entry.id}
                  className="p-6 rounded-3xl"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 244, 248, 0.5) 100%)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${mood?.color}20` }}>
                        <MoodIcon className="w-4 h-4" style={{ color: mood?.color }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: mood?.color }}>
                        {mood?.label}
                      </span>
                    </div>
                    <span className="text-sm" style={{ color: '#A0AEC0' }}>
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: '#4A5568', lineHeight: '1.8' }}>
                    {entry.text}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
