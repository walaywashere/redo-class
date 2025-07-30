'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Trophy, X } from 'lucide-react'
import { sanityFetch, hasValidSanityConfig } from '@/lib/sanity'
import { achievementsQuery, searchAchievementsQuery, achievementsByCategoryQuery } from '@/lib/queries'
import { mockSanityFetch } from '@/lib/mockData'
import AchievementCard from '@/components/cards/AchievementCard'
import AchievementModal from '@/components/modals/AchievementModal'
import type { Achievement, AchievementFilters } from '@/types'

const categoryOptions = [
  { value: 'all', label: 'All Categories', icon: '🎯' },
  { value: 'academic', label: 'Academic', icon: '📚' },
  { value: 'leadership', label: 'Leadership', icon: '👑' },
  { value: 'innovation', label: 'Innovation', icon: '💡' },
  { value: 'service', label: 'Service', icon: '🤝' },
  { value: 'sports', label: 'Sports', icon: '🏆' },
  { value: 'arts', label: 'Arts', icon: '🎨' },
]

const impactOptions = [
  { value: 'all', label: 'All Impact Levels' },
  { value: 'Very High', label: 'Very High Impact' },
  { value: 'High', label: 'High Impact' },
  { value: 'Medium', label: 'Medium Impact' },
]

const yearOptions = [
  { value: 'all', label: 'All Years' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
]

// Loading component
function AchievementsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded mb-8 w-1/2"></div>
          
          {/* Filter skeleton */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* Achievements grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-16 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Category stats component
function CategoryStats({ achievements }: { achievements: Achievement[] }) {
  const stats = useMemo(() => {
    return categoryOptions.slice(1).map(category => ({
      ...category,
      count: achievements.filter(a => a.category === category.value).length
    }))
  }, [achievements])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.value}
          className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100"
        >
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Filter states
  const [filters, setFilters] = useState<AchievementFilters>({
    category: 'all',
    search: '',
    impact: 'all',
    year: 'all'
  })

  // Load achievements data
  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setLoading(true)
        let data: Achievement[] | null = null
        
        if (hasValidSanityConfig) {
          data = await sanityFetch<Achievement[]>(achievementsQuery)
        }
        
        if (!data) {
          console.log('Using mock data for achievements')
          data = await mockSanityFetch.achievements()
        }
        
        if (data) {
          setAchievements(data)
        }
      } catch (error) {
        console.error('Error loading achievements:', error)
        // Fallback to mock data
        const mockData = await mockSanityFetch.achievements()
        setAchievements(mockData)
      } finally {
        setLoading(false)
      }
    }

    loadAchievements()
  }, [])

  // Search achievements when search term changes
  useEffect(() => {
    const searchAchievements = async () => {
      const searchTerm = filters.search || ''
      if (!searchTerm.trim()) {
        // If no search term, reload all achievements
        let data: Achievement[] | null = null
        
        if (hasValidSanityConfig) {
          data = await sanityFetch<Achievement[]>(achievementsQuery)
        }
        
        if (!data) {
          data = await mockSanityFetch.achievements()
        }
        
        if (data) setAchievements(data)
        return
      }

      try {
        let data: Achievement[] | null = null
        
        if (hasValidSanityConfig) {
          data = await sanityFetch<Achievement[]>(searchAchievementsQuery, {
            searchTerm: searchTerm.trim()
          })
        }
        
        if (!data) {
          data = await mockSanityFetch.searchAchievements(searchTerm.trim())
        }
        
        if (data) setAchievements(data)
      } catch (error) {
        console.error('Error searching achievements:', error)
      }
    }

    const debounceTimer = setTimeout(searchAchievements, 300)
    return () => clearTimeout(debounceTimer)
  }, [filters.search])

  // Filter achievements by category
  useEffect(() => {
    const loadByCategory = async () => {
      if (!filters.category || filters.category === 'all') {
        let data: Achievement[] | null = null
        
        if (hasValidSanityConfig) {
          data = await sanityFetch<Achievement[]>(achievementsQuery)
        }
        
        if (!data) {
          data = await mockSanityFetch.achievements()
        }
        
        if (data) setAchievements(data)
        return
      }

      try {
        let data: Achievement[] | null = null
        
        if (hasValidSanityConfig) {
          data = await sanityFetch<Achievement[]>(achievementsByCategoryQuery, {
            category: filters.category
          })
        }
        
        if (!data) {
          data = await mockSanityFetch.achievementsByCategory(filters.category)
        }
        
        if (data) setAchievements(data)
      } catch (error) {
        console.error('Error loading achievements by category:', error)
      }
    }

    // Only load by category if we're not searching
    if (!filters.search?.trim()) {
      loadByCategory()
    }
  }, [filters.category, filters.search])

  // Filter and sort achievements
  const filteredAchievements = useMemo(() => {
    let filtered = [...achievements]

    // Filter by impact
    if (filters.impact && filters.impact !== 'all') {
      filtered = filtered.filter(achievement => achievement.impact === filters.impact)
    }

    // Filter by year
    if (filters.year && filters.year !== 'all') {
      filtered = filtered.filter(achievement => achievement.year === filters.year)
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return b.year.localeCompare(a.year)
    })

    return filtered
  }, [achievements, filters.impact, filters.year])

  // Handle achievement card click
  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement)
    setIsModalOpen(true)
  }

  // Handle filter change
  const handleFilterChange = (key: keyof AchievementFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: 'all',
      search: '',
      impact: 'all',
      year: 'all'
    })
  }

  // Statistics
  const stats = useMemo(() => {
    const total = filteredAchievements.length
    const highImpact = filteredAchievements.filter(a => a.impact === 'Very High' || a.impact === 'High').length
    const thisYear = filteredAchievements.filter(a => a.year === '2024').length
    const categories = new Set(filteredAchievements.map(a => a.category)).size

    return { total, highImpact, thisYear, categories }
  }, [filteredAchievements])

  if (loading) {
    return <AchievementsPageSkeleton />
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
      <section className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Achievements
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Celebrating the remarkable accomplishments of Class 11-Newton across 
              academics, leadership, innovation, service, sports, and arts.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-sm text-green-200">Total Achievements</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{stats.highImpact}</div>
                <div className="text-sm text-green-200">High Impact</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{stats.thisYear}</div>
                <div className="text-sm text-green-200">This Year</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{stats.categories}</div>
                <div className="text-sm text-green-200">Categories</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Statistics */}
          <CategoryStats achievements={achievements} />

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search achievements by title, description, or recipients..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {filters.search && (
                  <button
                    onClick={() => handleFilterChange('search', '')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('category', option.value)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.category === option.value
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Impact Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Impact Level</label>
                <select
                  value={filters.impact || 'all'}
                  onChange={(e) => handleFilterChange('impact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {impactOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={filters.year || 'all'}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {yearOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.search || filters.category !== 'all' || filters.impact !== 'all' || filters.year !== 'all') && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Search: &ldquo;{filters.search}&rdquo;
                      <button
                        onClick={() => handleFilterChange('search', '')}
                        className="ml-2 hover:text-blue-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {filters.category !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Category: {categoryOptions.find(o => o.value === filters.category)?.label}
                      <button
                        onClick={() => handleFilterChange('category', 'all')}
                        className="ml-2 hover:text-green-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {filters.impact !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                      Impact: {filters.impact}
                      <button
                        onClick={() => handleFilterChange('impact', 'all')}
                        className="ml-2 hover:text-orange-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {filters.year !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Year: {filters.year}
                      <button
                        onClick={() => handleFilterChange('year', 'all')}
                        className="ml-2 hover:text-purple-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              Showing {filteredAchievements.length} of {achievements.length} achievements
            </div>
            <div className="text-sm text-gray-500">
              Sorted by date (newest first)
            </div>
          </div>

          {/* Achievements Grid */}
          <AnimatePresence mode="wait">
            {filteredAchievements.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No achievements found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={filteredAchievements.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredAchievements.map((achievement) => (
                  <AchievementCard
                    key={achievement._id}
                    achievement={achievement}
                    onClick={() => handleAchievementClick(achievement)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Achievement Modal */}
      <AchievementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        achievement={selectedAchievement}
      />
    </div>
  )
} 