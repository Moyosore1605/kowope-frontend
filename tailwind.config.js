/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				body: '#65758B',
				primary: {
					DEFAULT: '#F4B400',
					hover: '#d99c00',
				},
				secondary: '#2563EB',
				header: '#010214',
				stroke: '#EAECF0',
				input: '#EAECF0',
			},
		},
	},
	plugins: [],
}