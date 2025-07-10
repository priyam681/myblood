# MyBlood Theme Documentation

**Version:** 1.0.0  
**Author:** Sprinix  
**Base:** Shopify Dawn Theme  
**Target:** Footwear & Fashion E-commerce  

---

## 📋 Table of Contents

1. [Theme Overview](#theme-overview)
2. [Features & Functionality](#features--functionality)
3. [Theme Structure](#theme-structure)
4. [Sections Reference](#sections-reference)
5. [Snippets Reference](#snippets-reference)
6. [Performance Optimizations](#performance-optimizations)
7. [Customization Guide](#customization-guide)
8. [Setup Instructions](#setup-instructions)
9. [Developer Guidelines](#developer-guidelines)
10. [Accessibility Features](#accessibility-features)
11. [Mobile Responsiveness](#mobile-responsiveness)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Theme Overview

MyBlood is a high-performance Shopify theme built on Dawn's foundation, specifically designed for footwear and fashion brands. It emphasizes performance, accessibility, and user experience with a modern, mobile-first approach.

### **Key Principles**
- **HTML-first approach** - Server-rendered content with progressive enhancement
- **Performance-focused** - Optimized for Core Web Vitals and fast loading
- **Accessibility compliant** - WCAG 2.1 AA standards with comprehensive ARIA support
- **Mobile-first design** - Touch-friendly interactions and responsive layouts

---

## ✨ Features & Functionality

### **🛍️ E-commerce Features**
- **Advanced Product Display**
  - Interactive product galleries with zoom
  - Variant picker with color/size swatches
  - Quick add to cart functionality
  - Product recommendations engine
  - Inventory availability indicators

- **Shopping Experience**
  - Slide-out cart drawer with live updates
  - Predictive search with autocomplete
  - Bulk ordering capabilities
  - Gift card support
  - Pickup availability integration

- **Navigation & Discovery**
  - Mega menu with promotional content
  - Category image showcases
  - Advanced filtering and sorting
  - Breadcrumb navigation
  - Related product suggestions

### **🎨 Design Features**
- **Custom Sections (70+)**
  - Interactive home page banners
  - Product showcase carousels
  - Lifestyle category selectors
  - Performance messaging banners
  - Featured collection grids

- **Visual Elements**
  - Hover effects and animations
  - Color-coordinated product displays
  - Video integration support
  - Icon-based UI elements
  - Custom typography controls

### **⚡ Performance Features**
- **Loading Optimizations**
  - Lazy loading for images and content
  - Critical CSS inlining
  - Deferred JavaScript loading
  - WebP image format support
  - Font optimization with preloading

- **User Experience**
  - Smooth scroll animations
  - Touch gestures for mobile
  - Progressive enhancement
  - Reduced motion support
  - Fast page transitions

---

## 📁 Theme Structure

```
performance-theme/
├── assets/                 # CSS, JS, images, fonts
│   ├── base.css           # Core styles and typography
│   ├── component-*.css    # Individual component styles
│   ├── section-*.css      # Section-specific styles
│   └── *.js              # JavaScript functionality
├── config/                # Theme configuration
│   ├── settings_schema.json  # Theme customization options
│   └── settings_data.json    # Default theme settings
├── layout/                # Base layout templates
│   ├── theme.liquid       # Main theme layout
│   └── password.liquid    # Password page layout
├── locales/               # Translation files
├── sections/              # Reusable theme sections (70+)
├── snippets/              # Reusable code components (80+)
├── templates/             # Page templates
└── README.md             # Theme information
```

### **File Naming Convention**
- **Custom components:** `cstm-` prefix (e.g., `cstm-header.liquid`)
- **Sections:** Descriptive names (e.g., `home-page-banner.liquid`)
- **Assets:** Component-based naming (e.g., `component-card.css`)

---

## 🎛️ Sections Reference

### **Homepage Sections**

#### **🏠 Home Page Banner** (`home-page-banner.liquid`)
Advanced slideshow section with multiple slides and call-to-action buttons.
- **Features:** Auto-rotation, hover pause, multiple CTAs, hot searches
- **Settings:** Image upload, heading/text controls, button customization
- **Performance:** Lazy loading, WebP format, preloading for first image

#### **🎨 Colorful Kick** (`colorful-kick.liquid`)
Animated product showcase with rotating displays and dynamic text effects.
- **Features:** Auto-rotating product cards, colorful text animations
- **Settings:** Product selection, animation speed, color schemes
- **Interactive:** Hover effects, smooth transitions

#### **⚡ Performance Banner** (`performance-banner.liquid`)
Dedicated section for comfort and performance messaging.
- **Features:** Split layout with image and text content
- **Settings:** Background image, heading/description, CTA button
- **Responsive:** Mobile-optimized layout

### **Product Sections**

#### **🛍️ Featured Product** (`featured-product.liquid`)
Comprehensive product display with full feature set.
- **Features:** Image gallery, variant picker, buy buttons, recommendations
- **Settings:** Product selection, layout options, feature toggles
- **Integration:** Cart drawer, inventory tracking, reviews

#### **📱 Product Tab** (`product-tab.liquid`)
Tabbed product display with Swiper integration.
- **Features:** Category tabs (mens/womens/kids), product carousels
- **Settings:** Collection selection, tab configuration
- **Performance:** Conditional Swiper loading

#### **🔍 Product Detail** (`product-detail.liquid`)
Enhanced product information display.
- **Features:** Expandable details, specifications, care instructions
- **Settings:** Content management, accordion behavior

### **Collection Sections**

#### **🗂️ Featured Collection Grid** (`featured-collection-grid.liquid`)
Grid layout for showcasing product collections.
- **Features:** Responsive grid, hover effects, quick view
- **Settings:** Collection selection, grid configuration, card styles

#### **📋 Main Collection Product Grid** (`main-collection-product-grid.liquid`)
Primary collection page layout with filtering.
- **Features:** Product filtering, sorting, pagination, layout switching
- **Settings:** Products per page, filter options, grid configurations

### **Content Sections**

#### **📝 Rich Text** (`cstm-rich-text.liquid`)
Flexible content section for text and media.
- **Features:** Rich text editor, image integration, custom styling
- **Settings:** Typography controls, spacing, alignment options

#### **🎥 Video** (`cstm-video.liquid`)
Video content integration with multiple sources.
- **Features:** YouTube/Vimeo embedding, autoplay controls, responsive sizing
- **Settings:** Video URL, aspect ratio, playback options

#### **📧 Newsletter** (`cstm-newsletter.liquid`)
Email signup integration with Shopify's customer system.
- **Features:** Email validation, success messaging, custom styling
- **Settings:** Heading/description, button text, styling options

---

## 🧩 Snippets Reference

### **Product Components**

#### **🎴 Product Card** (`cstm-card-product.liquid`)
Comprehensive product display card with full feature set.
```liquid
{% render 'cstm-card-product',
  card_product: product,
  show_vendor: true,
  show_rating: true,
  show_compare_price: true,
  section_id: section.id
%}
```
- **Features:** Hover effects, quick add, ratings, sale badges
- **Options:** Vendor display, rating toggle, price comparison
- **Performance:** Lazy loading, optimized images

#### **🛒 Buy Buttons** (`cstm-buy-buttons.liquid`)
Product purchase interface with dynamic checkout.
```liquid
{% render 'cstm-buy-buttons',
  block: block,
  product: product,
  product_form_id: product_form_id,
  section_id: section.id,
  show_pickup_availability: true
%}
```
- **Features:** Dynamic checkout, gift card support, inventory tracking
- **Integration:** Cart drawer, pickup availability, quantity controls

#### **🖼️ Product Media Gallery** (`cstm-product-media-gallery.liquid`)
Interactive product image and video gallery.
- **Features:** Image zoom, thumbnail navigation, video support
- **Settings:** Gallery layout, zoom behavior, thumbnail size
- **Performance:** Progressive loading, WebP support

### **Navigation Components**

#### **🔍 Header Search** (`cstm-header-search.liquid`)
Predictive search modal with autocomplete.
```liquid
{% render 'cstm-header-search',
  input_id: 'search-modal'
%}
```
- **Features:** Real-time search, product suggestions, keyboard navigation
- **Performance:** Debounced input, lazy loading results

#### **📱 Header Drawer** (`cstm-header-drawer.liquid`)
Mobile and desktop navigation drawer.
- **Features:** Multi-level navigation, search integration, account links
- **Responsive:** Touch gestures, swipe navigation, adaptive layout

#### **🗂️ Mega Menu** (`header-mega-menu.liquid`)
Advanced dropdown navigation with promotional content.
- **Features:** Multi-column layout, featured products, promotional banners
- **Settings:** Menu structure, promotional content, styling options

### **Shopping Components**

#### **🛒 Cart Drawer** (`cstm-cart-drawer.liquid`)
Slide-out shopping cart with recommendations.
- **Features:** Line item management, recommendations, shipping calculator
- **Integration:** Real-time updates, inventory validation, checkout flow

#### **🔔 Cart Notification** (`cstm-cart-notification.liquid`)
Toast notifications for cart actions.
- **Features:** Add to cart confirmation, error handling, custom messaging
- **Animation:** Smooth transitions, auto-dismiss, accessibility announcements

### **Content Components**

#### **📑 Article Card** (`cstm-article-card.liquid`)
Blog post display card with metadata.
```liquid
{% render 'cstm-article-card',
  article: article,
  show_image: true,
  show_date: true,
  show_author: true,
  media_aspect_ratio: 1.66
%}
```

#### **📦 Collection Card** (`cstm-card-collection.liquid`)
Collection showcase with image and product count.
- **Features:** Collection image, product count, hover effects
- **Settings:** Image aspect ratio, overlay styling, text positioning

---

## ⚡ Performance Optimizations

### **Image Optimization**
- **Lazy Loading:** All images below the fold use `loading="lazy"`
- **WebP Format:** Automatic WebP conversion through Shopify's CDN
- **Responsive Images:** Proper `srcset` and `sizes` attributes
- **Dimension Specification:** Width and height attributes prevent layout shift

### **CSS Architecture**
- **Component-Based:** Separate CSS files for each component (90+ files)
- **Critical CSS:** Inline styles for above-the-fold content
- **Custom Properties:** CSS variables for consistent theming
- **Media Queries:** Mobile-first responsive design

### **JavaScript Performance**
- **Deferred Loading:** All scripts use `defer` attribute
- **Conditional Loading:** Feature-specific scripts load only when needed
- **Modern ES6+:** Efficient code with proper progressive enhancement
- **Intersection Observer:** For scroll animations and lazy loading

### **Font Optimization**
- **Font Display:** `font-display: swap` for all custom fonts
- **Preloading:** Critical fonts preloaded for faster rendering
- **WOFF2 Format:** Modern format for better compression
- **Fallback Stacks:** Proper system font fallbacks

### **Resource Loading**
- **Preconnect:** DNS prefetching for external resources
- **Resource Hints:** Strategic use of `preload` and `prefetch`
- **Minification:** Compressed CSS and JavaScript files
- **Tree Shaking:** Unused code elimination

---

## 🎨 Customization Guide

### **Theme Settings**

#### **Colors & Branding**
Access through Shopify admin: **Online Store > Themes > Customize**

- **Color Schemes:** Create unlimited color combinations
- **Logo Settings:** Upload and resize brand logos
- **Typography:** Choose from 50+ font combinations
- **Favicon:** Custom site icon for browser tabs

#### **Layout Options**
- **Container Width:** Adjust maximum content width
- **Spacing Scale:** Control section padding and margins
- **Border Radius:** Customize button and card corner rounding
- **Shadow Depth:** Adjust drop shadow intensity

#### **Product Display**
- **Image Aspect Ratios:** Square, portrait, landscape options
- **Product Card Style:** Minimal, standard, or detailed layouts
- **Badge Display:** Sale, new, sold out indicators
- **Variant Picker:** Buttons, dropdowns, or swatches

### **Section Configuration**

Each section provides extensive customization options:

#### **Content Settings**
- Heading and description text
- Button labels and links
- Image uploads and positioning
- Color scheme overrides

#### **Layout Settings**
- Grid configurations (2, 3, 4 columns)
- Spacing controls (tight, normal, loose)
- Alignment options (left, center, right)
- Mobile layout adjustments

#### **Display Settings**
- Show/hide elements (vendor, rating, price)
- Animation preferences
- Loading behavior
- Responsive breakpoints

### **Custom CSS**

Add custom styles through: **Theme Settings > Custom CSS**

```css
/* Example: Custom brand colors */
:root {
  --color-brand-primary: #FF4500;
  --color-brand-secondary: #1A1A1A;
}

/* Example: Custom button styling */
.btn-custom {
  background: linear-gradient(45deg, var(--color-brand-primary), var(--color-brand-secondary));
  border-radius: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
```

### **Custom JavaScript**

For advanced functionality, add scripts to `assets/custom.js`:

```javascript
// Example: Custom product interaction
document.addEventListener('DOMContentLoaded', function() {
  // Custom functionality here
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Custom hover behavior
    });
  });
});
```

---

## 🚀 Setup Instructions

### **Development Environment**

#### **Prerequisites**
- Node.js 18+ and npm
- [Shopify CLI](https://shopify.dev/themes/tools/cli) installed
- Git for version control
- Code editor (VS Code recommended)

#### **Installation Steps**

1. **Clone the repository:**
```bash
git clone [repository-url]
cd performance-theme
```

2. **Install Shopify CLI:**
```bash
npm install -g @shopify/cli @shopify/theme
```

3. **Connect to Shopify store:**
```bash
shopify theme dev
```

4. **Start development server:**
```bash
shopify theme dev --live-reload
```

### **Deployment**

#### **To Development Store**
```bash
shopify theme push --development
```

#### **To Live Store**
```bash
shopify theme push --live
```

#### **Create Theme Package**
```bash
shopify theme package
```

### **Theme Configuration**

1. **Upload theme to Shopify**
2. **Go to Online Store > Themes**
3. **Click "Customize" on MyBlood theme**
4. **Configure sections and settings**
5. **Publish when ready**

---

## 👨‍💻 Developer Guidelines

### **Code Standards**

#### **Liquid Templates**
- Use semantic HTML5 elements
- Include proper ARIA attributes
- Follow BEM methodology for CSS classes
- Comment complex logic blocks

```liquid
{% comment %} Product card with accessibility features {% endcomment %}
<article class="product-card" role="listitem">
  <h3 class="product-card__title">
    <a href="{{ product.url }}" 
       aria-label="View {{ product.title }}">
      {{ product.title }}
    </a>
  </h3>
</article>
```

#### **CSS Architecture**
- Use custom properties for theming
- Follow mobile-first approach
- Implement BEM naming convention
- Optimize for performance

```css
/* Component: Product Card */
.product-card {
  --card-spacing: 1rem;
  --card-border-radius: 0.5rem;
  
  display: flex;
  flex-direction: column;
  padding: var(--card-spacing);
  border-radius: var(--card-border-radius);
}

.product-card__title {
  font-size: var(--font-size-h4);
  margin-bottom: var(--spacing-xs);
}

/* Mobile-first responsive design */
@media (min-width: 768px) {
  .product-card {
    --card-spacing: 1.5rem;
  }
}
```

#### **JavaScript Best Practices**
- Use modern ES6+ features
- Implement progressive enhancement
- Add proper error handling
- Include accessibility considerations

```javascript
class ProductCard {
  constructor(element) {
    this.element = element;
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupAccessibility();
  }
  
  bindEvents() {
    this.element.addEventListener('click', this.handleClick.bind(this));
    this.element.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  
  setupAccessibility() {
    // Ensure keyboard navigation
    if (!this.element.hasAttribute('tabindex')) {
      this.element.setAttribute('tabindex', '0');
    }
  }
}
```

### **Performance Guidelines**

#### **Image Optimization**
- Always include `width` and `height` attributes
- Use `loading="lazy"` for below-the-fold images
- Implement proper `srcset` and `sizes`
- Leverage Shopify's image transformation

```liquid
{% comment %} Optimized product image {% endcomment %}
<img
  src="{{ product.featured_image | image_url: width: 800, format: 'webp' }}"
  srcset="{{ product.featured_image | image_url: width: 400, format: 'webp' }} 400w,
          {{ product.featured_image | image_url: width: 800, format: 'webp' }} 800w,
          {{ product.featured_image | image_url: width: 1200, format: 'webp' }} 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="{{ product.featured_image.alt | default: product.title }}"
  width="800"
  height="600"
  loading="lazy"
  class="product-image"
>
```

#### **Script Loading**
- Use `defer` for non-critical scripts
- Load libraries conditionally
- Implement proper error boundaries

```liquid
{% comment %} Conditional script loading {% endcomment %}
{% if section.settings.enable_animation %}
  <script src="{{ 'animation.js' | asset_url }}" defer></script>
{% endif %}
```

### **Testing Guidelines**

#### **Theme Check**
Run before every commit:
```bash
shopify theme check
```

#### **Performance Testing**
- Test on mobile devices
- Use Chrome DevTools Lighthouse
- Monitor Core Web Vitals
- Test with slow connections

#### **Accessibility Testing**
- Use screen reader software
- Test keyboard navigation
- Validate HTML markup
- Check color contrast ratios

---

## ♿ Accessibility Features

### **ARIA Implementation**
- **250+ ARIA attributes** throughout the theme
- Proper `role` attributes for semantic meaning
- `aria-label` and `aria-describedby` for context
- `aria-live` regions for dynamic content

### **Keyboard Navigation**
- **Skip-to-content link** at page top
- **Focus management** in modals and drawers
- **Tab order optimization** for logical flow
- **Keyboard shortcuts** for common actions

### **Screen Reader Support**
- **Visually hidden content** for screen readers
- **Proper heading hierarchy** (h1-h6)
- **Descriptive link text** without "click here"
- **Form labels** and error messages

### **Visual Accessibility**
- **High contrast ratios** meeting WCAG standards
- **Reduced motion support** for users with vestibular disorders
- **Focus indicators** for keyboard navigation
- **Scalable typography** supporting zoom up to 200%

---

## 📱 Mobile Responsiveness

### **Responsive Design**
- **Mobile-first approach** with progressive enhancement
- **Flexible grid system** adapting to screen sizes
- **Fluid typography** scaling across devices
- **Touch-friendly interfaces** with appropriate tap targets

### **Touch Interactions**
- **Swipe gestures** for product carousels
- **Pull-to-refresh** functionality where applicable
- **Touch-friendly buttons** (minimum 44px target size)
- **Smooth scrolling** with momentum

### **Mobile Optimizations**
- **Drawer navigation** for mobile menus
- **Collapsible sections** to save screen space
- **Optimized images** for mobile bandwidth
- **Fast touch response** with minimal delay

### **Responsive Breakpoints**
```css
/* Mobile-first breakpoints */
/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) { }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { }

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { }

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { }
```

---

## 🔧 Troubleshooting

### **Common Issues**

#### **Images Not Loading**
**Problem:** Images appear broken or don't load
**Solutions:**
1. Check image file formats (JPG, PNG, WebP supported)
2. Verify image URLs in Liquid templates
3. Ensure proper image_url filter usage
4. Check browser console for 404 errors

#### **JavaScript Errors**
**Problem:** Interactive features not working
**Solutions:**
1. Check browser console for error messages
2. Verify script loading order with `defer` attribute
3. Test browser compatibility
4. Check for conflicting third-party scripts

#### **CSS Not Applying**
**Problem:** Styles not appearing correctly
**Solutions:**
1. Clear browser cache and hard refresh
2. Check CSS file paths and asset_url filters
3. Verify CSS syntax and selectors
4. Test with browser developer tools

#### **Performance Issues**
**Problem:** Slow page loading
**Solutions:**
1. Optimize large images (compress and resize)
2. Remove unused CSS and JavaScript
3. Enable browser caching
4. Use Chrome DevTools to identify bottlenecks

### **Development Tips**

#### **Live Reloading**
Use Shopify CLI for instant updates:
```bash
shopify theme dev --live-reload
```

#### **Theme Inspector**
Enable in Chrome DevTools:
1. Go to DevTools > Settings
2. Enable "Shopify Theme Inspector for Chrome"
3. Restart DevTools to see Liquid data

#### **Debugging Liquid**
Add debug information to templates:
```liquid
{% comment %} Debug: Check product data {% endcomment %}
<!-- Product ID: {{ product.id }} -->
<!-- Available: {{ product.available }} -->
<!-- Variant count: {{ product.variants.size }} -->
```

### **Support Resources**

#### **Documentation**
- [Shopify Theme Development](https://shopify.dev/themes)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Dawn Theme Documentation](https://github.com/Shopify/dawn)

#### **Community**
- [Shopify Partners Slack](https://partners.shopify.com/slack)
- [Shopify Community Forums](https://community.shopify.com/)
- [GitHub Issues](https://github.com/Shopify/dawn/issues)

#### **Tools**
- [Theme Check](https://github.com/Shopify/theme-check)
- [Shopify CLI](https://shopify.dev/themes/tools/cli)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)

---

## 📞 Support

For technical support or questions about this theme:

- **Documentation:** This file and inline code comments
- **Updates:** Check the theme repository for latest versions
- **Issues:** Report bugs through the appropriate channels
- **Customization:** Refer to the customization guide above

---

**Last Updated:** January 2025  
**Theme Version:** 1.0.0  
**Compatible with:** Shopify Online Store 2.0+
