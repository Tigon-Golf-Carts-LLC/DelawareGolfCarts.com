# Delaware Golf Carts - Advanced Static Website

A modern, dark-themed, fully responsive static website for Delaware Golf Carts featuring DENAGO and EVOLUTION electric vehicles. Built with pure HTML, CSS, and vanilla JavaScript, ready for deployment on GitHub Pages.

## 🚀 Features

### Core Features
- **Dark/Light Theme Toggle** - Persistent theme switching with localStorage
- **Progressive Web App (PWA)** - Installable with offline functionality
- **Fully Responsive Design** - Optimized for desktop, tablet, and mobile
- **Sticky Navigation** - Fixed header with mobile hamburger menu
- **Lazy Loading Images** - Performance-optimized image loading
- **Scroll Reveal Animations** - Smooth fade-in effects using IntersectionObserver
- **Vehicle Filtering & Search** - Real-time filtering and search functionality
- **SEO Optimized** - Complete meta tags, Open Graph, and JSON-LD schema

### Technical Features
- **Service Worker** - Advanced caching strategy for offline functionality
- **Manifest.json** - PWA configuration with app icons and shortcuts
- **Accessibility** - WCAG compliant with proper ARIA labels and semantic HTML
- **Performance** - Optimized loading with preload hints and efficient caching
- **Cross-browser Compatible** - Works on all modern browsers

## 📁 Project Structure

```
/
│ index.html              # Homepage
│ about.html              # About page
│ contact.html            # Contact page with Netlify-style form
│ vehicles.html           # All vehicles listing with filtering
│ denago.html             # DENAGO brand page
│ evolution.html          # EVOLUTION brand page
│ manifest.json           # PWA manifest
│ sw.js                   # Service worker
│ README.md               # This file
├─ assets/
│   ├─ css/
│   │   └─ style.css      # Main stylesheet with CSS variables
│   ├─ js/
│   │   └─ main.js        # Main JavaScript functionality
│   └─ images/            # All vehicle and brand images
│       ├─ DelawareGolfCarts.png
│       ├─ DENAGO*.jpg    # DENAGO vehicle images
│       └─ EVOLUTION*.jpg # EVOLUTION vehicle images
└─ vehicles/              # Individual vehicle detail pages
    ├─ denago-ev-rover-xl.html
    ├─ evolution-d5-maverick-4.html
    └─ [other vehicle pages...]
```

## 🎨 Design System

### Color Scheme
- **Light Theme**: Clean whites and grays with blue accents
- **Dark Theme**: Deep blacks and grays with blue accents
- **Accent Color**: `#007bff` (Bootstrap blue)
- **CSS Variables**: Complete theming system with `[data-theme]` selector

### Typography
- **Primary Font**: System font stack for optimal performance
- **Responsive Sizing**: Fluid typography that scales with viewport
- **Accessibility**: High contrast ratios and readable font sizes

### Layout
- **CSS Grid & Flexbox**: Modern layout techniques
- **Mobile-First**: Responsive design starting from 320px
- **Breakpoints**: 768px (tablet), 1024px (desktop), 1200px (large)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern CSS with variables, grid, flexbox, and animations
- **Vanilla JavaScript** - No frameworks, pure ES6+ JavaScript
- **Service Worker API** - For PWA functionality and offline support
- **Intersection Observer API** - For scroll-reveal animations
- **Local Storage API** - For theme persistence
- **Web App Manifest** - For PWA installation

## 🚀 Getting Started

### Local Development

1. **Clone or download** the project files
2. **Start a local server**:
   ```bash
   # Using Python
   python3 -m http.server 8080
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8080
   ```
3. **Open browser** to `http://localhost:8080`

### GitHub Pages Deployment

1. **Upload files** to your GitHub repository
2. **Enable GitHub Pages** in repository settings
3. **Select source** as main branch / root
4. **Access your site** at `https://username.github.io/repository-name`

### Netlify Deployment

1. **Connect repository** to Netlify
2. **Build settings**: 
   - Build command: (leave empty)
   - Publish directory: `/`
3. **Deploy** automatically on push

## 📱 PWA Installation

The website can be installed as a Progressive Web App:

1. **Desktop**: Look for install prompt in address bar
2. **Mobile**: Use "Add to Home Screen" option in browser menu
3. **Features**: Offline access, app-like experience, push notifications ready

## 🔧 Configuration

### Contact Form Setup

The contact form is configured for Netlify Forms but can be adapted:

```html
<!-- For Netlify -->
<form name="contact" method="POST" data-netlify="true">

<!-- For Formspree -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

<!-- For custom backend -->
<form action="/api/contact" method="POST">
```

### Theme Customization

Edit CSS variables in `assets/css/style.css`:

```css
[data-theme="light"] {
  --bg: #ffffff;
  --text: #333333;
  --accent: #007bff;
  /* ... other variables */
}

[data-theme="dark"] {
  --bg: #1a1a1a;
  --text: #ffffff;
  --accent: #007bff;
  /* ... other variables */
}
```

### Adding New Vehicles

1. **Add vehicle image** to `assets/images/`
2. **Create detail page** in `vehicles/` directory
3. **Update vehicle listings** in relevant pages
4. **Update service worker** cache arrays if needed

## 🔍 SEO Features

- **Meta Tags**: Complete title, description, keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific sharing metadata
- **JSON-LD Schema**: Structured data for search engines
- **Sitemap Ready**: Structure supports XML sitemap generation
- **Semantic HTML**: Proper heading hierarchy and landmarks

## ♿ Accessibility Features

- **ARIA Labels**: Comprehensive labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Screen Reader Support**: Semantic HTML and proper markup
- **Skip Links**: Quick navigation for assistive technologies

## 📊 Performance Optimizations

- **Lazy Loading**: Images load only when needed
- **Service Worker**: Aggressive caching for fast repeat visits
- **Preload Hints**: Critical resources loaded early
- **Minified Assets**: Optimized file sizes
- **Efficient Images**: Proper sizing and formats
- **No External Dependencies**: Fast loading without third-party scripts

## 🔒 Security Features

- **Content Security Policy Ready**: Easy to implement CSP headers
- **No Inline Scripts**: All JavaScript in external files
- **Secure Forms**: CSRF protection ready for backend integration
- **HTTPS Ready**: Designed for secure deployment

## 🌐 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+

## 📝 License

This project is created for Delaware Golf Carts. All vehicle images and brand names are property of their respective owners (DENAGO and EVOLUTION).

## 🤝 Contributing

To contribute to this project:

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly across devices
5. **Submit** a pull request

## 📞 Support

For technical support or questions about this website:

- **Email**: info@delawaregolfcarts.com
- **Phone**: (123) 456-7890
- **Website**: https://delawaregolfcarts.com

## 🔄 Updates

### Version 1.0.0
- Initial release with full feature set
- PWA functionality
- Dark/light theme toggle
- Complete vehicle catalog
- Mobile-responsive design
- SEO optimization

---

**Built with ❤️ for Delaware Golf Carts**

