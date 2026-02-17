import { useNavigate } from 'react-router';
import { ArrowLeft, Eye, Hand, Ear, Nose, Heart, Wind, Anchor, Sparkles } from 'lucide-react';

interface Technique {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  steps?: string[];
}

const techniques: Technique[] = [
  {
    id: 1,
    title: '5-4-3-2-1 Grounding',
    description: 'Use your senses to ground yourself in the present moment',
    icon: Sparkles,
    color: '#81A68D',
    bgColor: 'rgba(129, 166, 141, 0.15)',
    steps: [
      '5 things you can see',
      '4 things you can touch',
      '3 things you can hear',
      '2 things you can smell',
      '1 thing you can taste'
    ]
  },
  {
    id: 2,
    title: 'Box Breathing',
    description: 'A simple breathing technique to calm your nervous system',
    icon: Wind,
    color: '#6B9F8E',
    bgColor: 'rgba(107, 159, 142, 0.15)',
    steps: [
      'Breathe in for 4 counts',
      'Hold for 4 counts',
      'Breathe out for 4 counts',
      'Hold for 4 counts',
      'Repeat 4 times'
    ]
  },
  {
    id: 3,
    title: 'Physical Grounding',
    description: 'Connect with your body to reduce anxiety',
    icon: Hand,
    color: '#8FAA9C',
    bgColor: 'rgba(143, 170, 156, 0.15)',
    steps: [
      'Press your feet firmly into the ground',
      'Touch something cold or warm',
      'Stretch your arms above your head',
      'Clench and release your fists',
      'Notice the sensations in your body'
    ]
  },
  {
    id: 4,
    title: 'Mental Anchoring',
    description: 'Use mental exercises to stay present',
    icon: Anchor,
    color: '#9DCABA',
    bgColor: 'rgba(157, 202, 186, 0.15)',
    steps: [
      'Name 3 things you\'re grateful for',
      'Count backwards from 100 by 7s',
      'List countries alphabetically',
      'Recall a happy memory in detail',
      'Plan tomorrow in your mind'
    ]
  },
  {
    id: 5,
    title: 'Self-Compassion Phrases',
    description: 'Calm your inner critic with kind words',
    icon: Heart,
    color: '#A3B8AB',
    bgColor: 'rgba(163, 184, 171, 0.15)',
    steps: [
      '"This feeling will pass"',
      '"I am safe right now"',
      '"I am doing my best"',
      '"I deserve kindness"',
      '"It\'s okay to feel this way"'
    ]
  },
  {
    id: 6,
    title: 'Sensory Focus',
    description: 'Direct your attention to immediate sensations',
    icon: Eye,
    color: '#81A68D',
    bgColor: 'rgba(129, 166, 141, 0.15)',
    steps: [
      'Focus on one sound for 30 seconds',
      'Notice the texture of your clothing',
      'Look at one object in detail',
      'Feel the temperature of the air',
      'Become aware of your breath'
    ]
  }
];

export default function Resources() {
  const navigate = useNavigate();

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
            Grounding Techniques
          </h1>
          <p className="text-sm" style={{ color: '#A0AEC0' }}>
            Tools for moments of overwhelm
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div 
        className="mb-8 p-6 rounded-3xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(129, 166, 141, 0.1) 0%, rgba(224, 234, 221, 0.1) 100%)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(129, 166, 141, 0.2)'
        }}
      >
        <p className="text-base leading-relaxed" style={{ color: '#4A5568', lineHeight: '1.8' }}>
          These evidence-based techniques can help you manage anxiety in the moment. 
          Try different methods to discover what works best for you.
        </p>
      </div>

      {/* Technique cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techniques.map((technique) => (
          <div
            key={technique.id}
            className="p-6 md:p-8 rounded-3xl transition-all hover:scale-[1.02]"
            style={{ 
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, ${technique.bgColor} 100%)`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.8)'
            }}
          >
            {/* Icon and title */}
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: technique.bgColor }}
              >
                <technique.icon className="w-6 h-6" style={{ color: technique.color }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: '#2D3748' }}>
                  {technique.title}
                </h3>
                <p className="text-sm" style={{ color: '#718096', lineHeight: '1.7' }}>
                  {technique.description}
                </p>
              </div>
            </div>

            {/* Steps */}
            {technique.steps && (
              <div className="space-y-2 mt-6">
                {technique.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${technique.color}20` }}
                    >
                      <span className="text-xs font-medium" style={{ color: technique.color }}>
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: '#4A5568', lineHeight: '1.7' }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Emergency resources */}
      <div 
        className="mt-12 p-8 rounded-3xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(224, 234, 221, 0.2) 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}
      >
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#2D3748' }}>
          Need immediate support?
        </h3>
        <p className="text-sm mb-4" style={{ color: '#718096', lineHeight: '1.8' }}>
          If you're experiencing a mental health crisis, please reach out to a professional:
        </p>
        <div className="space-y-2">
          <p className="text-sm" style={{ color: '#4A5568' }}>
            <strong>Crisis Hotline:</strong> 988 (US)
          </p>
          <p className="text-sm" style={{ color: '#4A5568' }}>
            <strong>Crisis Text Line:</strong> Text HOME to 741741
          </p>
        </div>
      </div>
    </div>
  );
}
