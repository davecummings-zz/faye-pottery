import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        clay: '#9d7a6e',
        glaze: '#b6bfb2',
        earth: '#5a4a42',
        sand: '#f9f6f1',
        cream: '#fefdfb',
        warm: '#dcc7b8',
      },
      fontFamily: {
        serif: ['"Crimson Text"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
export default config
