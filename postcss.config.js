/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // blue-600
        secondary: "#64748b", // slate-500
        bg: "#f8fafc"
      }
    }
  },
  plugins: []
};
