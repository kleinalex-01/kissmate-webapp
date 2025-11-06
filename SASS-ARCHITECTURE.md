# SASS 7+1 Architecture - KissMate SPA

## 📁 **Folder Structure**

```
src/scss/
├── abstracts/           # SASS tools, helpers
│   ├── _variables.scss  # Variables (colors, fonts, breakpoints)
│   ├── _functions.scss  # SASS functions
│   └── _mixins.scss     # SASS mixins
├── base/               # Base styles
│   ├── _reset.scss     # CSS reset/normalize
│   ├── _typography.scss # Typography rules
│   └── _base.scss      # Basic HTML elements
├── components/         # Component styles
│   ├── _buttons.scss   # Button components
│   ├── _cards.scss     # Card components
│   ├── _modals.scss    # Modal components
│   ├── _carousel.scss  # Carousel components
│   └── _theme-toggle.scss # Theme toggle button
├── layout/            # Layout components
│   ├── _header.scss   # Header layout
│   ├── _footer.scss   # Footer layout
│   ├── _navigation.scss # Navigation layout
│   ├── _grid.scss     # Grid system
│   └── _forms.scss    # Form layouts
├── pages/             # Page-specific styles
│   ├── _home.scss     # Home page
│   ├── _services.scss # Services page
│   ├── _prices.scss   # Prices page
│   └── _contact.scss  # Contact page
├── themes/            # Theme styles
│   ├── _default.scss  # Light theme (default)
│   └── _dark.scss     # Dark theme
├── vendors/           # Third-party CSS
│   └── _normalize.scss # Vendor resets
└── main.scss          # Main SASS file
```

## 🎨 **Color Palettes**

### Light Theme (White/Ultramarine Blue)
```scss
// Primary Ultramarine Blue Scale
--primary-500: #3b82f6  (Main brand color)
--primary-600: #2563eb  (Hover states)
--primary-700: #1d4ed8  (Active states)

// Neutral Scale
--neutral-0: #ffffff    (Pure white background)
--neutral-100: #f1f5f9  (Light gray backgrounds)
--neutral-900: #0f172a  (Dark text)
```

### Dark Theme
```scss
// Background Colors
--bg-primary: #020617   (Near black background)
--bg-surface: #1e293b   (Card backgrounds)
--text-primary: #f1f5f9 (Light text)
```

## 📱 **Breakpoints (Chrome DevTools)**

```scss
$breakpoints: (
  'mobile': 320px,      // Small phones
  'mobile-m': 375px,    // Medium phones
  'mobile-l': 425px,    // Large phones
  'tablet': 768px,      // iPads, tablets
  'laptop': 1024px,     // Small laptops
  'laptop-l': 1440px,   // Large laptops
  'desktop': 1920px,    // Desktop screens
  'desktop-xl': 2560px  // Large desktops
);
```

## 🛠 **Key Mixins**

### Responsive Design
```scss
@include respond-to('tablet') {
  // Styles for tablet and up
}

@include respond-between('mobile', 'tablet') {
  // Styles between mobile and tablet
}
```

### Flexbox Utilities
```scss
@include flex-center;           // Center both axes
@include flex-between;          // Space between
@include flex-column-center;    // Vertical centering
```

### Grid System
```scss
@include grid-responsive(1, 2, 3); // 1 col mobile, 2 tablet, 3 desktop
@include grid(4);                   // 4 equal columns
```

### Button Variants
```scss
@include button-variant($bg, $text, $hover-bg, $hover-text);
@include button-size($padding-y, $padding-x, $font-size);
```

### Typography
```scss
@include font-size('xl');
@include font-weight('semibold');
@include line-height('relaxed');
```

## 🎯 **Usage Examples**

### Creating a Component
```scss
.my-component {
  @include card;                    // Apply card styling
  @include card-hover;             // Add hover effects
  @include padding(6, 8, 6, 8);   // Responsive padding
  
  &__title {
    @include font-size('2xl');
    @include font-weight('bold');
    color: var(--text-primary);
  }
  
  &__content {
    @include respond-to('tablet') {
      @include grid(2);
    }
  }
}
```

### Using Color Variables
```scss
.custom-element {
  background-color: var(--primary-500);
  color: var(--neutral-0);
  border: 1px solid var(--border-color);
  
  &:hover {
    background-color: var(--primary-600);
  }
}
```

### Responsive Typography
```scss
.hero-title {
  @include font-size('3xl');
  
  @include respond-to('tablet') {
    @include font-size('5xl');
  }
  
  @include respond-to('laptop') {
    @include font-size('7xl');
  }
}
```

## 🌙 **Dark Mode Implementation**

### Theme Switching
```typescript
import { useTheme } from '../utils/theme';

const { isDark, toggleTheme, setTheme } = useTheme();
```

### CSS Custom Properties
All colors use CSS custom properties that automatically switch based on `data-theme` attribute:

```scss
// Automatically switches between light/dark
background-color: var(--bg-primary);
color: var(--text-primary);
border-color: var(--border-color);
```

## 🚀 **Getting Started**

1. **Import the main SASS file** in your `index.css`:
   ```css
   @import './scss/main.scss';
   ```

2. **Use the theme manager** in your React app:
   ```jsx
   import { themeManager } from './utils/theme';
   import ThemeToggle from './components/ThemeToggle';
   
   // Initialize theme on app start
   useEffect(() => {
     // Theme is automatically initialized
   }, []);
   ```

3. **Apply SASS classes** in your components:
   ```jsx
   <div className="card card--hover">
     <div className="card__header">
       <h2 className="card__title">Title</h2>
     </div>
     <div className="card__body">
       <p className="card__text">Content</p>
     </div>
   </div>
   ```

## 🎨 **Design System Benefits**

- **Consistent Spacing**: Using the `$spacers` map ensures consistent spacing throughout the app
- **Responsive Typography**: Automatic scaling across breakpoints
- **Flexible Grid System**: Easy responsive layouts with grid mixins
- **Accessible Colors**: WCAG compliant color contrasts in both themes
- **Component Modularity**: Each component is self-contained and reusable
- **Theme Flexibility**: Easy switching between light/dark modes
- **Performance**: CSS custom properties for efficient theme switching

## 📦 **File Import Order**

The SASS 7+1 architecture imports files in this specific order:

1. **Abstracts** - Variables, functions, mixins (no CSS output)
2. **Vendors** - Third-party CSS
3. **Base** - Reset, typography, base elements
4. **Layout** - Header, footer, grid system
5. **Components** - Buttons, cards, modals
6. **Pages** - Page-specific styles
7. **Themes** - Theme variants

This ensures proper cascade and prevents conflicts!