/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Fichier HTML principal de Tauri
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Tous les fichiers Vue, JS, TS dans le dossier src
  ],
  theme: {
    extend: {
      // Ajoutez vos personnalisations ici, si nécessaire
      colors: {
        paper: "#fdf6e3", // Exemple de couleur pour un style de livre
        ink: "#2c2c2c",   // Couleur d'encre
      },
      fontFamily: {
        serif: ["Merriweather", "serif"], // Polices élégantes pour un design classique
      },
    },
  },
  plugins: [
    // Ajoutez des plugins officiels ou tiers ici, si nécessaire
  ],
};
