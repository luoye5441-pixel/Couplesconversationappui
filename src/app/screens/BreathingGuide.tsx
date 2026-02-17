import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export default function BreathingGuide() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('inhale');
  const [isActive, setIsActive] = useState(false);
  const [cycle, setCycle] = useState(0);

  const phaseConfig = {
    inhale: { duration: 4000, text: 'Breathe In', next: 'hold1' as Phase },
    hold1: { duration: 4000, text: 'Hold', next: 'exhale' as Phase },
    exhale: { duration: 6000, text: 'Breathe Out', next: 'hold2' as Phase },
    hold2: { duration: 2000, text: 'Hold', next: 'inhale' as Phase }
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setTimeout(() => {
      const nextPhase = phaseConfig[phase].next;
      setPhase(nextPhase);
      if (nextPhase === 'inhale') {
        setCycle(prev => prev + 1);
      }
    }, phaseConfig[phase].duration);

    return () => clearTimeout(timer);
  }, [phase, isActive]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setCycle(0);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase('inhale');
  };

  const getCircleSize = () => {
    switch (phase) {
      case 'inhale':
        return 220;
      case 'hold1':
        return 220;
      case 'exhale':
        return 140;
      case 'hold2':
        return 140;
      default:
        return 140;
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
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
        <div className="text-right">
          <p className="text-sm" style={{ color: '#A0AEC0' }}>
            Cycles completed
          </p>
          <p className="text-2xl font-semibold" style={{ color: '#2D3748' }}>
            {cycle}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Instructions */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#2D3748', fontFamily: 'Quicksand, sans-serif' }}>
            Breathing Exercise
          </h1>
          <p className="text-lg" style={{ color: '#718096', lineHeight: '1.8' }}>
            Follow the circle. Let your breath guide you to calm.
          </p>
        </div>

        {/* Breathing circle */}
        <div className="relative flex items-center justify-center mb-16">
          {/* Outer glow */}
          <motion.div
            className="absolute rounded-full"
            animate={{
              width: getCircleSize() + 60,
              height: getCircleSize() + 60,
              opacity: isActive ? [0.2, 0.4, 0.2] : 0.2
            }}
            transition={{
              duration: phaseConfig[phase].duration / 1000,
              ease: 'easeInOut'
            }}
            style={{
              background: 'radial-gradient(circle, rgba(129, 166, 141, 0.3) 0%, transparent 70%)',
            }}
          />

          {/* Main circle */}
          <motion.div
            className="rounded-full flex items-center justify-center relative z-10"
            animate={{
              width: getCircleSize(),
              height: getCircleSize(),
            }}
            transition={{
              duration: phaseConfig[phase].duration / 1000,
              ease: 'easeInOut'
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(129, 166, 141, 0.6) 0%, rgba(107, 159, 142, 0.6) 100%)',
              boxShadow: '0 20px 60px rgba(129, 166, 141, 0.4)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-center">
              <p className="text-2xl font-medium text-white mb-1" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                {isActive ? phaseConfig[phase].text : 'Ready'}
              </p>
              {isActive && (
                <p className="text-sm text-white/80">
                  {(phaseConfig[phase].duration / 1000).toFixed(0)}s
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-xs space-y-4">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="w-full py-4 rounded-2xl font-medium text-white transition-all hover:scale-[1.02]"
              style={{ 
                background: 'linear-gradient(135deg, #81A68D 0%, #6B9F8E 100%)',
                boxShadow: '0 8px 24px rgba(129, 166, 141, 0.4)'
              }}
            >
              Begin Breathing
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="w-full py-4 rounded-2xl font-medium transition-all hover:scale-[1.02]"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#718096',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
              }}
            >
              Stop & Return
            </button>
          )}
        </div>

        {/* Tips */}
        {!isActive && (
          <div 
            className="mt-12 p-6 rounded-2xl max-w-md"
            style={{ 
              background: 'rgba(255, 255, 255, 0.7)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.8)'
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#718096', lineHeight: '1.8' }}>
              <strong style={{ color: '#4A5568' }}>Tip:</strong> Find a comfortable position. 
              Close your eyes if you wish. Focus only on your breath and the expanding circle.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
