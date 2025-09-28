# Google Search Console Setup Guide for kebaara.com

## Current Configuration Status ✅

### 1. Domain Property Setup
- **Primary Domain**: kebaara.com (without www)
- **CNAME Configuration**: ✅ Set to kebaara.com
- **Canonical URL**: ✅ Configured in _config.yml
- **Redirect Handling**: ✅ Added canonical-redirect.js

### 2. Sitemap Configuration ✅
- **Sitemap URL**: https://kebaara.com/sitemap.xml
- **Auto-generation**: ✅ Via jekyll-sitemap plugin
- **Robots.txt**: ✅ References sitemap
- **Collections**: ✅ Includes projects and essays

### 3. SEO Optimization ✅
- **Jekyll SEO Tag**: ✅ Configured
- **Meta Tags**: ✅ Automated generation
- **Structured Data**: ✅ LocalBusiness schema for testimonials
- **Canonical URLs**: ✅ Per-page canonical links

## Search Console Action Items

### To Complete Setup:

1. **Verify Domain Property in Search Console**
   - Use Domain property: `kebaara.com`
   - Add DNS TXT record as provided by Google
   - This covers all variations (www, non-www, http, https)

2. **Submit Sitemap**
   - In Search Console, go to Sitemaps
   - Submit: `sitemap.xml`
   - Google will automatically discover ~20 pages

3. **Monitor Coverage**
   - Check "Coverage" report weekly
   - Look for crawl errors or indexing issues
   - Ensure all important pages are indexed

4. **Set Up URL Inspection**
   - Test key pages: home, projects, bio, testimonials
   - Request indexing for newly published content

## Recommended Search Console Properties

### Primary (Recommended):
- **Domain Property**: `kebaara.com`
  - Covers all subdomains and protocols
  - Provides unified reporting

### Alternative (if needed):
- **URL Prefix Properties**: 
  - `https://kebaara.com/`
  - `https://www.kebaara.com/` (if supporting www)

## Key Files for Search Console:

- `sitemap.xml` - Auto-generated, includes all pages
- `robots.txt` - Crawler instructions with sitemap reference  
- `_includes/head.html` - Contains SEO meta tags and structured data
- `js/canonical-redirect.js` - Handles URL consistency
- `_config.yml` - Site configuration and SEO settings

## Expected Search Console Results:

- **Pages**: ~20-25 discoverable pages
- **Collections**: Projects and Essays properly indexed  
- **Structured Data**: LocalBusiness with review snippets
- **Mobile Usability**: Should pass (responsive design)
- **Core Web Vitals**: Monitor performance metrics

## Next Steps:

1. Complete domain verification in Search Console
2. Submit sitemap.xml  
3. Monitor indexing status over next 7 days
4. Review any crawl errors or coverage issues
5. Set up email alerts for critical issues