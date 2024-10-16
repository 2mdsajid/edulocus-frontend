import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		zIndex: {
  			'100': '100',
  			'150': '140'
  		},
  		transitionProperty: {
  			multiple: 'width , height , backgroundColor , border-radius'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  		},
  		colors: {
  			primary: '#fafafa',
  			secondary: '#748de2',
  			third: '#08CCFD',
  			accent: '#501FA5',
  			accent2: '#ffffff',
  			accent3: '#ffffff',
  			accent4: '#ffffff',
  			text1: '#000000',
  			navbar: '#37d3fa',
  			dark: {
  				primary: '#111827',
  				ppp: '#000228',
  				secondary: '#061e6e',
  				third: '#0a0a0a',
  				accent: '#7C5DBE',
  				accent2: '#070A47',
  				accent3: '#1f2937',
  				accent4: '##1c254a',
  				backg: '#020513',
  				navbar: '#010b1c',
  				text1: '#ffffff',
  				text2: '#000000'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
