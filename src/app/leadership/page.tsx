import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Crown, Quote, Briefcase, Star, Award, ArrowRight, GraduationCap, Instagram } from 'lucide-react'
import { sanityServerFetch, getImageUrl, hasValidSanityConfig } from '@/lib/sanity'
import { adviserQuery, leadershipQuery } from '@/lib/queries'
import { mockSanityFetch } from '@/lib/mockData'
import type { Adviser, Student } from '@/types'

// Loading component
function LeadershipPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded mb-8 w-1/2"></div>
          
          {/* Adviser skeleton */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-64 h-64 bg-gray-200 rounded-xl mx-auto md:mx-0"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Leaders skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Adviser Card Component
function AdviserCard({ adviser }: { adviser: Adviser }) {
  const imageUrl = adviser.photoUrl || getImageUrl(adviser.photo, 300, 300)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-xl border border-blue-200"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="w-64 h-64 rounded-xl overflow-hidden bg-gray-200 mx-auto lg:mx-0">
            <Image
              src={imageUrl}
              alt={adviser.name}
              width={256}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <span className="text-blue-600 font-medium">{adviser.role}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{adviser.name}</h2>
            <p className="text-lg text-gray-600">{adviser.department}</p>
            {adviser.experience && (
              <p className="text-blue-600 font-medium">{adviser.experience} of experience</p>
            )}
          </div>

          {/* Quote */}
          {adviser.quote && (
            <div className="mb-6 p-4 bg-white/60 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Quote className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <blockquote className="text-gray-700 italic">
                  &ldquo;{adviser.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          )}

          {/* Fun Fact */}
          {adviser.fact && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center lg:justify-start">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Did You Know?
              </h3>
              <p className="text-gray-700">{adviser.fact}</p>
            </div>
          )}

          {/* Achievements */}
          {adviser.achievements && adviser.achievements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center lg:justify-start">
                <Award className="w-5 h-5 text-purple-500 mr-2" />
                Achievements
              </h3>
              <div className="space-y-2">
                {adviser.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Student Leader Card Component
function StudentLeaderCard({ student, index }: { student: Student; index: number }) {
  const imageUrl = student.photoUrl || getImageUrl(student.photo, 400, 400)
  const isPresident = student.position === 'President'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
        isPresident ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' : 'border-gray-100'
      }`}
    >
      {/* Photo */}
      <div className="relative h-64 bg-gray-200">
        <Image
          src={imageUrl}
          alt={student.name}
          fill
          className="object-cover"
        />
        {isPresident && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
            <Crown size={16} />
            <span>President</span>
          </div>
        )}
        {student.socials?.instagram && (
          <a
            href={`https://instagram.com/${student.socials.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-pink-500 hover:text-pink-600 transition-colors"
          >
            <Instagram size={16} />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
          <p className={`font-medium text-sm ${
            isPresident ? 'text-yellow-600' : 'text-blue-600'
          }`}>
            {student.position}
          </p>
        </div>

        {/* Dream Job */}
        <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
          <Briefcase size={16} className="mr-2" />
          <span>{student.dreamJob}</span>
        </div>

        {/* Quote */}
        {student.quote && (
          <div className="text-center">
            <p className="text-sm text-gray-600 italic line-clamp-3">
              &ldquo;{student.quote}&rdquo;
            </p>
          </div>
        )}

        {/* Skills Preview */}
        {student.skills && student.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1">
            {student.skills.slice(0, 3).map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {student.skills.length > 3 && (
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{student.skills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Main component
export default async function LeadershipPage() {
  let adviser: Adviser | null = null
  let leaders: Student[] = []

  if (hasValidSanityConfig) {
    try {
      const [adviserData, leadersData] = await Promise.all([
        sanityServerFetch<Adviser>(adviserQuery),
        sanityServerFetch<Student[]>(leadershipQuery)
      ])
      adviser = adviserData
      leaders = leadersData || []
    } catch (error) {
      console.error('Failed to fetch leadership data:', error)
    }
  }
  
  // Fallback to mock data if Sanity fetch fails or isn't configured
  if (!adviser || !leaders.length) {
    console.log('Using mock data for leadership page')
    adviser = adviser || await mockSanityFetch.adviser()
    leaders = leaders.length ? leaders : await mockSanityFetch.leadership()
  }

  if (!adviser && (!leaders || leaders.length === 0)) {
    return <LeadershipPageSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Development Notice */}
      {!hasValidSanityConfig && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Development Mode:</strong> Using mock data. Configure NEXT_PUBLIC_SANITY_PROJECT_ID to connect to your Sanity backend.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Leadership Team
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Meet the dedicated individuals who guide and inspire our class towards excellence. 
              From our experienced adviser to our student leaders, each person plays a vital role in our success.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">1</div>
                <div className="text-sm text-purple-200">Class Adviser</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{leaders?.length || 0}</div>
                <div className="text-sm text-purple-200">Student Leaders</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Class Adviser Section */}
          {adviser && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Class Adviser</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  The experienced educator who guides our class with wisdom, support, and dedication.
                </p>
              </div>
              <AdviserCard adviser={adviser} />
            </div>
          )}

          {/* Student Leaders Section */}
          {leaders && leaders.length > 0 && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Officers</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  The student leaders who represent our class and work tirelessly to create 
                  a positive and engaging environment for everyone.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {leaders.map((leader, index) => (
                  <StudentLeaderCard
                    key={leader._id}
                    student={leader}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Want to Get Involved?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Leadership opportunities are available throughout the year. 
                Connect with our current leaders to learn more about how you can contribute to our class.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/students"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Meet All Students
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="/achievements"
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  View Our Achievements
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 