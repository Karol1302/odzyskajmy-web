import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
    // w trybie deweloperskim (npm run dev) serwer będzie sygnalizować, że działasz pod /odzyskajmy-web/
    // w trybie produkcyjnym (npm run build) bazą będzie główny katalog '/'
    const base = mode === 'development'
      ? '/odzyskajmy-web/'
      : '/';
  
    return {
      base,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
});
