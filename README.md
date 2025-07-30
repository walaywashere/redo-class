# Class 11-Newton Website - Next.js Frontend

This is the frontend application for the Class 11-Newton website, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. It integrates with a Sanity.io CMS backend to provide a dynamic, content-managed class website.

## 🚀 Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Stunning Animations**: Framer Motion for smooth, engaging animations
- **Responsive Design**: Mobile-first design that works on all devices
- **Content Management**: Fully integrated with Sanity.io CMS
- **Search & Filtering**: Advanced search and filtering capabilities
- **Performance Optimized**: Server-side rendering, image optimization, and caching
- **Accessibility**: Built with accessibility best practices

## 📁 Project Structure

```
newton-class-frontend/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── (root)/            # Homepage
│   │   ├── students/          # Students page with filtering
│   │   ├── leadership/        # Leadership team page
│   │   ├── achievements/      # Achievements with categories
│   │   └── layout.tsx         # Root layout with navbar/footer
│   ├── components/            # Reusable React components
│   │   ├── cards/            # Card components (Student, Achievement)
│   │   ├── modals/           # Modal components
│   │   ├── ui/               # UI utility components
│   │   ├── Navbar.tsx        # Navigation component
│   │   └── Footer.tsx        # Footer component
│   ├── lib/                  # Utility functions and configurations
│   │   ├── sanity.ts         # Sanity client configuration
│   │   └── queries.ts        # GROQ queries for data fetching
│   └── types/                # TypeScript type definitions
│       └── index.ts          # All type exports
├── public/                    # Static assets
├── .env.local.template       # Environment variables template
└── package.json              # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **CMS**: Sanity.io
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component
- **Deployment**: Vercel (recommended)

## 📋 Pages Overview

### Homepage (`/`)
- Hero section with dynamic content from Sanity
- Statistics overview (students, achievements, leadership)
- Recent achievements showcase
- Leadership team preview
- Call-to-action sections

### Students Page (`/students`)
- Complete student directory with photos and profiles
- Advanced search functionality (name, position, skills, etc.)
- Position-based filtering (President, Secretary, etc.)
- Grid and list view modes
- Sorting options (name, position, recent)
- Student detail modals with full information

### Leadership Page (`/leadership`)
- Class adviser profile with detailed information
- Student leadership team showcase
- Special highlighting for class president
- Contact information and social links
- Interactive cards with hover effects

### Achievements Page (`/achievements`)
- Category-based achievement organization
- Advanced filtering (category, impact level, year)
- Search functionality across titles and descriptions
- Interactive achievement cards
- Detailed achievement modals
- Statistics dashboard

## 🚦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- A Sanity.io project (see backend setup)

### Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd newton-class-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_read_token_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000`

## 🎨 Styling & Design

### Design System

- **Colors**: Blue and indigo gradients for primary actions, with category-specific colors
- **Typography**: System fonts with excellent readability
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Animations**: Subtle, purposeful animations that enhance UX

### Component Library

All components are built with:
- **Responsive design**: Mobile-first approach
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Consistency**: Standardized props and styling patterns
- **Reusability**: Modular design for easy maintenance

### Animations

Framer Motion is used for:
- Page transitions and layout animations
- Card hover effects and interactions
- Modal entrance/exit animations
- Loading states and skeleton screens
- Scroll-triggered animations

## 🔍 Search & Filtering

### Student Search
- **Full-text search**: Names, positions, dream jobs, skills
- **Position filtering**: All leadership roles and regular students
- **Sorting options**: Alphabetical, by position, by creation date
- **View modes**: Grid and list layouts
- **Real-time results**: Debounced search with instant feedback

### Achievement Filtering
- **Category filters**: Academic, Leadership, Innovation, Service, Sports, Arts
- **Impact levels**: Medium, High, Very High
- **Year filtering**: Multi-year support
- **Search functionality**: Titles, descriptions, recipient names
- **Combined filters**: Multiple filters work together

## 🌐 API Integration

### Sanity.io Connection

The frontend connects to Sanity via:
- **Client-side fetching**: For interactive features and search
- **Server-side rendering**: For initial page loads and SEO
- **Image optimization**: Sanity's image transformation API
- **Real-time updates**: Optional preview mode support

### Key Queries

- `studentsQuery`: All student profiles with full data
- `leadershipQuery`: Student officers and leadership team
- `adviserQuery`: Class adviser information
- `achievementsQuery`: All achievements with filtering
- `homepageDataQuery`: Combined data for homepage

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: 320px - 768px (single column layouts)
- **Tablet**: 768px - 1024px (two-column layouts)
- **Desktop**: 1024px+ (multi-column layouts)
- **Large screens**: 1280px+ (optimized spacing)

## ⚡ Performance Features

- **Server-side rendering**: Fast initial page loads
- **Image optimization**: WebP format, responsive sizing
- **Code splitting**: Automatic code splitting by route
- **Caching**: Sanity CDN caching for images and content
- **Bundle optimization**: Tree shaking and minification

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure project settings

3. **Set environment variables**:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_token
   ```

4. **Deploy**: Vercel will automatically build and deploy

5. **Configure Sanity CORS**:
   - Add your Vercel domain to Sanity CORS origins
   - Format: `https://your-app.vercel.app`

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Search functionality works on all pages
- [ ] Filters apply correctly
- [ ] Modals open and close properly
- [ ] Mobile responsive design works
- [ ] Images load and display correctly
- [ ] Navigation works between all pages
- [ ] Data loads from Sanity correctly

## 🔄 Content Updates

Content is managed through the Sanity Studio:

1. **Students**: Add/edit student profiles, photos, and information
2. **Leadership**: Update adviser information and student officers
3. **Achievements**: Create and categorize new achievements
4. **Site Settings**: Modify global site content and settings

Changes appear immediately on the website after publishing in Sanity.

## 🐛 Troubleshooting

### Common Issues

**Images not loading**:
- Check Sanity CORS settings
- Verify image references in Sanity
- Ensure project ID is correct

**Data not appearing**:
- Confirm environment variables are set
- Check Sanity project ID and dataset
- Verify content is published in Sanity

**Build errors**:
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `npm ci`
- Check TypeScript errors: `npm run type-check`

## 📄 License

This project is created for Class 11-Newton and is intended for educational purposes.

---

**Next Steps**: 
1. Set up the Sanity backend (see `../newton-class-sanity/`)
2. Add content through the Sanity Studio
3. Deploy both frontend and backend
4. Configure domain and final settings
