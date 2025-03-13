# Carfagno Enterprises Brand Guide

## Text Styles

### Main Hero Title
```css
Font: Inter Bold (700)
Size: 48px mobile, 72px desktop
Color: Gradient from #4FD1C5 to #4299E1
Code: text-5xl sm:text-6xl lg:text-7xl font-bold
```

### Section Headers
```css
Font: Inter Bold (700)
Size: 30px
Color: #4FD1C5
Code: text-3xl font-bold text-primary
```

### Subheaders
```css
Font: Inter Semibold (600)
Size: 20px
Color: #4FD1C5
Code: text-xl font-semibold text-primary
```

### Body Text
```css
Font: Inter Regular (400)
Size: 16px
Color: #D1D5DB
Code: text-base text-gray-300
```

### Large Body Text
```css
Font: Inter Regular (400)
Size: 20px mobile, 24px desktop
Color: #D1D5DB
Code: text-xl sm:text-2xl text-gray-300
```

## Brand Colors

### Primary Colors
- Teal: #4FD1C5
- Blue: #4299E1
- Text Gray: #D1D5DB
- Background: #000000

### Project Colors
- Neural Networks: Blue (#3B82F6 to #1D4ED8)
- Follow Dom: Emerald (#10B981 to #059669)
- Zom AI: Yellow (#EAB308 to #CA8A04)

## Gradients

### Main Text Gradient
```jsx
// React/Tailwind
className="bg-gradient-to-r from-[#4FD1C5] to-[#4299E1] bg-clip-text text-transparent"

// CSS
background: linear-gradient(to right, #4FD1C5, #4299E1);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Project Card Gradients
```jsx
// Follow Dom
className="from-emerald-500 via-emerald-600 to-emerald-700"

// Neural Networks
className="from-blue-500 via-blue-600 to-blue-700"

// Zom AI
className="from-yellow-500 via-yellow-600 to-yellow-700"
```

## Examples

### Gradient Title
```jsx
<h1 className="text-5xl font-bold bg-gradient-to-r from-[#4FD1C5] to-[#4299E1] bg-clip-text text-transparent">
  Carfagno Enterprises
</h1>
```

### Project Card
```jsx
<div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700">
  Follow Dom
</div>
```

### Button with Gradient
```jsx
<button className="bg-gradient-to-r from-[#4FD1C5] to-[#4299E1] text-white px-4 py-2 rounded-lg">
  Get Started
</button>
```
