/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',       // violet
        secondary: '#EC4899',     // pink
        accent: '#10B981',        // emerald
        surface: '#FFFFFF',       // light “glass” base
        'surface-dark': '#1F2937' // dark “glass” base
      },
      backdropBlur: {
        xs: '4px',
        md: '12px',
        xl: '24px'
      }
    }
  },
  plugins: []
};
