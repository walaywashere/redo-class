'use client'

import Image from 'next/image'
import { Instagram, Briefcase, Sparkles, Quote, Crown, User } from 'lucide-react'
import { getImageUrl } from '@/lib/sanity'
import Modal from '@/components/ui/Modal'
import type { StudentModalProps } from '@/types'

export default function StudentModal({ isOpen, onClose, student }: StudentModalProps) {
  if (!student) return null

  const imageUrl = student.photoUrl || getImageUrl(student.photo, 600, 600)
  const isLeader = student.position !== 'Student'

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 rounded-xl overflow-hidden bg-gray-200 mx-auto md:mx-0">
              <Image
                src={imageUrl}
                alt={student.name}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {student.name}
              </h2>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                {isLeader ? (
                  <Crown className="w-5 h-5 text-yellow-500" />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
                <span className={`text-lg font-medium ${
                  isLeader ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {student.position}
                </span>
              </div>
            </div>

            {/* Dream Job */}
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Briefcase className="w-5 h-5 text-gray-500" />
              <span className="text-lg text-gray-700">{student.dreamJob}</span>
            </div>

            {/* Social Links */}
            {student.socials?.instagram && (
              <div className="flex justify-center md:justify-start">
                <a
                  href={`https://instagram.com/${student.socials.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-colors"
                >
                  <Instagram size={18} />
                  <span>@{student.socials.instagram}</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Quote Section */}
        {student.quote && (
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-start space-x-3">
              <Quote className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <blockquote className="text-lg text-gray-700 italic">
                &ldquo;{student.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        )}

        {/* Fun Fact Section */}
        {student.funFact && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
              Fun Fact
            </h3>
            <p className="text-gray-700 leading-relaxed">{student.funFact}</p>
          </div>
        )}

        {/* Skills Section */}
        {student.skills && student.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills & Interests</h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Leadership Note */}
        {isLeader && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                {student.name} serves as {student.position} in our class leadership team.
              </span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
} 