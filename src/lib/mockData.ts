import type { Student, Adviser, Achievement, SiteSettings, HomepageData } from '@/types'

// Mock students data
export const mockStudents: Student[] = [
  {
    _id: '1',
    _type: 'student',
    _createdAt: '2024-01-15T10:00:00Z',
    _updatedAt: '2024-01-15T10:00:00Z',
    name: 'Alice Johnson',
    position: 'President',
    dreamJob: 'Software Engineer',
    funFact: 'I can solve a Rubik\'s cube in under 2 minutes!',
    quote: 'Leadership is not about being in charge, it\'s about taking care of those in your charge.',
    socials: { instagram: 'alice_codes' },
    skills: ['Leadership', 'Programming', 'Public Speaking'],
    photo: {
      asset: { _ref: 'mock-1', _type: 'reference' }
    },
    photoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEwMCAzMDBDMTAwIDI1MiAxNDUgMjEyIDIwMCAyMTJTMzAwIDI1MiAzMDAgMzAwSCEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K'
  },
  {
    _id: '2',
    _type: 'student',
    _createdAt: '2024-01-15T10:00:00Z',
    _updatedAt: '2024-01-15T10:00:00Z',
    name: 'Bob Chen',
    position: 'Vice President',
    dreamJob: 'Data Scientist',
    funFact: 'I have traveled to 15 countries and speak 4 languages.',
    quote: 'Data is the new oil, but insights are the refined fuel.',
    socials: { instagram: 'bob_travels' },
    skills: ['Data Analysis', 'Mathematics', 'Problem Solving'],
    photo: {
      asset: { _ref: 'mock-2', _type: 'reference' }
    },
    photoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRUJGOEZGIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjAiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTEwMCAzMDBDMTAwIDI1MiAxNDUgMjEyIDIwMCAyMTJTMzAwIDI1MiAzMDAgMzAwSCEwMFoiIGZpbGw9IiM2MzY2RjEiLz4KPHN2Zz4K'
  },
  {
    _id: '3',
    _type: 'student',
    _createdAt: '2024-01-15T10:00:00Z',
    _updatedAt: '2024-01-15T10:00:00Z',
    name: 'Carol Davis',
    position: 'Secretary',
    dreamJob: 'Environmental Scientist',
    funFact: 'I have planted over 100 trees in our local community.',
    quote: 'Be the change you wish to see in the world.',
    socials: { instagram: 'carol_green' },
    skills: ['Organization', 'Environmental Science', 'Writing'],
    photo: {
      asset: { _ref: 'mock-3', _type: 'reference' }
    },
    photoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGREY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjAiIGZpbGw9IiMxMEI5ODEiLz4KPHBhdGggZD0iTTEwMCAzMDBDMTAwIDI1MiAxNDUgMjEyIDIwMCAyMTJTMzAwIDI1MiAzMDAgMzAwSCEwMFoiIGZpbGw9IiMxMEI5ODEiLz4KPHN2Zz4K'
  },
  {
    _id: '4',
    _type: 'student',
    _createdAt: '2024-01-15T10:00:00Z',
    _updatedAt: '2024-01-15T10:00:00Z',
    name: 'David Wilson',
    position: 'Student',
    dreamJob: 'Game Developer',
    funFact: 'I created my first video game at age 14.',
    quote: 'Every expert was once a beginner.',
    socials: { instagram: 'david_games' },
    skills: ['Game Development', 'Programming', 'Creative Design'],
    photo: {
      asset: { _ref: 'mock-4', _type: 'reference' }
    },
    photoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkVGM0U3Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjAiIGZpbGw9IiNGNTlFMEIiLz4KPHBhdGggZD0iTTEwMCAzMDBDMTAwIDI1MiAxNDUgMjEyIDIwMCAyMTJTMzAwIDI1MiAzMDAgMzAwSCEwMFoiIGZpbGw9IiNGNTlFMEIiLz4KPHN2Zz4K'
  },
  {
    _id: '5',
    _type: 'student',
    _createdAt: '2024-01-15T10:00:00Z',
    _updatedAt: '2024-01-15T10:00:00Z',
    name: 'Emma Rodriguez',
    position: 'Treasurer',
    dreamJob: 'Financial Analyst',
    funFact: 'I started investing in stocks when I was 16.',
    quote: 'Financial literacy is the key to financial freedom.',
    socials: { instagram: 'emma_finance' },
    skills: ['Finance', 'Mathematics', 'Strategic Planning'],
    photo: {
      asset: { _ref: 'mock-5', _type: 'reference' }
    },
    photoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkRGMkY4Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjAiIGZpbGw9IiNBODU1RjciLz4KPHBhdGggZD0iTTEwMCAzMDBDMTAwIDI1MiAxNDUgMjEyIDIwMCAyMTJTMzAwIDI1MiAzMDAgMzAwSCEwMFoiIGZpbGw9IiNBODU1RjciLz4KPHN2Zz4K'
  },
  {
    _id: '6',
    _type: 'student',
    _createdAt: '2024-01-15T10:00:00Z',
    _updatedAt: '2024-01-15T10:00:00Z',
    name: 'Frank Thompson',
    position: 'Student',
    dreamJob: 'Medical Doctor',
    funFact: 'I volunteer at the local animal shelter every weekend.',
    quote: 'Healing is a matter of time, but it is sometimes also a matter of opportunity.',
    skills: ['Biology', 'Chemistry', 'Compassion'],
    photo: {
      asset: { _ref: 'mock-6', _type: 'reference' }
    },
    photoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGOUZGIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjAiIGZpbGw9IiMwNTY5REYiLz4KPHBhdGggZD0iTTEwMCAzMDBDMTAwIDI1MiAxNDUgMjEyIDIwMCAyMTJTMzAwIDI1MiAzMDAgMzAwSCEwMFoiIGZpbGw9IiMwNTY5REYiLz4KPHN2Zz4K'
  }
]

