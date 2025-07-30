# Testing Guide - Class 11-Newton Frontend

This guide will help you test the frontend application in different scenarios.

## 🚀 Quick Start Testing

### 1. Test Without Backend (Mock Data Mode)

The application is configured to automatically use mock data when no Sanity backend is configured:

```bash
# Make sure you're in the frontend directory
cd newton-class-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will automatically detect that no Sanity backend is configured and use mock data.

### 2. Development Notice

When running without a backend, you'll see a yellow notice banner at the top of each page:

```
⚠️ Development Mode: Using mock data. Configure NEXT_PUBLIC_SANITY_PROJECT_ID to connect to your Sanity backend.
```

This is normal and expected behavior when testing without Sanity.

## 📋 Testing Checklist

### ✅ Homepage Testing (`http://localhost:3000`)

**Expected Features:**
- [ ] Hero section loads with animated background
- [ ] Statistics cards show mock data (6 students, 3 achievements, 5 leaders)
- [ ] Recent achievements section displays 3 achievement cards
- [ ] Leadership preview shows 4 student leader cards with photos
- [ ] All navigation links work
- [ ] Responsive design works on mobile/tablet/desktop

**Test Actions:**
1. Scroll through the entire page
2. Click "Meet Our Students" button → should go to `/students`
3. Click "View Achievements" button → should go to `/achievements`
4. Test on different screen sizes
5. Check that images load properly from Unsplash

### ✅ Students Page Testing (`/students`)

**Expected Features:**
- [ ] Shows 6 mock students with photos and information
- [ ] Search functionality works (try "Alice", "President", "Programming")
- [ ] Position filter dropdown works (try "President", "All Positions")
- [ ] Sort options work (Name A-Z, Position, Recently Added)
- [ ] View mode toggle (Grid ↔ List) works
- [ ] Student cards show: name, position, dream job, skills
- [ ] Clicking a student card opens a detailed modal

**Test Actions:**
1. Search for "Alice" → should filter to Alice Johnson
2. Filter by "President" → should show only Alice Johnson
3. Try different sort options
4. Switch between Grid and List views
5. Click on any student card → modal should open with full details
6. Test modal: scroll through content, close with X or Escape key
7. Test Instagram links (they go to instagram.com/username)

### ✅ Leadership Page Testing (`/leadership`)

**Expected Features:**
- [ ] Shows class adviser (Dr. Sarah Mitchell) with full profile
- [ ] Shows 5 student leaders (President, VP, Secretary, Treasurer, etc.)
- [ ] President card has special yellow styling and crown icon
- [ ] All cards show photos, names, positions, and dream jobs
- [ ] Adviser section shows achievements and experience
- [ ] Instagram links work for students who have them

**Test Actions:**
1. Verify adviser profile loads completely
2. Check that student leader cards display properly
3. Confirm President has special styling
4. Test Instagram links
5. Verify responsive layout

### ✅ Achievements Page Testing (`/achievements`)

**Expected Features:**
- [ ] Shows 3 mock achievements with different categories
- [ ] Category filter buttons work (Academic, Leadership, Innovation, etc.)
- [ ] Impact level filter works (All, Very High, High, Medium)
- [ ] Year filter works (All Years, 2024, 2023, etc.)
- [ ] Search functionality works (try "Science", "Community", "Innovation")
- [ ] Achievement cards show category icons, titles, descriptions
- [ ] Clicking an achievement opens detailed modal

**Test Actions:**
1. Search for "Science" → should show "Regional Science Fair Champions"
2. Filter by "Academic" category → should show academic achievements
3. Filter by "Very High" impact → should show high-impact achievements
4. Clear all filters using "Clear All" button
5. Click on any achievement → modal should open with full details
6. Test modal with criteria, recipients, and detailed descriptions

### ✅ Navigation Testing

