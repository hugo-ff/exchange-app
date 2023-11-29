/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",
				black: "#000",
				white: "#fff",

				// Colores principales
				primary: {
					50: "#e8f3ff",
					100: "#c5e0ff",
					200: "#a1cdff",
					300: "#7ebaff",
					400: "#5ba7ff",
					500: "#1a8dff",
					600: "#177bcc",
					700: "#135caa",
					800: "#0e4789",
					900: "#0a3a6e",
				},

				// Colores secundarios
				secondary: {
					50: "#ffffff",
					100: "#f2f2f2",
					200: "#e6e6e6",
					300: "#d9d9d9",
					400: "#cccccc",
					500: "#bfbfbf",
					600: "#999999",
					700: "#808080",
					800: "#666666",
					900: "#4d4d4d",
				},

				// Otros colores personalizados
				accent: "#0e1342",
				accentDark: "#0a0f34",
			},
		},
	},
	plugins: [],
};
