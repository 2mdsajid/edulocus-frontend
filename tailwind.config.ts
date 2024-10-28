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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			colors: {
				bg1: "#FAF5FF", //purple-50
				bg2: "#FDF2F8", //pink-50
				primary: '#ffffff', // Soft off-white background for light mode
				secondary: '#8e7cc3', // Soft lavender for secondary UI elements
				accent: '#9333EA',// Primary purple accent
				color1: "#FAF5FF",
				color2: "#F3E8FF",
				color3: "#E9D5FF",
				color4: "#D8B4FE",
				color5: "#C084FC",
				color6: "#A855F7",
				color7: "#9333EA",
				color8: "#7E22CE",
				color9: "#6B21A8",
				color10: "#581C87"
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