**Expected Features:**
- [ ] Navbar stays fixed at top when scrolling
- [ ] Logo links back to homepage
- [ ] Active page is highlighted in navigation
- [ ] Mobile menu works on smaller screens
- [ ] Footer displays contact information and social links

**Test Actions:**
1. Navigate between all pages using navbar
2. Test mobile responsive navigation (hamburger menu)
3. Verify active page highlighting
4. Test footer links (they're placeholder links)
5. Test logo click returns to homepage

### ✅ Responsive Design Testing

Test the website at these breakpoints:

**Mobile (320px - 768px):**
- [ ] Single column layouts
- [ ] Hamburger menu navigation
- [ ] Cards stack vertically
- [ ] Text sizes are readable

**Tablet (768px - 1024px):**
- [ ] 2-column grid layouts
- [ ] Navigation bar layout
- [ ] Comfortable spacing

**Desktop (1024px+):**
- [ ] Multi-column layouts
- [ ] Full navigation visible
- [ ] Optimal spacing and typography

### ✅ Performance Testing

**Expected Performance:**
- [ ] Pages load quickly (under 2 seconds)
- [ ] Images load progressively
- [ ] Smooth animations and transitions
- [ ] No console errors in browser dev tools

**Test Actions:**
1. Open browser developer tools
2. Check Console tab for errors
3. Check Network tab for loading times
4. Test page loading speed
5. Verify smooth animations

## 🔧 Troubleshooting

### Common Issues and Solutions

**Issue: Page won't load**
- Solution: Check that `npm run dev` is running
- Solution: Verify you're accessing `http://localhost:3000`

**Issue: Images not loading**
- Solution: Check internet connection (images come from Unsplash)
- Solution: Try refreshing the page

**Issue: Development notice always showing**
- Expected: This is normal without Sanity backend configured
- To remove: Set up Sanity backend and configure environment variables

**Issue: Console errors**
- Check browser developer tools console
- Common: Network timeouts when trying to connect to Sanity
- Solution: These are expected and handled gracefully with fallback to mock data

**Issue: Search/filter not working**
- Verify you're typing in the search box
- Check that filters are being applied (active filter badges should appear)
- Try clearing all filters and starting fresh

## 📊 Mock Data Information

The application includes comprehensive mock data:

**Students (6 total):**
- Alice Johnson (President) - Software Engineer
- Bob Chen (Vice President) - Data Scientist  
- Carol Davis (Secretary) - Environmental Scientist
- David Wilson (Student) - Game Developer
- Emma Rodriguez (Treasurer) - Financial Analyst
- Frank Thompson (Student) - Medical Doctor

**Adviser:**
- Dr. Sarah Mitchell (Mathematics & Computer Science)

**Achievements (3 total):**
- Regional Science Fair Champions (Academic, Very High Impact)
- Community Service Excellence Award (Service, High Impact)
- Innovation Challenge Winners (Innovation, High Impact)

## 🎯 Expected User Experience

The website should feel like a real, production-ready class website with:

- **Professional Design**: Modern gradients, clean typography, consistent spacing
- **Smooth Interactions**: Hover effects, loading states, smooth transitions
- **Excellent UX**: Intuitive navigation, clear information hierarchy
- **Mobile-First**: Perfect experience on all device sizes
- **Fast Performance**: Quick loading, optimized images, efficient code

## 🚀 Next Steps

After testing the frontend:

1. **If everything works well**: Proceed to set up Sanity backend
2. **If issues found**: Check console errors and verify setup steps
3. **For deployment**: Follow the deployment guide in `DEPLOYMENT.md`
4. **For customization**: Modify mock data in `src/lib/mockData.ts`

## 📞 Support

If you encounter any issues:

1. Check browser console for error messages
2. Verify Node.js and npm versions are up to date
3. Try clearing browser cache and restarting dev server
4. Review the setup steps in `README.md`

---

**Happy Testing! 🎉**

The frontend is designed to work perfectly with mock data, giving you a complete preview of how the final website will look and function once connected to your Sanity backend. 