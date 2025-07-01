# Deployment Guide - Delaware Golf Carts Website

This guide provides step-by-step instructions for deploying the Delaware Golf Carts website to various hosting platforms.

## 🚀 Quick Start

The website is a static site built with pure HTML, CSS, and JavaScript. No build process is required - simply upload the files to any web server.

## 📋 Pre-Deployment Checklist

- [ ] All files are present (see file tree below)
- [ ] Images are optimized and properly named
- [ ] Contact form is configured for your preferred service
- [ ] Domain-specific URLs are updated in manifest.json and meta tags
- [ ] Service worker cache URLs match your domain

## 🌐 GitHub Pages Deployment

### Method 1: Direct Upload
1. Create a new repository on GitHub
2. Upload all files to the repository root
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Save and wait for deployment

### Method 2: Git Push
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: Delaware Golf Carts website"

# Add remote and push
git remote add origin https://github.com/yourusername/delaware-golf-carts.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

**Access URL**: `https://yourusername.github.io/delaware-golf-carts`

## 🔷 Netlify Deployment

### Method 1: Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Drag the project folder to the deploy area
3. Site will be automatically deployed

### Method 2: Git Integration
1. Connect your GitHub repository
2. Build settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `/`
3. Deploy automatically on every push

### Netlify Forms Setup
The contact form is already configured for Netlify:
```html
<form name="contact" method="POST" data-netlify="true">
```

**Access URL**: `https://random-name-12345.netlify.app` (customizable)

## ⚡ Vercel Deployment

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow prompts for configuration
```

### Method 2: Git Integration
1. Connect repository at [vercel.com](https://vercel.com)
2. Import project
3. Deploy with default settings

**Access URL**: `https://delaware-golf-carts.vercel.app`

## 🔥 Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Configure:
# - Public directory: . (current directory)
# - Single-page app: No
# - Overwrite index.html: No

# Deploy
firebase deploy
```

**Access URL**: `https://project-id.web.app`

## 📁 Traditional Web Hosting

For shared hosting, VPS, or dedicated servers:

1. **Upload files** via FTP/SFTP to web root directory
2. **Set permissions** (755 for directories, 644 for files)
3. **Configure web server** (Apache/Nginx)

### Apache Configuration (.htaccess)
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name delawaregolfcarts.com;
    root /var/www/delaware-golf-carts;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

    # Handle routes
    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 🔧 Post-Deployment Configuration

### 1. Update Domain References
Update these files with your actual domain:

**manifest.json**:
```json
{
  "start_url": "https://yourdomain.com/",
  "scope": "https://yourdomain.com/"
}
```

**Meta tags in HTML files**:
```html
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:image" content="https://yourdomain.com/assets/images/DelawareGolfCarts.png">
```

### 2. Contact Form Configuration

#### For Netlify:
Already configured - forms will appear in Netlify dashboard

#### For Formspree:
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update contact.html:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

#### For Custom Backend:
Update form action to your API endpoint:
```html
<form action="https://yourdomain.com/api/contact" method="POST">
```

### 3. Analytics Setup (Optional)

Add Google Analytics to all HTML files before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 📊 Performance Optimization

### 1. Image Optimization
- Compress images using tools like TinyPNG
- Consider WebP format for better compression
- Implement responsive images with srcset

### 2. CDN Setup
Consider using a CDN for faster global delivery:
- Cloudflare (free tier available)
- AWS CloudFront
- Google Cloud CDN

### 3. Monitoring
Set up monitoring for:
- Uptime monitoring (UptimeRobot, Pingdom)
- Performance monitoring (Google PageSpeed Insights)
- Error tracking (Sentry, LogRocket)

## 🔒 Security Considerations

### SSL Certificate
Ensure HTTPS is enabled:
- GitHub Pages: Automatic
- Netlify: Automatic
- Vercel: Automatic
- Traditional hosting: Use Let's Encrypt or purchase SSL

### Content Security Policy
Add CSP header for enhanced security:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; font-src 'self';">
```

## 🧪 Testing Checklist

After deployment, test:
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works on all devices
- [ ] Contact form submits successfully
- [ ] PWA installation works
- [ ] Dark/light theme toggle functions
- [ ] Vehicle filtering works
- [ ] Mobile responsiveness
- [ ] Page load speed (aim for <3 seconds)

## 📞 Support

If you encounter issues during deployment:
1. Check browser console for errors
2. Verify all file paths are correct
3. Ensure proper file permissions
4. Test on multiple devices and browsers

For technical support:
- Email: info@delawaregolfcarts.com
- Phone: (123) 456-7890

---

**Happy Deploying! 🚀**

