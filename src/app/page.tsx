import Link from 'next/link'
import Image from 'next/image'
import { Users, Trophy, Crown, ArrowRight, Sparkles, Zap, Heart, Target } from 'lucide-react'
import { sanityServerFetch, hasValidSanityConfig } from '@/lib/sanity'
import { homepageDataQuery } from '@/lib/queries'
import { mockHomepageData } from '@/lib/mockData'
import type { HomepageData } from '@/types'

// Modern Hero Section with organic shapes and glassmorphism
function HeroSection({ siteSettings }: { siteSettings: HomepageData['siteSettings'] }) {
  const headline = siteSettings?.heroSection?.headline || 'Welcome to Class 11-Newton'
  const subheadline = siteSettings?.heroSection?.subheadline || 'Excellence in Education and Leadership'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 morphing-bg"></div>
      
      {/* Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blob floating mix-blend-overlay"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/20 rounded-full blob-delayed floating-delayed mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/20 rounded-full blob floating mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-dark rounded-3xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
          <h1 className="text-hero text-white mb-6 text-shadow-lg">
            {headline.split(' ').map((word: string, index: number) => (
              <span
                key={index}
                className="inline-block mr-4 fade-in-up"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {word}
              </span>
            ))}
          </h1>
          
          <p className="text-subtitle text-white/90 mb-8 max-w-2xl mx-auto scale-in" 
             style={{ animationDelay: '0.8s' }}>
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center slide-in-left"
               style={{ animationDelay: '1.2s' }}>
            <Link
              href="/students"
              className="btn-primary group"
            >
              <span className="flex items-center">
                Meet Our Stars
                <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
            
            <Link
              href="/achievements"
              className="btn-ghost group"
            >
              <span className="flex items-center">
                Our Wins
                <Trophy className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 floating">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-2 h-4 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

// Modern Stats Cards with unique layouts
function StatsShowcase({ stats }: { stats: HomepageData['stats'] }) {
  const statItems = [
    {
      icon: Users,
      value: stats.totalStudents,
      label: "Brilliant Minds",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      delay: "0s"
    },
    {
      icon: Trophy,
      value: stats.totalAchievements,
      label: "Epic Wins",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      delay: "0.2s"
    },
    {
      icon: Crown,
      value: stats.leadershipTeam,
      label: "Leaders",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      delay: "0.4s"
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 gradient-text">
            Our Impact by Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every number tells a story of growth, achievement, and community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {statItems.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="card-modern p-8 text-center scale-in"
                style={{ animationDelay: stat.delay }}
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold text-gray-600">{stat.label}</p>
                
                {/* Decorative element */}
                <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Modern Achievement Cards with creative layouts
function AchievementShowcase({ achievements }: { achievements: any[] }) {
  const categoryIcons = {
    academic: '🎓',
    leadership: '👑', 
    innovation: '💡',
    service: '🤝',
    sports: '🏆',
    arts: '🎨'
  }

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Recent <span className="gradient-text">Victories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-xl">
              Celebrating our latest accomplishments and breakthroughs
            </p>
          </div>
          <Link
            href="/achievements"
            className="btn-primary group shrink-0"
          >
            <span className="flex items-center">
              View All Wins
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={achievement._id}
              className="card-modern p-6 hover:scale-105 transition-all duration-500 slide-in-right"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">
                  {categoryIcons[achievement.category as keyof typeof categoryIcons]}
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold rounded-full">
                  {achievement.year}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {achievement.title}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {achievement.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {achievement.category}
                </span>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  achievement.impact === 'Very High' ? 'bg-red-100 text-red-700' :
                  achievement.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {achievement.impact} Impact
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Modern Leadership Preview with creative layouts
function LeadershipPreview({ leadership }: { leadership: any[] }) {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Meet Our <span className="gradient-text">Dream Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The incredible individuals leading our class to new heights
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {leadership.map((leader, index) => (
            <div
              key={leader._id}
              className="text-center group scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 p-1 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-white">
                    <Image
                      src={leader.photoUrl}
                      alt={leader.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {leader.position === 'President' && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">{leader.name}</h3>
              <p className="text-xs md:text-sm text-purple-600 font-semibold">{leader.position}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/leadership"
            className="btn-secondary group"
          >
            <span className="flex items-center">
              Meet the Full Team
              <Heart className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform text-red-500" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Modern CTA Section
function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full floating"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-lg floating-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full floating"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-2xl floating-delayed"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-shadow-lg">
            Ready to Join Our <span className="text-yellow-300">Journey?</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover more about our incredible community of learners, innovators, and changemakers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/students"
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              <span className="flex items-center justify-center">
                Explore Profiles
                <Target className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
            <Link
              href="/achievements"
              className="bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 group"
            >
              <span className="flex items-center justify-center">
                See Achievements
                <Zap className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform text-yellow-300" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Page Component
export default async function HomePage() {
  let data: HomepageData | null = null
  
  if (hasValidSanityConfig) {
    try {
      data = await sanityServerFetch<HomepageData>(homepageDataQuery)
    } catch (error) {
      console.error('Failed to fetch homepage data:', error)
    }
  }

  // Fall back to mock data if Sanity fetch fails or isn't configured
  if (!data) {
    console.log('Using mock data for homepage')
    data = mockHomepageData
  }

  const { siteSettings, stats, recentAchievements, leadership } = data

  return (
    <div className="min-h-screen">
      {/* Development Notice */}
      {!hasValidSanityConfig && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-sm font-semibold text-white">
                  🚀 <strong>Demo Mode:</strong> Using sample data. Connect your Sanity backend to see real content!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection siteSettings={siteSettings} />

      {/* Stats Section */}
      <StatsShowcase stats={stats} />

      {/* Recent Achievements Section */}
      {recentAchievements.length > 0 && (
        <AchievementShowcase achievements={recentAchievements} />
      )}

      {/* Leadership Preview Section */}
      {leadership.length > 0 && (
        <LeadershipPreview leadership={leadership} />
      )}

      {/* Call to Action */}
      <CallToAction />
    </div>
  )
}
