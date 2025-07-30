'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, Award } from 'lucide-react'
import type { AchievementCardProps } from '@/types'

const categoryIcons = {
  academic: '📚',
  leadership: '👑',
  innovation: '💡',
  service: '🤝',
  sports: '🏆',
  arts: '🎨'
}

const categoryColors = {
  academic: 'bg-blue-100 text-blue-800 border-blue-200',
  leadership: 'bg-purple-100 text-purple-800 border-purple-200',
  innovation: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  service: 'bg-green-100 text-green-800 border-green-200',
  sports: 'bg-orange-100 text-orange-800 border-orange-200',
  arts: 'bg-pink-100 text-pink-800 border-pink-200'
}

const impactColors = {
  'Medium': 'bg-gray-100 text-gray-800',
  'High': 'bg-orange-100 text-orange-800',
  'Very High': 'bg-red-100 text-red-800'
}

export default function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  const categoryIcon = categoryIcons[achievement.category]
  const categoryColor = categoryColors[achievement.category]
  const impactColor = impactColors[achievement.impact]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{categoryIcon}</div>
            <div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${categoryColor}`}>
                {achievement.category}
              </span>
            </div>
          </div>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${impactColor}`}>
            {achievement.impact} Impact
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {achievement.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {achievement.description}
        </p>

        {/* Metadata */}
        <div className="space-y-2">
          {achievement.date && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-2" />
              <span>{new Date(achievement.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{achievement.year}</span>
            </div>
          )}

          {achievement.students && achievement.students.length > 0 && (
            <div className="flex items-center text-sm text-gray-500">
              <Users size={16} className="mr-2" />
              <span>
                {achievement.students.length === 1 
                  ? achievement.students[0]
                  : `${achievement.students.length} recipients`
                }
              </span>
            </div>
          )}
        </div>

        {/* Criteria Preview */}
        {achievement.criteria && achievement.criteria.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Award size={16} className="mr-2" />
              <span>Key Criteria</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {achievement.criteria.slice(0, 2).map((criterion, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded"
                >
                  {criterion}
                </span>
              ))}
              {achievement.criteria.length > 2 && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{achievement.criteria.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
} 