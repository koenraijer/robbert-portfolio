const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				header: [`'Matter'`, ...defaultTheme.fontFamily.sans,]
			},
		}
	},
	
	daisyui: {
		themes: [
			{
			  lemonade: {
				...require("daisyui/src/colors/themes")["[data-theme=lemonade]"],
			  },
			},
		  ],
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui'), require('tailwindcss-fluid-type')],
	
};

module.exports = config;
