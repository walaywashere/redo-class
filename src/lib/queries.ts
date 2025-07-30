// GROQ Queries for Newton Class 11 Website
// These queries fetch data from Sanity with proper TypeScript typing

// Student Queries
export const studentsQuery = `*[_type == "student"] | order(name asc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  "photoUrl": photo.asset->url,
  "photoAlt": photo.alt,
  photo,
  position,
  dreamJob,
  funFact,
  quote,
  socials,
  skills
}`

export const studentByIdQuery = `*[_type == "student" && _id == $id][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  "photoUrl": photo.asset->url,
  "photoAlt": photo.alt,
  photo,
  position,
  dreamJob,
  funFact,
  quote,
  socials,
  skills
}`

export const leadershipQuery = `*[_type == "student" && position != "Student"] | order(_createdAt asc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  "photoUrl": photo.asset->url,
  "photoAlt": photo.alt,
  photo,
  position,
  dreamJob,
  funFact,
  quote,
  socials,
  skills
}`

// Adviser Queries
export const adviserQuery = `*[_type == "adviser"][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  "photoUrl": photo.asset->url,
  "photoAlt": photo.alt,
  photo,
  role,
  quote,
  fact,
  department,
  experience,
  achievements
}`

// Achievement Queries
export const achievementsQuery = `*[_type == "achievement"] | order(date desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  category,
  year,
  description,
  detailedDescription,
  impact,
  date,
  criteria,
  students
}`

export const achievementsByCategoryQuery = `*[_type == "achievement" && category == $category] | order(date desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  category,
  year,
  description,
  detailedDescription,
  impact,
  date,
  criteria,
  students
}`

export const achievementByIdQuery = `*[_type == "achievement" && _id == $id][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  category,
  year,
  description,
  detailedDescription,
  impact,
  date,
  criteria,
  students
}`

// Site Settings Query
export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  _id,
  _type,
  _updatedAt,
  title,
  description,
  "logoUrl": logo.asset->url,
  "logoAlt": logo.alt,
  logo,
  socialLinks,
  heroSection {
    headline,
    subheadline,
    "backgroundImageUrl": backgroundImage.asset->url,
    "backgroundImageAlt": backgroundImage.alt,
    backgroundImage
  }
}`

// Statistics Queries
export const statsQuery = `{
  "totalStudents": count(*[_type == "student"]),
  "totalAchievements": count(*[_type == "achievement"]),
  "leadershipTeam": count(*[_type == "student" && position != "Student"]),
  "academicAchievements": count(*[_type == "achievement" && category == "academic"]),
  "leadershipAchievements": count(*[_type == "achievement" && category == "leadership"]),
  "innovationAchievements": count(*[_type == "achievement" && category == "innovation"]),
  "serviceAchievements": count(*[_type == "achievement" && category == "service"]),
  "sportsAchievements": count(*[_type == "achievement" && category == "sports"]),
  "artsAchievements": count(*[_type == "achievement" && category == "arts"])
}`

// Search Queries
export const searchStudentsQuery = `*[_type == "student" && (
  name match $searchTerm + "*" ||
  position match $searchTerm + "*" ||
  dreamJob match $searchTerm + "*" ||
  funFact match $searchTerm + "*" ||
  $searchTerm in skills[]
)] | order(name asc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  "photoUrl": photo.asset->url,
  "photoAlt": photo.alt,
  photo,
  position,
  dreamJob,
  funFact,
  quote,
  socials,
  skills
}`

export const searchAchievementsQuery = `*[_type == "achievement" && (
  title match $searchTerm + "*" ||
  description match $searchTerm + "*" ||
  category match $searchTerm + "*" ||
  $searchTerm in students[]
)] | order(date desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  category,
  year,
  description,
  detailedDescription,
  impact,
  date,
  criteria,
  students
}`

// Filtering Queries
export const studentsByPositionQuery = `*[_type == "student" && position == $position] | order(name asc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  "photoUrl": photo.asset->url,
  "photoAlt": photo.alt,
  photo,
  position,
  dreamJob,
  funFact,
  quote,
  socials,
  skills
}`

export const recentAchievementsQuery = `*[_type == "achievement"] | order(date desc)[0...$limit] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  category,
  year,
  description,
  impact,
  date,
  students
}`

// Combined Homepage Data Query
export const homepageDataQuery = `{
  "siteSettings": *[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id,
    _type,
    title,
    description,
    "logoUrl": logo.asset->url,
    "logoAlt": logo.alt,
    logo,
    socialLinks,
    heroSection {
      headline,
      subheadline,
      "backgroundImageUrl": backgroundImage.asset->url,
      "backgroundImageAlt": backgroundImage.alt,
      backgroundImage
    }
  },
  "stats": {
    "totalStudents": count(*[_type == "student"]),
    "totalAchievements": count(*[_type == "achievement"]),
    "leadershipTeam": count(*[_type == "student" && position != "Student"])
  },
  "recentAchievements": *[_type == "achievement"] | order(date desc)[0...3] {
    _id,
    _type,
    title,
    category,
    description,
    impact,
    year
  },
  "leadership": *[_type == "student" && position != "Student"] | order(_createdAt asc)[0...4] {
    _id,
    _type,
    name,
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt,
    photo,
    position
  }
}` 