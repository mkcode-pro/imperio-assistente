
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080, // Porta preferencial
    strictPort: false, // IMPORTANTE: Permite fallback para outras portas se 8080 estiver ocupada
    open: true, // Auto-open browser in development
  },
  preview: {
    host: "::",
    port: process.env.PREVIEW_PORT ? parseInt(process.env.PREVIEW_PORT) : 8080,
    strictPort: false, // IMPORTANTE: Permite fallback para outras portas
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
}));