// Mock adviser data
export const mockAdviser: Adviser = {
  _id: 'adviser-1',
  _type: 'adviser',
  _createdAt: '2024-01-01T10:00:00Z',
  _updatedAt: '2024-01-01T10:00:00Z',
  name: 'Dr. Sarah Mitchell',
  role: 'Class Adviser',
  department: 'Mathematics & Computer Science',
  experience: '12 years',
  quote: 'Education is the most powerful weapon which you can use to change the world.',
  fact: 'I have a PhD in Applied Mathematics and have published 15 research papers.',
  achievements: [
    'Teacher of the Year 2023',
    'Published researcher in computational mathematics',
    'Mentored over 200 students to academic success',
    'Developed innovative teaching methodologies'
  ],
  photo: {
    asset: { _ref: 'adviser-mock', _type: 'reference' }
  },
  photoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkFGNUZGIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjAiIGZpbGw9IiM4QjUyRjciLz4KPHBhdGggZD0iTTEwMCAzMDBDMTAwIDI1MiAxNDUgMjEyIDIwMCAyMTJTMzAwIDI1MiAzMDAgMzAwSCEwMFoiIGZpbGw9IiM4QjUyRjciLz4KPHN2Zz4K'
}

// Mock achievements data
export const mockAchievements: Achievement[] = [
  {
    _id: 'achievement-1',
    _type: 'achievement',
    _createdAt: '2024-01-10T10:00:00Z',
    _updatedAt: '2024-01-10T10:00:00Z',
    title: 'Regional Science Fair Champions',
    category: 'academic',
    year: '2024',
    description: 'Our class won first place in the regional science fair with an innovative renewable energy project.',
    detailedDescription: 'The project involved creating a hybrid solar-wind energy system that could power a small home. The team spent 6 months researching, designing, and building the prototype.',
    impact: 'Very High',
    date: '2024-03-15',
    criteria: ['Original research', 'Practical application', 'Presentation quality', 'Innovation'],
    students: ['Alice Johnson', 'Bob Chen', 'David Wilson']
  },
  {
    _id: 'achievement-2',
    _type: 'achievement',
    _createdAt: '2024-01-12T10:00:00Z',
    _updatedAt: '2024-01-12T10:00:00Z',
    title: 'Community Service Excellence Award',
    category: 'service',
    year: '2024',
    description: 'Recognized for organizing 10+ community service events that helped over 500 local residents.',
    detailedDescription: 'Our class organized food drives, park cleanups, tutoring sessions for younger students, and technology training for seniors in our community.',
    impact: 'High',
    date: '2024-02-20',
    criteria: ['Community impact', 'Student participation', 'Sustained effort', 'Leadership'],
    students: ['Carol Davis', 'Emma Rodriguez', 'Frank Thompson']
  },
  {
    _id: 'achievement-3',
    _type: 'achievement',
    _createdAt: '2024-01-14T10:00:00Z',
    _updatedAt: '2024-01-14T10:00:00Z',
    title: 'Innovation Challenge Winners',
    category: 'innovation',
    year: '2024',
    description: 'Developed a mobile app that helps students track their study habits and improve productivity.',
    detailedDescription: 'The StudySync app uses AI to analyze study patterns and provide personalized recommendations. It has been downloaded by over 1,000 students.',
    impact: 'High',
    date: '2024-04-10',
    criteria: ['Technical innovation', 'User adoption', 'Problem solving', 'Design excellence'],
    students: ['Alice Johnson', 'David Wilson']
  }
]

