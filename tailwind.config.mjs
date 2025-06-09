/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#effaff',
            100: '#def5ff',
            200: '#b6eeff',
            300: '#75e3ff',
            400: '#2cd6ff',
            500: '#00b0e1',
            600: '#009cd4',
            700: '#007cab',
            800: '#00688d',
            900: '#065674',
            950: '#04374d',
          },
          secondary: {
            50: '#f6f6f6',
            100: '#e7e7e7',
            200: '#d1d1d1',
            300: '#b0b0b0',
            400: '#888888',
            500: '#6d6d6d',
            600: '#5d5d5d',
            700: '#4f4f4f',
            800: '#454545',
            900: '#3d3d3d',
            950: '#2e2e2e',
          },
          accent: {
            50: '#eff6ff',
          },
          dark: {
            bg: '#2e2e2e',
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          heading: ['Montserrat', 'system-ui', 'sans-serif'],
        },
        animation: {
          'fade-up': 'fadeUp 0.5s ease-out forwards',
          'fade-in': 'fadeIn 0.5s ease-out forwards',
        },
        keyframes: {
          fadeUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
        },
      },
    },
    plugins: [require('tailwindcss-animate')],
  }