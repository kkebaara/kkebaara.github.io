// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  const icon = document.querySelector('.theme-toggle i');
  icon.className = newTheme === 'dark' ? 'sun icon' : 'moon icon';
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const icon = document.querySelector('.theme-toggle i');
  if (icon) {
    icon.className = savedTheme === 'dark' ? 'sun icon' : 'moon icon';
  }
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      
      // Simple content search
      const cards = document.querySelectorAll('.ui.card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query) || query === '') {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// Analytics tracking for interactions
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
}

// Track project card clicks
document.addEventListener('click', function(e) {
  if (e.target.closest('.ui.card')) {
    const card = e.target.closest('.ui.card');
    const projectTitle = card.querySelector('.header')?.textContent || 'Unknown Project';
    trackEvent('Projects', 'view', projectTitle);
  }
});

// Track contact form submissions
document.addEventListener('submit', function(e) {
  if (e.target.matches('.ui.form')) {
    trackEvent('Contact', 'form_submit', 'contact_form');
  }
});

// Performance monitoring
window.addEventListener('load', function() {
  if ('performance' in window) {
    setTimeout(function() {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
          name: 'load',
          value: loadTime
        });
      }
    }, 0);
  }
});
