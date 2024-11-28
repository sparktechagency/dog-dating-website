/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontSize: {
        'fluid-2xl': 'clamp(1.25rem, 2vw + 0.3rem, 96px)', // Largest size, up to 100px
        'fluid-2xl-3': 'clamp(1.25rem, 2vw + 0.3rem, 96px)', // Slightly smaller than 2xl
        'fluid-2xl-2': 'clamp(1.25rem, 2vw + 0.3rem, 72px)', // Mid-size for headings
        'fluid-lg-title': 'clamp(1.25rem, 2vw + 0.3rem, 62px)', // Large title size
        'fluid-lg-title-1': 'clamp(1.25rem, 2vw + 0.3rem, 40px)', // Smaller title size
        'fluid-lg-title-2': 'clamp(1.25rem, 2vw + 0.3rem, 30px)', // Smaller, subheading size
        'fluid-base': 'clamp(1rem, 1.5vw + 0.2rem, 22px)', // Standard body text
        'fluid-small-title': 'clamp(1rem, 1.5vw + 0.2rem, 24px)', // Small title or subtitle
        'fluid-button': 'clamp(0.875rem, 1vw + 0.15rem, 18px)', // Button text
      },
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require('daisyui'),
      require("tailwindcss-animate")
],
};
