'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid3x3, List, Users, X } from 'lucide-react'
import { sanityFetch, hasValidSanityConfig } from '@/lib/sanity'
import { studentsQuery, searchStudentsQuery } from '@/lib/queries'
import { mockSanityFetch } from '@/lib/mockData'
import StudentCard from '@/components/cards/StudentCard'
import StudentModal from '@/components/modals/StudentModal'
import type { Student, StudentFilters } from '@/types'

const positionOptions = [
  { value: 'all', label: 'All Positions' },
  { value: 'Student', label: 'Students' },
  { value: 'President', label: 'President' },
  { value: 'Vice President', label: 'Vice President' },
  { value: 'Secretary', label: 'Secretary' },
  { value: 'Treasurer', label: 'Treasurer' },
  { value: 'Public Relations Officer', label: 'PR Officer' },
  { value: 'Committee Head', label: 'Committee Head' },
]

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'position', label: 'Position' },
  { value: 'recent', label: 'Recently Added' },
]

// Loading component
function StudentsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded mb-8 w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Filter and view states
  const [filters, setFilters] = useState<StudentFilters>({
    search: '',
    position: 'all',
    sortBy: 'name',
    viewMode: 'grid'
  })

  // Load students data
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true)
        let data: Student[] | null = null
        
        if (hasValidSanityConfig) {
          data = await sanityFetch<Student[]>(studentsQuery)
        }
        
        if (!data) {
          console.log('Using mock data for students')
          data = await mockSanityFetch.students()
        }
        
        if (data) {
          setStudents(data)
        }
      } catch (error) {
        console.error('Error loading students:', error)
        // Fallback to mock data if real API fails
        const mockData = await mockSanityFetch.students()
        setStudents(mockData)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [])

  // Search students when search term changes
  useEffect(() => {
    const searchStudents = async () => {
      const searchTerm = filters.search || ''
      if (!searchTerm.trim()) {
        // If no search term, reload all students
        let data: Student[] | null = null
        
        if (hasValidSanityConfig) {
          data = await sanityFetch<Student[]>(studentsQuery)
        }
        
        if (!data) {
          data = await mockSanityFetch.students()
        }
        
        if (data) setStudents(data)
        return
      }

      try {
        let data: Student[] | null = null
        
        if (hasValidSanityConfig) {
          data = await sanityFetch<Student[]>(searchStudentsQuery, {
            searchTerm: searchTerm.trim()
          })
        }
        
        if (!data) {
          data = await mockSanityFetch.searchStudents(searchTerm.trim())
        }
        
        if (data) setStudents(data)
      } catch (error) {
        console.error('Error searching students:', error)
      }
    }

    const debounceTimer = setTimeout(searchStudents, 300)
    return () => clearTimeout(debounceTimer)
  }, [filters.search])

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = [...students]

    // Filter by position
    if (filters.position && filters.position !== 'all') {
      filtered = filtered.filter(student => student.position === filters.position)
    }

    // Sort students
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'position':
        filtered.sort((a, b) => {
          if (a.position === 'Student' && b.position !== 'Student') return 1
          if (a.position !== 'Student' && b.position === 'Student') return -1
          return a.position.localeCompare(b.position)
        })
        break
      case 'recent':
        filtered.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime())
        break
    }

    return filtered
  }, [students, filters.position, filters.sortBy])

  // Handle student card click
  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  // Handle filter change
  const handleFilterChange = (key: keyof StudentFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Statistics
  const stats = useMemo(() => {
    const total = filteredAndSortedStudents.length
    const leaders = filteredAndSortedStudents.filter(s => s.position !== 'Student').length
    const regular = total - leaders

    return { total, leaders, regular }
  }, [filteredAndSortedStudents])

  if (loading) {
    return <StudentsPageSkeleton />
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Amazing Students
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Meet the incredible individuals who make up Class 11-Newton. 
              Each student brings unique talents, dreams, and perspectives to our community.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-sm text-blue-200">Total Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{stats.leaders}</div>
                <div className="text-sm text-blue-200">Student Leaders</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{stats.regular}</div>
                <div className="text-sm text-blue-200">Class Members</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search students by name, position, dream job, or skills..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                {/* Position Filter */}
                <select
                  value={filters.position}
                  onChange={(e) => handleFilterChange('position', e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {positionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleFilterChange('viewMode', 'grid')}
                    className={`p-3 ${filters.viewMode === 'grid' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Grid3x3 size={20} />
                  </button>
                  <button
                    onClick={() => handleFilterChange('viewMode', 'list')}
                    className={`p-3 ${filters.viewMode === 'list' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.search || filters.position !== 'all') && (
              <div className="mt-4 flex flex-wrap gap-2">
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
                {filters.position !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Position: {positionOptions.find(o => o.value === filters.position)?.label}
                    <button
                      onClick={() => handleFilterChange('position', 'all')}
                      className="ml-2 hover:text-purple-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              Showing {filteredAndSortedStudents.length} of {students.length} students
            </div>
            <div className="text-sm text-gray-500">
              Sorted by {sortOptions.find(o => o.value === filters.sortBy)?.label}
            </div>
          </div>

          {/* Students Grid/List */}
          <AnimatePresence mode="wait">
            {filteredAndSortedStudents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No students found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters to see more results.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`${filters.viewMode}-${filteredAndSortedStudents.length}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={
                  filters.viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredAndSortedStudents.map((student) => (
                  <StudentCard
                    key={student._id}
                    student={student}
                    viewMode={filters.viewMode}
                    onClick={() => handleStudentClick(student)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
      />
    </div>
  )
} 