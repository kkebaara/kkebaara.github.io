// Performance Monitoring Script for Core Web Vitals
(function() {
  'use strict';

  // Core Web Vitals monitoring
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Send to analytics if available
        if (window.gtag) {
          gtag('event', 'LCP', {
            'event_category': 'Web Vitals',
            'event_label': lastEntry.startTime,
            'value': Math.round(lastEntry.startTime)
          });
        }
      }).observe({entryTypes: ['largest-contentful-paint']});
    } catch (e) {
      console.warn('LCP monitoring failed:', e);
    }

    // First Input Delay (FID)
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          if (window.gtag) {
            gtag('event', 'FID', {
              'event_category': 'Web Vitals',
              'event_label': entry.name,
              'value': Math.round(entry.processingStart - entry.startTime)
            });
          }
        });
      }).observe({entryTypes: ['first-input']});
    } catch (e) {
      console.warn('FID monitoring failed:', e);
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      let clsEntries = [];
      
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        }
        
        console.log('CLS:', clsValue);
        
        if (window.gtag) {
          gtag('event', 'CLS', {
            'event_category': 'Web Vitals',
            'event_label': 'CLS',
            'value': Math.round(clsValue * 1000) / 1000
          });
        }
      }).observe({entryTypes: ['layout-shift']});
    } catch (e) {
      console.warn('CLS monitoring failed:', e);
    }
  }

  // Page load performance
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
        
        console.log('Page Load Time:', loadTime);
        console.log('DOM Content Loaded:', domContentLoaded);
        
        if (window.gtag) {
          gtag('event', 'page_load_performance', {
            'event_category': 'Performance',
            'load_time': Math.round(loadTime),
            'dom_content_loaded': Math.round(domContentLoaded)
          });
        }
      }
    }, 0);
  });

  // Resource loading performance
  if ('PerformanceObserver' in window) {
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (entry.initiatorType === 'img' || entry.initiatorType === 'css' || entry.initiatorType === 'script') {
            const loadTime = entry.responseEnd - entry.startTime;
            
            if (loadTime > 1000) { // Log slow resources (>1s)
              console.warn('Slow resource:', entry.name, 'Load time:', loadTime);
            }
          }
        });
      }).observe({entryTypes: ['resource']});
    } catch (e) {
      console.warn('Resource monitoring failed:', e);
    }
  }
})();
