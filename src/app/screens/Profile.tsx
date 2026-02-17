import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, User, Heart, Calendar, Trophy, Settings, Edit3, Check } from 'lucide-react';
import type { UserProfile } from '../App';

interface ProfileProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export default function Profile({ userProfile, setUserProfile }: ProfileProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userProfile.name);
  const [editedPartnerName, setEditedPartnerName] = useState(userProfile.partnerName);

  const handleSave = () => {
    setUserProfile(prev => ({
      ...prev,
      name: editedName,
      partnerName: editedPartnerName
    }));
    setIsEditing(false);
  };

  const relationshipDays = Math.floor((Date.now() - new Date(userProfile.relationshipStart).getTime()) / (1000 * 60 * 60 * 24));

  const achievements = [
    { id: 1, name: '初次相遇', description: '完成第一次对话', unlocked: true, icon: '💬' },
    { id: 2, name: '心有灵犀', description: '连续7天互动', unlocked: true, icon: '✨' },
    { id: 3, name: '深度连接', description: '完成20次对话', unlocked: true, icon: '🔗' },
    { id: 4, name: '月度情侣', description: '连续30天互动', unlocked: false, icon: '🌙' }
  ];

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
        <h1 className="text-lg font-medium" style={{ color: '#5A4553' }}>
          个人资料
        </h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
        >
          {isEditing ? (
            <Check className="w-5 h-5" style={{ color: '#FFB5BA' }} />
          ) : (
            <Edit3 className="w-5 h-5" style={{ color: '#8B6B7A' }} />
          )}
        </button>
      </div>

      {/* Profile card */}
      <div 
        className="p-8 rounded-3xl mb-6 relative overflow-hidden" 
        style={{ 
          background: 'linear-gradient(135deg, #FFE5E8 0%, #FFD4E5 100%)',
          boxShadow: '0 8px 24px rgba(255, 181, 186, 0.3)'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }} />
        
        <div className="relative z-10">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F7 100%)', boxShadow: '0 4px 16px rgba(255, 181, 186, 0.3)' }}>
            <User className="w-10 h-10" style={{ color: '#FFB5BA' }} />
          </div>

          {/* Names */}
          {isEditing ? (
            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl text-center font-medium bg-white/80 focus:outline-none"
                style={{ color: '#5A4553', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}
              />
              <input
                type="text"
                value={editedPartnerName}
                onChange={(e) => setEditedPartnerName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl text-center font-medium bg-white/80 focus:outline-none"
                style={{ color: '#5A4553', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}
              />
            </div>
          ) : (
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-white mb-1">
                {userProfile.name} & {userProfile.partnerName}
              </h2>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Heart className="w-4 h-4" fill="white" />
                <span className="text-sm">相恋 {relationshipDays} 天</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div 
          className="p-5 rounded-2xl" 
          style={{ 
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5" style={{ color: '#FFB5BA' }} />
            <span className="text-xs" style={{ color: '#C4A5B3' }}>已完成</span>
          </div>
          <p className="text-2xl font-semibold" style={{ color: '#5A4553' }}>
            {userProfile.completedQuestions}
          </p>
          <p className="text-xs" style={{ color: '#C4A5B3' }}>个对话</p>
        </div>

        <div 
          className="p-5 rounded-2xl" 
          style={{ 
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5" style={{ color: '#FFA6C9' }} />
            <span className="text-xs" style={{ color: '#C4A5B3' }}>连续天数</span>
          </div>
          <p className="text-2xl font-semibold" style={{ color: '#5A4553' }}>
            {userProfile.streak}
          </p>
          <p className="text-xs" style={{ color: '#C4A5B3' }}>天</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h3 className="text-base font-medium mb-4" style={{ color: '#5A4553' }}>
          成就徽章
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 rounded-2xl transition-all hover:scale-105"
              style={{ 
                backgroundColor: achievement.unlocked ? 'white' : 'rgba(255, 255, 255, 0.5)',
                boxShadow: achievement.unlocked ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none',
                opacity: achievement.unlocked ? 1 : 0.6
              }}
            >
              <div className="text-3xl mb-2 text-center">
                {achievement.icon}
              </div>
              <p className="text-sm font-medium text-center mb-1" style={{ color: '#5A4553' }}>
                {achievement.name}
              </p>
              <p className="text-xs text-center" style={{ color: '#C4A5B3' }}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div 
        className="p-5 rounded-2xl" 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5" style={{ color: '#8B6B7A' }} />
            <span className="text-sm font-medium" style={{ color: '#5A4553' }}>
              设置与偏好
            </span>
          </div>
          <button className="text-xs px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ backgroundColor: '#FDE2E4', color: '#8B6B7A' }}>
            查看
          </button>
        </div>
      </div>
    </div>
  );
}
