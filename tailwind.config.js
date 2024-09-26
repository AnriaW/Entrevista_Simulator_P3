/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				background: '#16192B',
				primary: {
					darker: '#1B3E1B',
					lighter: '#6AB981',
				},
				accent: '#4F378B',
			},
		},
	},
	plugins: [],
}
