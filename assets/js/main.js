// Delaware Golf Carts - Main JavaScript File
// Features: PWA, Theme Toggle, Mobile Menu, Lazy Loading, Scroll Animations

class DelawareGolfCarts {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initTheme();
    this.initLazyLoading();
    this.initScrollAnimations();
    this.initMobileMenu();
    this.initSearch();
    this.registerServiceWorker();
  }

  // Event Listeners Setup
  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Delaware Golf Carts website loaded');
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Close mobile menu when clicking on links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-menu a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const mobileMenu = document.querySelector('.mobile-menu');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');

      if (mobileMenu && mobileMenu.classList.contains('active') && 
          !mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Theme Management
  initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
    this.createThemeToggle();
  }

  createThemeToggle() {
    // Add theme toggle button to header if it doesn't exist
    const header = document.querySelector('.nav-container');
    if (header && !document.getElementById('theme-toggle')) {
      const themeToggle = document.createElement('button');
      themeToggle.id = 'theme-toggle';
      themeToggle.className = 'theme-toggle';
      themeToggle.innerHTML = this.getThemeIcon();
      themeToggle.setAttribute('aria-label', 'Toggle dark mode');
      themeToggle.addEventListener('click', () => this.toggleTheme());
      header.appendChild(themeToggle);
    }
  }

  getThemeIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    return currentTheme === 'dark' ? '☀️' : '🌙';
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update theme toggle icon
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = this.getThemeIcon();
    }

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#ffffff');
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  // Mobile Menu Management
  initMobileMenu() {
    // Create mobile menu if it doesn't exist
    if (!document.querySelector('.mobile-menu')) {
      this.createMobileMenu();
    }
  }

  createMobileMenu() {
    const header = document.querySelector('.header');
    if (!header) return;

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';

    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      const mobileNavMenu = navMenu.cloneNode(true);
      mobileMenu.appendChild(mobileNavMenu);
    }

    // Add theme toggle to mobile menu
    const themeToggleClone = document.createElement('button');
    themeToggleClone.className = 'theme-toggle';
    themeToggleClone.innerHTML = this.getThemeIcon();
    themeToggleClone.setAttribute('aria-label', 'Toggle dark mode');
    themeToggleClone.addEventListener('click', () => this.toggleTheme());
    mobileMenu.appendChild(themeToggleClone);

    document.body.appendChild(mobileMenu);
  }

  toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');

    if (mobileMenu && mobileToggle) {
      mobileMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');

      // Prevent body scroll when menu is open
      if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');

    if (mobileMenu && mobileToggle) {
      mobileMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Lazy Loading for Images
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            observer.unobserve(img);
          }
        });
      });

      // Observe all images with loading="lazy"
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        this.loadImage(img);
      });
    }
  }

  loadImage(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }

    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });

    img.addEventListener('error', () => {
      img.alt = 'Image failed to load';
      img.classList.add('error');
    });
  }

  // Scroll Animations
  initScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe all elements with fade-in class
      document.querySelectorAll('.fade-in').forEach(el => {
        animationObserver.observe(el);
      });
    } else {
      // Fallback: show all animations immediately
      document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
      });
    }
  }

  // Search Functionality
  initSearch() {
    const searchInput = document.getElementById('vehicle-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterVehicles(e.target.value);
      });
    }
  }

  filterVehicles(searchTerm) {
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    const term = searchTerm.toLowerCase().trim();

    vehicleCards.forEach(card => {
      const title = card.querySelector('.vehicle-title')?.textContent.toLowerCase() || '';
      const description = card.querySelector('.vehicle-description')?.textContent.toLowerCase() || '';

      if (title.includes(term) || description.includes(term) || term === '') {
        card.style.display = '';
        card.classList.add('fade-in');
      } else {
        card.style.display = 'none';
        card.classList.remove('fade-in');
      }
    });
  }

  // Service Worker Registration
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./sw.js');
        console.log('Service Worker registered successfully:', registration);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  showUpdateNotification() {
    // Create update notification
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
      <div class="update-content">
        <p>A new version is available!</p>
        <button onclick="window.location.reload()" class="btn btn-sm">Update</button>
        <button onclick="this.parentElement.parentElement.remove()" class="btn btn-secondary btn-sm">Later</button>
      </div>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 4px 12px var(--shadow);
      z-index: 1003;
      max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);
  }

  // Utility Functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Form Validation
  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        this.showFieldError(input, 'This field is required');
        isValid = false;
      } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
        this.showFieldError(input, 'Please enter a valid email address');
        isValid = false;
      } else {
        this.clearFieldError(input);
      }
    });

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showFieldError(input, message) {
    this.clearFieldError(input);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: var(--danger);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    `;

    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = 'var(--danger)';
  }

  clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    input.style.borderColor = '';
  }

  // Analytics (placeholder for future implementation)
  trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Implement analytics tracking here (Google Analytics, etc.)
  }

  // Performance monitoring
  measurePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
      });
    }
  }
}

// Initialize the application
const app = new DelawareGolfCarts();

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DelawareGolfCarts;
}

// Add global error handling
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// Performance measurement
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('Performance metrics:', {
          'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
          'TCP Connection': perfData.connectEnd - perfData.connectStart,
          'Request': perfData.responseStart - perfData.requestStart,
          'Response': perfData.responseEnd - perfData.responseStart,
          'DOM Processing': perfData.domContentLoadedEventEnd - perfData.responseEnd,
          'Total Load Time': perfData.loadEventEnd - perfData.navigationStart
        });
      }
    }, 0);
  });
}