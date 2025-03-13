# Carfagno Enterprises Gradient Guide

## Main Text Gradient
The signature blue-teal gradient used in headings:

### CSS
```css
background: linear-gradient(to right, #4FD1C5, #4299E1);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Tailwind
```jsx
className="bg-gradient-to-r from-[#4FD1C5] to-[#4299E1] bg-clip-text text-transparent"
```

## Project Card Gradients

### Follow Dom (Emerald)
```jsx
className="from-emerald-500 via-emerald-600 to-emerald-700"
// Colors: #10B981 → #059669 → #047857
```

### Neural Networks (Blue)
```jsx
className="from-blue-500 via-blue-600 to-blue-700"
// Colors: #3B82F6 → #2563EB → #1D4ED8
```

### Zom AI (Yellow)
```jsx
className="from-yellow-500 via-yellow-600 to-yellow-700"
// Colors: #EAB308 → #CA8A04 → #A16207
```

## Usage Examples

### Heading with Gradient
```jsx
<h1 className="text-5xl font-bold bg-gradient-to-r from-[#4FD1C5] to-[#4299E1] bg-clip-text text-transparent">
  Carfagno Enterprises
</h1>
```

### Project Card with Gradient
```jsx
<div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700">
  Follow Dom
</div>
```

### Button with Gradient Background
```jsx
<button className="bg-gradient-to-r from-[#4FD1C5] to-[#4299E1] text-white px-4 py-2 rounded-lg">
  Get Started
</button>
```

### Text with Animated Gradient
```jsx
<span className="animate-gradient bg-gradient-to-r from-[#4FD1C5] via-[#4299E1] to-[#4FD1C5] bg-[length:200%_auto] bg-clip-text text-transparent">
  Animated Text
</span>
```
