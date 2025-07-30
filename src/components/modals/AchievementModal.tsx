'use client'

import { Calendar, Users, Award, TrendingUp, Target } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import type { AchievementModalProps } from '@/types'

const categoryIcons = {
  academic: '📚',
  leadership: '👑',
  innovation: '💡',
  service: '🤝',
  sports: '🏆',
  arts: '🎨'
}

const categoryColors = {
  academic: 'from-blue-500 to-blue-600',
  leadership: 'from-purple-500 to-purple-600',
  innovation: 'from-yellow-500 to-yellow-600',
  service: 'from-green-500 to-green-600',
  sports: 'from-orange-500 to-orange-600',
  arts: 'from-pink-500 to-pink-600'
}

const impactColors = {
  'Medium': 'bg-gray-100 text-gray-800 border-gray-300',
  'High': 'bg-orange-100 text-orange-800 border-orange-300',
  'Very High': 'bg-red-100 text-red-800 border-red-300'
}

export default function AchievementModal({ isOpen, onClose, achievement }: AchievementModalProps) {
  if (!achievement) return null

  const categoryIcon = categoryIcons[achievement.category]
  const categoryGradient = categoryColors[achievement.category]
  const impactColor = impactColors[achievement.impact]

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* Header Section */}
        <div className="mb-8">
          {/* Category & Impact Badges */}
          <div className="flex items-center justify-between mb-4">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${categoryGradient} text-white rounded-lg`}>
              <span className="text-lg">{categoryIcon}</span>
              <span className="font-medium capitalize">{achievement.category}</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${impactColor}`}>
              {achievement.impact} Impact
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {achievement.title}
          </h2>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {achievement.date && (
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(achievement.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{achievement.year}</span>
              </div>
            )}

            {achievement.students && achievement.students.length > 0 && (
              <div className="flex items-center space-x-2">
                <Users size={16} />
                <span>
                  {achievement.students.length === 1 
                    ? '1 Recipient'
                    : `${achievement.students.length} Recipients`
                  }
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description Sections */}
        <div className="space-y-8">
          {/* Short Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <Award className="w-5 h-5 text-blue-500 mr-2" />
              Achievement Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {achievement.description}
            </p>
          </div>

          {/* Detailed Description */}
          {achievement.detailedDescription && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                Detailed Information
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {achievement.detailedDescription}
                </p>
              </div>
            </div>
          )}

          {/* Recipients */}
          {achievement.students && achievement.students.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Users className="w-5 h-5 text-purple-500 mr-2" />
                Recipients
              </h3>
              <div className="flex flex-wrap gap-2">
                {achievement.students.map((student, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium border border-blue-200"
                  >
                    {student}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Criteria */}
          {achievement.criteria && achievement.criteria.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Target className="w-5 h-5 text-red-500 mr-2" />
                Achievement Criteria
              </h3>
              <div className="space-y-2">
                {achievement.criteria.map((criterion, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{criterion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Impact Highlight */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp size={18} />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Impact & Recognition
              </h4>
              <p className="text-blue-800">
                This achievement represents a <strong>{achievement.impact.toLowerCase()}</strong> level 
                of impact within our {achievement.category} category, demonstrating exceptional 
                dedication and excellence in {achievement.year}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
} 