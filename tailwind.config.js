/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2545',
          dark: '#0A192F',
          light: '#133663',
        },
        gold: {
          DEFAULT: '#E5A93C',
          dark: '#C98F28',
          light: '#F5C86B',
          foil: '#D4AF37',
        },
        accent: {
          blue: '#1E6091',
          cyan: '#0077B6',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(229, 169, 60, 0.3)',
        'navy-glow': '0 0 20px rgba(11, 37, 69, 0.4)',
      }
    },
  },
  plugins: [],
}
