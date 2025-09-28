// Canonical URL redirect handling
// Ensures consistent URL structure across www and non-www versions

(function() {
  'use strict';
  
  // Define the canonical domain (without www)
  const CANONICAL_DOMAIN = 'kebaara.com';
  const CANONICAL_PROTOCOL = 'https://';
  
  // Get current location info
  const currentHost = window.location.hostname;
  const currentProtocol = window.location.protocol + '//';
  const currentPath = window.location.pathname + window.location.search + window.location.hash;
  
  // Check if we need to redirect
  const needsRedirect = 
    currentHost !== CANONICAL_DOMAIN || 
    currentProtocol !== CANONICAL_PROTOCOL;
  
  // Perform redirect if necessary
  if (needsRedirect && window.location.hostname.includes('kebaara.com')) {
    const canonicalURL = CANONICAL_PROTOCOL + CANONICAL_DOMAIN + currentPath;
    
    // Only redirect if it's our domain to avoid security issues
    if (canonicalURL !== window.location.href) {
      window.location.replace(canonicalURL);
    }
  }
})();