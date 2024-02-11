import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-text": "var(--gradient-custom)",
        gradient: {
          custom: "var(--gradient-custom)",
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    defaultTheme: "light",
    
    // Theme customization
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#6956e3",
            // gradientButton:"linear-gradient(to right,$orange , $yellow)"
            //
            // Prev. 5161E9
          },
          // gradient: {
          //   DEFAULT: "linear-gradient(to right, #ff4721, #ffa52b)"
          // },
          // gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
          
          // danger:{
          //   DEFAULT: "linear-gradient(to right, #ff4721, #ffa52b)"
          // }
         
        },
        backgroundStyles: {
          gradient: {
            DEFAULT: "linear-gradient(to right, #ff4721, #ffa52b)"
          }
        }
      },
    },
  })],
}
