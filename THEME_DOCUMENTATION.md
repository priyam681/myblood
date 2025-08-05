# Sprinix kart Theme Documentation

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
12. [Third-Party Libraries](#third-party-libraries)
13. [Changelog](#changelog)
14. [Troubleshooting](#troubleshooting)

---

## 🎯 Theme Overview

Sprinix kart is a high-performance Shopify theme built on Dawn's foundation, specifically designed for footwear and fashion brands. It emphasizes performance, accessibility, and user experience with a modern, mobile-first approach.

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
- **Custom Sections (13)**
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
  - Custom CSS architecture for faster loading
  - Enhanced image optimization
  - Progressive enhancement approach

- **User Experience**
  - Smooth scroll animations
  - Touch gestures for mobile
  - Reduced motion support
  - Fast page transitions

---

## 📁 Theme Structure

```
myblood/
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
├── sections/              # Reusable theme sections (66 total, 18 custom)
├── snippets/              # Reusable code components (54 total, 14 custom)
├── templates/             # Page templates
└── THEME_DOCUMENTATION.md # Theme documentation
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

#### **🗂️ Featured Collection** (`cstm-featured-collection.liquid`)
Grid layout for showcasing product collections with custom styling.
- **Features:** Responsive grid, hover effects, quick view, custom card styling
- **Settings:** Collection selection, grid configuration, card styles, desktop slider option

#### **🖼️ Featured Collection Grid** (`featured-collection-grid.liquid`)
Custom grid layout for featured collections with overlay content.
- **Features:** Responsive 2-column grid, gradient overlays, brand/title display
- **Settings:** Collection selection, overlay text, brand display
- **Styling:** Custom CSS with responsive typography and gradient backgrounds

#### **📋 Collection Product Grid** (`main-collection-product-grid.liquid`)
Enhanced product listing page with custom filtering and load more functionality.
- **Features:** Custom load more button, enhanced filtering, custom product cards
- **Filtering:** Custom styled filters with `sp-fliter` classes, price range sliders
- **Performance:** AJAX load more, progressive loading, custom loader animations
- **Custom Elements:** `<load-more-button>` web component, custom facet styling

### **Content Sections**

#### **📝 Rich Text** (`cstm-rich-text.liquid`)
Flexible content section for text and media with enhanced styling options.
- **Features:** Rich text editor, image integration, custom styling, multiple content blocks
- **Settings:** Typography controls, spacing, alignment options, color scheme selection

#### **🎥 Video** (`cstm-video.liquid`)
Video content integration with multiple sources.
- **Features:** YouTube/Vimeo embedding, autoplay controls, responsive sizing
- **Settings:** Video URL, aspect ratio, playback options

#### **📧 Newsletter** (`cstm-newsletter.liquid`)
Email signup integration with Shopify's customer system.
- **Features:** Email validation, success messaging, custom styling
- **Settings:** Heading/description, button text, styling options

### **Layout & Navigation Sections**

#### **🔝 Header** (`cstm-header.liquid`)
Custom header with navigation and branding.
- **Features:** Logo display, navigation menu, search integration, cart icon
- **Settings:** Logo upload, menu selection, sticky header options
- **Responsive:** Mobile hamburger menu, touch-friendly interactions

#### **🔔 Announcement Bar** (`cstm-announcement-bar.liquid`)
Promotional banner at top of page.
- **Features:** Scrolling text, promotional messaging, dismissible option
- **Settings:** Text content, colors, link URL, display conditions

#### **🦶 Footer** (`cstm-footer.liquid`)
Custom footer with links and branding.
- **Features:** Multi-column layout, social links, newsletter signup
- **Settings:** Menu selection, social media links, payment icons

#### **🎠 Slideshow** (`cstm-slideshow.liquid`)
Image carousel with navigation controls.
- **Features:** Auto-play, navigation arrows, pagination dots
- **Settings:** Image upload, transition effects, timing controls

### **Application Integration Sections**

#### **📱 Apps** (`cstm-apps.liquid`)
Third-party app integration section.
- **Features:** App embed support, flexible positioning
- **Settings:** App selection, layout options

#### **🛒 Cart Drawer** (`cstm-cart-drawer.liquid`)
Slide-out shopping cart interface.
- **Features:** Item management, quantity updates, checkout buttons
- **Settings:** Cart behavior, upsell options, shipping calculator

### **Layout & Content Sections**

#### **🖼️ Collage** (`cstm-collage.liquid`)
Multi-image layout section.
- **Features:** Image grid, overlay text, responsive layout
- **Settings:** Image uploads, text content, grid configuration

#### **📑 Blog** (`cstm-main-blog.liquid`)
Custom blog listing page.
- **Features:** Article cards, pagination, filtering
- **Settings:** Layout options, article display, sidebar content

#### **❌ 404 Page** (`cstm-main-404.liquid`)
Custom error page layout.
- **Features:** Custom messaging, navigation links, search integration
- **Settings:** Error message, recommended actions, styling options

#### **📞 Contact Form** (`cstm-contact-form.liquid`)
Contact form with validation.
- **Features:** Form validation, success messaging, anti-spam
- **Settings:** Form fields, recipient email, styling options

#### **🗂️ Collection List** (`cstm-collection-list.liquid`)
Display multiple collections.
- **Features:** Collection cards, filtering, responsive grid
- **Settings:** Collection selection, layout options, sorting

#### **📝 Featured Blog** (`cstm-featured-blog.liquid`)
Highlighted blog posts section.
- **Features:** Featured article display, excerpt preview
- **Settings:** Blog selection, post count, layout options

#### **🎯 Multicolumn** (`cstm-multicolumn.liquid`)
Flexible column-based content layout.
- **Features:** Multiple content blocks, responsive columns
- **Settings:** Column count, content blocks, spacing options

#### **🎨 Multirow** (`cstm-multirow.liquid`)
Multiple row content layout.
- **Features:** Flexible row-based design, content blocks
- **Settings:** Row configuration, content management

---

## 🧩 Snippets Reference

### **Product Components**

#### **🎴 Product Card** (`cstm-card-product.liquid`)
Heavily customized product display card with advanced interactive features.
```liquid
{% render 'cstm-card-product',
  card_product: product,
  show_vendor: true,
  show_rating: true,
  show_compare_price: true,
  section_id: section.id
%}
```
- **Features:** Product image slider, custom quick view with GIF animation, variant swatches, hover effects
- **Interactive:** Auto-play image carousel, variant picker, quick add modal
- **Custom Elements:** `<product-slider>`, `<product-swatch>` web components
- **Performance:** Conditional slider loading, lazy loading, optimized images

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
Interactive product image and video gallery with load more functionality.
- **Features:** Image zoom, thumbnail navigation, video support, load more button
- **Settings:** Gallery layout, zoom behavior, thumbnail size, media limit
- **Performance:** Progressive loading, lazy loading, conditional load more

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

#### **🎛️ Facets Filter** (`facets.liquid`)
Enhanced filtering system with custom styling and price range sliders.
- **Features:** Custom styled filters, price range sliders, mobile-responsive design
- **Custom Classes:** `sp-fliter` styling system, custom facet containers
- **Interactive:** Price range sliders with custom styling, enhanced UX
- **Performance:** AJAX filtering, debounced input handling

#### **💰 Price Facet** (`price-facet.liquid`)
Custom price range slider with advanced styling.
- **Features:** Dual-range slider, custom thumb styling, interactive feedback
- **Styling:** Custom CSS with hover effects, responsive design
- **Functionality:** Min/max price selection, visual feedback on interaction

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

### **Custom Optimizations**
- **Enhanced Image Loading:** Custom lazy loading implementation for product sliders
- **Component-Based CSS:** Modular CSS architecture with custom component styling
- **Interactive Elements:** Optimized JavaScript for custom product interactions
- **Custom Web Components:** Efficient custom elements for product sliders and variants
- **AJAX Load More:** Progressive loading for collection pages with custom loader

### **Theme-Specific Features**
- **Product Slider Optimization:** Efficient image carousel with conditional loading
- **Custom Animation Performance:** Smooth transitions for interactive elements
- **Enhanced Quick View:** Optimized modal interactions with minimal DOM manipulation
- **Custom Filter System:** Enhanced filtering with custom styling and price range sliders
- **Progressive Collection Loading:** Load more functionality with smooth UX

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
- Node.js 16+ (18+ recommended) and npm
- [Shopify CLI](https://shopify.dev/themes/tools/cli) installed
- Git for version control
- Code editor (VS Code recommended)
- Shopify Partner account or store access

#### **Installation Steps**

1. **Clone the repository:**
```bash
git clone https://github.com/priyam681/myblood.git
cd myblood
```

2. **Install Shopify CLI:**
```bash
npm install -g @shopify/cli @shopify/theme
```

3. **Login to Shopify and connect to store:**
```bash
shopify login
shopify theme dev --store=your-store-name
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
3. **Click "Customize" on Sprinix kart theme**
4. **Configure sections and settings**
5. **Publish when ready**

---

## 👨‍💻 Developer Guidelines

### **Custom Development Standards**

#### **Theme-Specific Best Practices**
- Follow existing naming conventions with `cstm-` prefix for custom components
- Maintain consistency with Dawn's base architecture while adding custom features
- Use custom web components for complex interactive elements
- Implement proper fallbacks for JavaScript-enhanced features

#### **Custom Component Development**
- Product sliders should use the existing `product-slider` web component pattern
- Custom sections should include proper schema definitions
- Maintain accessibility standards in all custom components
- Use conditional loading for performance-critical features

### **Testing Guidelines**

#### **Theme Check**
Run before every commit:
```bash
shopify theme check
```

#### **Custom Feature Testing**
- Test custom product sliders across different devices
- Verify custom quick view modals work with all product types
- Test custom variant selectors with different product configurations
- Validate custom sections in the theme editor

---

## ♿ Accessibility Features

### **ARIA Implementation**
- Comprehensive ARIA attributes throughout the theme
- Proper `role` attributes for semantic meaning
- `aria-label` and `aria-describedby` for context
- `aria-live` regions for dynamic content updates
- `aria-expanded` for collapsible content

### **Keyboard Navigation**
- **Skip-to-content link** at page top
- **Focus management** in modals and drawers
- **Tab order optimization** for logical flow
- **Enter/Space key support** for interactive elements

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
- **Touch-friendly buttons** (minimum 44px target size)
- **Smooth scrolling** with momentum
- **Tap highlighting** for interactive elements

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

## 📚 Third-Party Libraries

### **Included Libraries**
- **Shopify Polaris Icons** - UI icons and graphics
- **Swiper.js** - Product carousels and image galleries
- **Debounce utilities** - Performance optimization for search

### **License Information**
- **Base Theme:** Dawn by Shopify (MIT License)
- **Third-party assets:** All libraries used under their respective licenses
- **Custom code:** Copyright 2025 Sprinix

### **Attribution**
This theme is built upon Shopify's Dawn theme foundation and includes modifications and enhancements for footwear and fashion e-commerce.

---

## 📝 Changelog

### **Version 1.0.0 (Current)**
- **Initial Release** - Complete Sprinix kart theme with custom sections
- **18 Custom Sections** - Enhanced product display and content management
- **14 Custom Snippets** - Reusable components and utilities
- **Performance Optimizations** - Lazy loading and efficient asset management
- **Accessibility Features** - WCAG 2.1 AA compliance
- **Mobile Responsiveness** - Touch-friendly interface design

### **Upcoming Features**
- Additional payment method integrations
- Enhanced search functionality
- Advanced product filtering options
- Multi-language support expansion

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

**Last Updated:** November 2024  
**Theme Version:** 1.0.0  
**Compatible with:** Shopify Online Store 2.0+
