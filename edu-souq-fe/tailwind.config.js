/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        secondary: '#00C4B4',
        // Light mode colors - refined professional scheme
        light: {
          background: '#F8F9FA',
          card: '#FFFFFF',
          text: '#1F2937',
          textSecondary: '#6B7280',
          border: '#E5E7EB'
        },
        // Dark mode colors - enhanced professional scheme
        dark: {
          background: '#111827',
          card: '#1F2937',
          text: '#F9FAFB',
          textSecondary: '#D1D5DB',
          border: '#374151'
        }
      },
      boxShadow: {
        'card-light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)'
      }
    },
  },
  plugins: [],
};
