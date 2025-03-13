# Carfagno Enterprises Branding Guide

## Colors

### Primary Colors
- Teal: #4FD1C5
- Blue: #4299E1

### Gradient
The signature gradient used in headings:
```css
background: linear-gradient(to right, #4FD1C5, #4299E1);
```

## Typography

### Font Family
- Primary Font: Inter
- Weights Used: Regular (400), Medium (500), Semibold (600), Bold (700)

### Text Styles

#### Headers
```css
/* Main Hero Header */
text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight

/* Section Headers */
text-3xl font-bold text-primary

/* Subheaders */
text-xl font-bold text-primary
```

#### Body Text
```css
/* Regular Text */
text-gray-300 text-base

/* Large Body Text */
text-gray-300 text-xl sm:text-2xl
```

## Components

### Buttons
```css
/* Primary Button */
bg-primary hover:bg-primary/90 text-white font-medium

/* Secondary Button */
bg-black border-border hover:border-primary transition-colors
```

### Cards
```css
/* Feature Card */
bg-black border-border hover:border-primary transition-colors p-6
```

### Gradients
```css
/* Text Gradient */
bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent

/* Neural Networks Project */
from-blue-500 via-blue-600 to-blue-700

/* Zom AI Project */
from-yellow-500 via-yellow-600 to-yellow-700

/* Follow Dom Project */
from-emerald-500 via-emerald-600 to-emerald-700
```

## Logo
- Primary Logo: White on transparent background
- File: `/public/images/ce-logo.png`
- Usage: Always maintain aspect ratio and clear space around logo

## Layout
- Container Width: `container mx-auto`
- Section Padding: `py-section-sm sm:py-section px-4`
- Grid Layout: `grid md:grid-cols-2 gap-8`

## Animations
- Scroll Reveal: Used for progressive content reveal
- Hover Effects: Subtle scale and color transitions
- Duration Classes: 8s, 10s, 12s, 15s, 20s, 30s, 60s

## Best Practices
1. Always use Tailwind classes for consistency
2. Maintain dark theme with black backgrounds and light text
3. Use gradient accents for emphasis
4. Keep animations subtle and purposeful
5. Ensure responsive design at all breakpoints