// Mock site settings
export const mockSiteSettings: SiteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  _createdAt: '2024-01-01T10:00:00Z',
  _updatedAt: '2024-01-01T10:00:00Z',
  title: 'Class 11-Newton',
  description: 'A diverse community of students dedicated to academic excellence, leadership development, and making a positive impact in our world.',
  socialLinks: {
    facebook: 'https://facebook.com/class11newton',
    instagram: 'https://instagram.com/class11newton',
    twitter: 'https://twitter.com/class11newton'
  },
  heroSection: {
    headline: 'Welcome to Class 11-Newton',
    subheadline: 'Excellence in Education and Leadership',
    backgroundImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMUU0MEFGO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3QzNBRUQ7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8L3N2Zz4K'
  },
  logo: {
    asset: { _ref: 'logo-mock', _type: 'reference' }
  }
}

// Mock homepage data
export const mockHomepageData: HomepageData = {
  siteSettings: mockSiteSettings,
  stats: {
    totalStudents: mockStudents.length,
    totalAchievements: mockAchievements.length,
    leadershipTeam: mockStudents.filter(s => s.position !== 'Student').length
  },
  recentAchievements: mockAchievements.slice(0, 3),
  leadership: mockStudents.filter(s => s.position !== 'Student').slice(0, 4)
}

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API functions with simulated network delay
export const mockSanityFetch = {
  async students(): Promise<Student[]> {
    await delay(500) // Simulate network delay
    return mockStudents
  },

  async adviser(): Promise<Adviser | null> {
    await delay(300)
    return mockAdviser
  },

  async achievements(): Promise<Achievement[]> {
    await delay(400)
    return mockAchievements
  },

  async siteSettings(): Promise<SiteSettings | null> {
    await delay(200)
    return mockSiteSettings
  },

  async homepageData(): Promise<HomepageData> {
    await delay(600)
    return mockHomepageData
  },

  async searchStudents(searchTerm: string): Promise<Student[]> {
    await delay(300)
    const term = searchTerm.toLowerCase()
    return mockStudents.filter(student => 
      student.name.toLowerCase().includes(term) ||
      student.position.toLowerCase().includes(term) ||
      student.dreamJob.toLowerCase().includes(term) ||
      student.funFact?.toLowerCase().includes(term) ||
      student.skills?.some(skill => skill.toLowerCase().includes(term))
    )
  },

  async searchAchievements(searchTerm: string): Promise<Achievement[]> {
    await delay(300)
    const term = searchTerm.toLowerCase()
    return mockAchievements.filter(achievement =>
      achievement.title.toLowerCase().includes(term) ||
      achievement.description.toLowerCase().includes(term) ||
      achievement.category.toLowerCase().includes(term) ||
      achievement.students?.some(student => student.toLowerCase().includes(term))
    )
  },

  async achievementsByCategory(category: string): Promise<Achievement[]> {
    await delay(300)
    return mockAchievements.filter(achievement => achievement.category === category)
  },

  async leadership(): Promise<Student[]> {
    await delay(300)
    return mockStudents.filter(student => student.position !== 'Student')
  }
} 