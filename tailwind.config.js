// Builds css/tailwind.css (npm run build:css). Was the inline tailwind.config of the Play CDN on each page.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/*.js'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '"Hind Siliguri"', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      colors: {
        alabaster: '#FAF9F6',
        charcoal: '#111827',
        stone: {
          50: '#FAF9F6',
          100: '#F5F3EF',
          200: '#E7E5E0',
          300: '#D5D1C8',
          400: '#A39D92',
          500: '#79746A',
          600: '#5A564F',
          700: '#3E3B36',
          800: '#2A2824',
          900: '#1A1916'
        },
        terracotta: {
          50: '#FCF6F4',
          100: '#F8ECE7',
          500: '#D97757',
          600: '#C86446',
          700: '#A84C32'
        },
        sage: {
          50: '#F4F7F5',
          100: '#E5ECE7',
          600: '#4A6B5D',
          700: '#385347'
        },
        ocean: {
          800: '#0E2A47',
          900: '#0B2135',
          950: '#061320'
        }
      }
    }
  }
};
