import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C48FF',
        secondary: '#FF4853',
        accent: '#ffad1f',
        danger: '#e0245e',
        grey_0: '#F4F4F4',
        grey_1: '#E3E6EA',
        grey_2: '#D2D2D2',
        grey_3: '#999999',
        grey_4: '#7F7F7F',
        grey_6: '#4E4E4E',
        blue_1: '#d2d1f6',
        blue_2: '#4C48FF',
        red_1: '#f6d4d6',
        red_2: '#FF4853',
        yellow_1: '#f6e3d1',
        yellow_2: '#FFA048',
        green_1: '#d1f6e2',
        green_2: '#25BD6B',
        purple_1: '#ffe6ff',
        purple_2: '#e682e6',
        pink_1: '#fff4f6',
        pink_2: '#ff94aa',
        navy_1: '#c3d6e1',
        navy_2: '#4b85a4',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
export default config;
