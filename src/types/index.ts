// Base Sanity document type
export interface SanityDocument {
  _id: string
  _createdAt: string
  _updatedAt: string
  _type: string
}

// Image type for Sanity images
export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

// Student type matching the student schema
export interface Student extends SanityDocument {
  _type: 'student'
  name: string
  photo: SanityImage
  photoUrl?: string
  photoAlt?: string
  position: 'Student' | 'President' | 'Vice President' | 'Secretary' | 'Treasurer' | 'Public Relations Officer' | 'Committee Head'
  dreamJob: string
  funFact?: string
  quote?: string
  socials?: {
    instagram?: string
  }
  skills?: string[]
}

// Adviser type matching the adviser schema
export interface Adviser extends SanityDocument {
  _type: 'adviser'
  name: string
  photo: SanityImage
  photoUrl?: string
  photoAlt?: string
  role: string
  quote?: string
  fact?: string
  department: string
  experience?: string
  achievements?: string[]
}

// Achievement type matching the achievement schema
export interface Achievement extends SanityDocument {
  _type: 'achievement'
  title: string
  category: 'academic' | 'leadership' | 'innovation' | 'service' | 'sports' | 'arts'
  year: string
  description: string
  detailedDescription?: string
  impact: 'Medium' | 'High' | 'Very High'
  date?: string
  criteria?: string[]
  students?: string[]
}

// Site Settings type matching the siteSettings schema
export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings'
  title?: string
  description?: string
  logo?: SanityImage
  logoUrl?: string
  logoAlt?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  heroSection?: {
    headline?: string
    subheadline?: string
    backgroundImage?: SanityImage
    backgroundImageUrl?: string
    backgroundImageAlt?: string
  }
}

// Stats type for homepage statistics
export interface Stats {
  totalStudents: number
  totalAchievements: number
  leadershipTeam: number
  academicAchievements?: number
  leadershipAchievements?: number
  innovationAchievements?: number
  serviceAchievements?: number
  sportsAchievements?: number
  artsAchievements?: number
}

// Homepage data type combining multiple data sources
export interface HomepageData {
  siteSettings: SiteSettings | null
  stats: Stats
  recentAchievements: Achievement[]
  leadership: Student[]
}

// Filter and search types
export interface StudentFilters {
  position?: string
  search?: string
  sortBy?: 'name' | 'position' | 'recent'
  viewMode?: 'grid' | 'list'
}

export interface AchievementFilters {
  category?: Achievement['category'] | 'all'
  year?: string
  impact?: Achievement['impact'] | 'all'
  search?: string
}

// Component prop types
export interface StudentCardProps {
  student: Student
  viewMode?: 'grid' | 'list'
  onClick?: () => void
}

export interface AchievementCardProps {
  achievement: Achievement
  onClick?: () => void
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  student: Student | null
}

export interface AchievementModalProps {
  isOpen: boolean
  onClose: () => void
  achievement: Achievement | null
}

// API response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

// Page props types for Next.js pages
export interface StudentsPageProps {
  students: Student[]
  filters: StudentFilters
}

export interface LeadershipPageProps {
  adviser: Adviser | null
  leaders: Student[]
}

export interface AchievementsPageProps {
  achievements: Achievement[]
  filters: AchievementFilters
}

export interface HomePageProps {
  homepageData: HomepageData
} 