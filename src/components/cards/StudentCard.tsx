'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Briefcase, Sparkles, Quote } from 'lucide-react'
import { getImageUrl } from '@/lib/sanity'
import type { StudentCardProps } from '@/types'

export default function StudentCard({ student, viewMode = 'grid', onClick }: StudentCardProps) {
  const imageUrl = student.photoUrl || getImageUrl(student.photo, 400, 400)

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <div className="flex p-6 space-x-6">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={imageUrl}
                alt={student.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {student.name}
                </h3>
                <p className="text-sm font-medium text-blue-600">
                  {student.position}
                </p>
              </div>
              
              {student.socials?.instagram && (
                <a
                  href={`https://instagram.com/${student.socials.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-pink-500 hover:text-pink-600 transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Briefcase size={16} className="mr-2" />
              <span>{student.dreamJob}</span>
            </div>

            {student.funFact && (
              <div className="flex items-start text-sm text-gray-600 mb-3">
                <Sparkles size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{student.funFact}</span>
              </div>
            )}

            {student.skills && student.skills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {student.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {student.skills.length > 3 && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{student.skills.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid view
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Photo */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={imageUrl}
          alt={student.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {student.position !== 'Student' && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {student.position}
          </div>
        )}
        {student.socials?.instagram && (
          <a
            href={`https://instagram.com/${student.socials.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-pink-500 hover:text-pink-600 transition-colors"
          >
            <Instagram size={16} />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {student.name}
        </h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Briefcase size={16} className="mr-2" />
          <span className="truncate">{student.dreamJob}</span>
        </div>

        {student.quote && (
          <div className="flex items-start text-sm text-gray-600 mb-3">
            <Quote size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2 italic">&ldquo;{student.quote}&rdquo;</span>
          </div>
        )}

        {student.skills && student.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {student.skills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {student.skills.length > 2 && (
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{student.skills.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
} 