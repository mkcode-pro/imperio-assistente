
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: process.env.PORT ? parseInt(process.env.PORT) : undefined, // Auto-detect available port
    strictPort: false, // Allow fallback to other ports if specified port is busy
    open: true, // Auto-open browser in development
  },
  preview: {
    host: "::",
    port: process.env.PREVIEW_PORT ? parseInt(process.env.PREVIEW_PORT) : undefined,
    strictPort: false,
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
