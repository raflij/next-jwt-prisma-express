/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {

        'slide-up': {
          'from': {
            'transform': 'translateY(100%)'
          },
          'to': {
            'transform': 'translateY(0)'
          }
        },
        'fade-in': {
          'from': {
            'opacity': '0'
          },
          'to': {
            'opacity': '1'
          }
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'ping': 'ping 0.7s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
