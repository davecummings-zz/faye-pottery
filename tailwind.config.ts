import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        clay: '#3A3A3A',
        glaze: '#b6bfb2',
        earth: '#5a4a42',
        sand: '#ffffff',
        cream: '#fefdfb',
        warm: '#dcc7b8',
      },
      fontFamily: {
        serif: ['Helvetica', 'Arial', 'sans-serif'],
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
export default config
