// src/components/game/GameStats.jsx
import React from 'react';
import { Trophy, Zap, Calendar, Star } from 'lucide-react';

const GameStats = ({ gameStats }) => {
  const xpToNextLevel = Math.pow((gameStats.level + 1) * 10, 2) - gameStats.xp;
  const xpForCurrentLevel = Math.pow(gameStats.level * 10, 2);
  const xpNeededForLevel = Math.pow((gameStats.level + 1) * 10, 2) - xpForCurrentLevel;
  const currentLevelXP = gameStats.xp - xpForCurrentLevel;
  const levelProgress = Math.min((currentLevelXP / xpNeededForLevel) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Progress</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 text-center">
          <Zap className="w-6 h-6 mx-auto mb-1" />
          <div className="text-xl font-bold">{gameStats.xp}</div>
          <div className="text-xs opacity-90">XP</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-3 text-center">
          <Trophy className="w-6 h-6 mx-auto mb-1" />
          <div className="text-xl font-bold">Level {gameStats.level}</div>
          <div className="text-xs opacity-90">Rank</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg p-3 text-center">
          <Star className="w-6 h-6 mx-auto mb-1" />
          <div className="text-xl font-bold">{gameStats.streak}</div>
          <div className="text-xs opacity-90">Day Streak</div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-3 text-center">
          <Calendar className="w-6 h-6 mx-auto mb-1" />
          <div className="text-xl font-bold">{gameStats.totalAssignments}</div>
          <div className="text-xs opacity-90">Completed</div>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Level {gameStats.level}</span>
          <span>Level {gameStats.level + 1} ({xpToNextLevel} XP to go)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Achievements */}
      {gameStats.achievements.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Recent Achievements</h4>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {gameStats.achievements.slice(-3).map((achievement) => (
              <div key={achievement.id} className="flex-shrink-0 bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-center">
                <div className="text-lg mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium text-yellow-800">{achievement.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStats;