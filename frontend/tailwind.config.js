/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],  
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        aurora: {
          '0%': {
            backgroundPosition: '50% 50%, 50% 50%',  // Start position
          },
          '100%': {
            backgroundPosition: '350% 50%, 350% 50%',  // End position
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        aurora: 'aurora 25s infinite linear'
      },
    },
  },
  plugins: [addVariablesForColors, require("tailwindcss-animate")],
};

// Updated Plugin Function
function addVariablesForColors({ addBase, theme }) {
  const colors = theme("colors"); // Access colors directly from the theme
  const newVars = {};

  // Create CSS variables for each color and shade
  Object.keys(colors).forEach((color) => {
    if (typeof colors[color] === "string") {
      newVars[`--${color}`] = colors[color];
    } else if (typeof colors[color] === "object") {
      Object.keys(colors[color]).forEach((shade) => {
        newVars[`--${color}-${shade}`] = colors[color][shade];
      });
    }
  });

  // Add base styles to inject CSS variables globally
  addBase({
    ":root": newVars,
  });
}
