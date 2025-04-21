/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        // Tus colores personalizados
        background: "var(--color-bg)",
        placeholder: "var(--color-placeholder)",
        "secondary-typo": "var(--color-secondary-typo)",
        divider: "var(--color-divider)",
        "primary-typo": "var(--color-primary-typo)",
        "secondary-typo": "var(--color-secondary-typo)",
        carrousel: "var(--color-carrousel)",
        "other-bg": "var(--color-other-bg)",
        "main-accent": "var(--color-main-accent)",
        "secondary-accent": "var(--color-secondary-accent)",
        "tertiary-accent": "var(--color-tertiary-accent)",
        // No necesitas redefinir los colores estándar de Tailwind como blue-500
        // porque están disponibles por defecto cuando usas 'extend',
        blue: {
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
