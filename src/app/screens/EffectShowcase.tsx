import { useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp, Sparkles, Heart, MessageCircle, Award } from 'lucide-react';

export default function EffectShowcase() {
  const navigate = useNavigate();

  const stats = [
    { icon: Heart, label: '亲密度', value: '85%', color: '#FFB5BA', bg: '#FDE2E4' },
    { icon: MessageCircle, label: '对话深度', value: '92%', color: '#FFA6C9', bg: '#FFF5F7' },
    { icon: Award, label: '共同成长', value: '78%', color: '#FFD4A3', bg: '#FFF9F5' }
  ];

  const insights = [
    {
      title: '你们的对话风格',
      description: '在过去的对话中，你们都表现出了很强的倾听能力。彼此都善于从对方的回答中发现新的视角。',
      gradient: 'linear-gradient(135deg, #FFF5F7 0%, #FFFFFF 100%)'
    },
    {
      title: '情感共鸣点',
      description: '你们在"童年记忆"和"未来畅想"话题上的回答相似度最高，说明你们拥有相似的价值观和人生愿景。',
      gradient: 'linear-gradient(135deg, #FFF9F5 0%, #FFFFFF 100%)'
    },
    {
      title: '成长的空间',
      description: '尝试在"冲突与理解"类话题上进行更多交流，这将帮助你们建立更深层的信任关系。',
      gradient: 'linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 100%)'
    }
  ];

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
          <h1 className="text-xl font-medium" style={{ color: '#5A4553' }}>
            效果展示
          </h1>
          <p className="text-xs" style={{ color: '#C4A5B3' }}>
            你们的对话带来的改变
          </p>
        </div>
      </div>

      {/* Hero gradient card */}
      <div 
        className="p-8 rounded-3xl mb-6 relative overflow-hidden" 
        style={{ 
          background: 'linear-gradient(135deg, #FFE5E8 0%, #FFD4E5 50%, #E5D4FF 100%)',
          boxShadow: '0 8px 24px rgba(255, 181, 186, 0.3)'
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">本周亮点</span>
          </div>
          <h2 className="text-3xl font-semibold text-white mb-2">
            7天连续互动
          </h2>
          <p className="text-white/90 text-sm leading-relaxed">
            坚持每天的深度对话，你们的关系正在持续升温
          </p>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-5 -left-5 w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)' }} />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl transition-all hover:scale-105"
            style={{ 
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 mx-auto" style={{ backgroundColor: stat.bg }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <p className="text-xs text-center mb-1" style={{ color: '#C4A5B3' }}>
              {stat.label}
            </p>
            <p className="text-lg font-semibold text-center" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Insights section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" style={{ color: '#FFB5BA' }} />
          <h3 className="text-base font-medium" style={{ color: '#5A4553' }}>
            深度洞察
          </h3>
        </div>
        
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl"
              style={{ 
                background: insight.gradient,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h4 className="text-sm font-medium mb-2" style={{ color: '#5A4553' }}>
                {insight.title}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#8B6B7A', lineHeight: '1.7' }}>
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div 
        className="p-6 rounded-3xl text-center" 
        style={{ 
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F7 100%)',
          boxShadow: '0 6px 20px rgba(255, 181, 186, 0.15)'
        }}
      >
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#8B6B7A', lineHeight: '1.7' }}>
          每一次真诚的对话，都在让你们的关系变得更加深厚和稳固
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl font-medium text-white transition-all hover:scale-105"
          style={{ 
            background: 'linear-gradient(135deg, #FFB5BA 0%, #FFA6C9 100%)',
            boxShadow: '0 4px 12px rgba(255, 181, 186, 0.4)'
          }}
        >
          继续今天的对话
        </button>
      </div>
    </div>
  );
}
