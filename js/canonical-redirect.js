/* Redirect /index.html to / for canonical URL enforcement */
if (window.location.pathname.match(/\/index\.html$/)) {
  window.location.replace(window.location.pathname.replace(/index\.html$/, ''));
}
