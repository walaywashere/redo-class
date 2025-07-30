# Deployment Guide - Class 11-Newton Full-Stack Application

This guide covers the complete deployment process for both the Sanity CMS backend and Next.js frontend.

## 📋 Prerequisites

- GitHub account
- Vercel account
- Sanity account
- Domain name (optional)

## 🗂️ Project Structure Overview

```
redo-class/
├── newton-class-sanity/          # Sanity CMS Backend
│   ├── schemas/                  # Content schemas
│   ├── lib/                      # Utility functions
│   └── sanity.config.js         # Sanity configuration
└── newton-class-frontend/        # Next.js Frontend
    ├── src/                      # Application source
    ├── public/                   # Static assets
    └── package.json             # Dependencies
```

## 🎯 Deployment Strategy

We'll deploy in this order:
1. **Sanity Studio** (Backend CMS)
2. **Next.js Frontend** (Main website)
3. **Configure integrations** (CORS, environment variables)
4. **Add content** (Students, achievements, etc.)
5. **Final testing** (All features working)

---

## Phase 1: Sanity Backend Deployment

### Step 1: Create Sanity Project

1. **Sign up at Sanity.io**:
   - Go to [sanity.io](https://www.sanity.io/)
   - Create a new account or sign in

2. **Create a new project**:
   - Click "Create new project"
   - Choose "Create project with CLI" or use the web interface
   - Note your **Project ID** (you'll need this later)

### Step 2: Deploy Sanity Studio

1. **Navigate to Sanity directory**:
   ```bash
   cd newton-class-sanity
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp env.template .env.local
   ```
   
   Update `.env.local`:
   ```env
   SANITY_STUDIO_PROJECT_ID=your_actual_project_id_here
   ```

4. **Deploy the studio**:
   ```bash
   npm run build
   npm run deploy
   ```

5. **Access your studio**:
   - Studio URL: `https://your-project-id.sanity.studio`
   - You can now manage content through this interface

### Step 3: Configure Sanity Settings

1. **Set up CORS origins**:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Navigate to **API** → **CORS Origins**
   - Add these origins:
     ```
     http://localhost:3000
     http://localhost:3333
     https://your-project-id.sanity.studio
     https://your-vercel-app.vercel.app
     ```

2. **Generate API tokens** (optional but recommended):
   - Go to **API** → **Tokens**
   - Create a new token with **Read** permissions
   - Save this token for frontend configuration

---

## Phase 2: Next.js Frontend Deployment

### Step 1: Prepare Repository

1. **Push to GitHub**:
   ```bash
   cd newton-class-frontend
   git init
   git add .
   git commit -m "Initial commit: Class 11-Newton website"
   git branch -M main
   git remote add origin https://github.com/yourusername/newton-class-frontend.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `newton-class-frontend` directory

2. **Configure build settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

3. **Set environment variables**:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_read_token_here
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Note your deployment URL (e.g., `https://newton-class-frontend.vercel.app`)

### Step 3: Update Sanity CORS

1. **Add Vercel domain to CORS**:
   - Go back to Sanity project settings
   - Add your Vercel URL to CORS origins
   - Example: `https://newton-class-frontend.vercel.app`

---

## Phase 3: Content Population

### Step 1: Add Site Settings

1. **Open Sanity Studio**:
   - Go to `https://your-project-id.sanity.studio`

2. **Configure Site Settings**:
   - Navigate to **⚙️ Site Settings**
   - Add site title: "Class 11-Newton"
   - Add description and social links
   - Upload class logo (if available)
   - Configure hero section content

### Step 2: Add Class Adviser

1. **Create adviser profile**:
   - Go to **👨‍🏫 Class Adviser**
   - Add adviser name, photo, and department
   - Include quote and achievements
   - Add experience information

### Step 3: Add Students

1. **Create student profiles**:
   - Go to **👥 Students**
   - Add 10-15 student records minimum
   - Include varied positions (President, Secretary, etc.)
   - Add photos, dream jobs, and skills
   - Set social media links

### Step 4: Add Achievements

1. **Create achievements**:
   - Go to **🏆 Achievements**
   - Add achievements across all categories
   - Include academic, leadership, innovation, service, sports, arts
   - Set different impact levels
   - Add recipient information

---

## Phase 4: Domain Configuration (Optional)

### Step 1: Custom Domain Setup

1. **Purchase domain** (if needed):
   - Recommended: GoDaddy, Namecheap, Google Domains

2. **Configure in Vercel**:
   - Go to your project in Vercel
   - Navigate to **Settings** → **Domains**
   - Add your custom domain
   - Follow DNS configuration instructions

3. **Update CORS settings**:
   - Add your custom domain to Sanity CORS origins

### Step 2: SSL Configuration

- Vercel automatically provides SSL certificates
- Your site will be accessible via HTTPS

---

## Phase 5: Testing & Optimization

### Step 1: Functionality Testing

Test all features:
- [ ] Homepage loads with dynamic content
- [ ] Students page shows all profiles
- [ ] Search and filtering work
- [ ] Leadership page displays correctly
- [ ] Achievements page and modals function
- [ ] All images load properly
- [ ] Mobile responsive design works
- [ ] Navigation between pages works

### Step 2: Performance Testing

Use these tools:
- **Google PageSpeed Insights**: Check performance scores
- **GTmetrix**: Analyze loading times
- **Lighthouse**: Audit accessibility and SEO

### Step 3: Content Testing

Verify in Sanity Studio:
- [ ] Add new student → appears on frontend
- [ ] Edit achievement → changes reflect immediately
- [ ] Update site settings → homepage updates
- [ ] Upload images → display correctly

---

## 🚀 Go Live Checklist

### Pre-Launch
- [ ] All content added and reviewed
- [ ] Images optimized and uploaded
- [ ] Contact information verified
- [ ] Social media links tested
- [ ] Mobile design verified
- [ ] Performance optimized

### Launch
- [ ] Domain configured (if using custom domain)
- [ ] SSL certificate active
- [ ] All pages accessible
- [ ] Search functionality working
- [ ] Forms and interactions tested
- [ ] Analytics configured (optional)

### Post-Launch
- [ ] Monitor performance
- [ ] Test content updates
- [ ] Backup content (Sanity handles this)
- [ ] Monitor for any issues
- [ ] Share with stakeholders

---

## 🔧 Maintenance

### Regular Tasks

**Weekly**:
- Update student information as needed
- Add new achievements
- Monitor site performance

**Monthly**:
- Review and update content
- Check for broken links
- Update photos if needed

**Quarterly**:
- Review and refresh design elements
- Update technology dependencies
- Backup important content

### Content Updates

All content updates happen through Sanity Studio:
1. Log into `https://your-project-id.sanity.studio`
2. Make changes to content
3. Publish changes
4. Changes appear immediately on website

---

## 🆘 Troubleshooting

### Common Issues

**Site not loading**:
- Check Vercel deployment status
- Verify environment variables are set
- Check domain DNS settings

**Images not appearing**:
- Verify Sanity CORS settings include your domain
- Check image references in Sanity
- Ensure images are published

**Content not updating**:
- Confirm changes are published in Sanity
- Check browser cache (try incognito mode)
- Verify Sanity project ID is correct

**Search not working**:
- Check network tab for API errors
- Verify Sanity token permissions
- Test queries in Sanity Vision tool

### Support Resources

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Sanity**: [sanity.io/docs](https://sanity.io/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)

---

## 📞 Final Steps

1. **Share the website** with class members
2. **Train content editors** on using Sanity Studio
3. **Set up regular content update schedule**
4. **Monitor performance** and user feedback
5. **Plan future enhancements**

Congratulations! Your Class 11-Newton website is now live and ready to showcase your amazing community! 🎉 