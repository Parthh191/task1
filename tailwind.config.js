/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blog-dark': '#0F172A',
        'blog-dark-light': '#1E293B',
        'blog-primary': '#8b5cf6',
        'blog-secondary': '#ec4899',
        'blog-accent': '#6366f1',
        'blog-dark-surface': '#1E293B',
        'blog-dark-deeper': '#0B1121',
        'blog-light': '#f9f9f9',
        'blog-light-secondary': '#ffffff',
        'blog-light-text': '#1a1a1a',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg,rgb(14, 17, 26) 0%,rgb(5, 18, 39) 40%, rgba(6, 7, 61, 0.2) 80%, rgba(0, 0, 0, 0.1) 100%)',
        'dark-glow': 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.15) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}