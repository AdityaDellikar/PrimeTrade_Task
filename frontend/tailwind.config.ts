import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        background: '#0B0F14',
        card: '#11161D',
        border: '#1B222C',
        text: '#E6EDF3',
        neon: '#C6FF00',
        emerald: '#00E676'
      },
      boxShadow: {
        neon: '0 0 16px rgba(198,255,0,0.35)'
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(120deg, #C6FF00, #00E676)'
      }
    }
  },
  plugins: []
};

export default config;
