import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  publicDir: "public",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts', 'd3-scale', 'd3-array'],
          animations: ['framer-motion']
        }
      },
    },
  },
  ...(process.env.NODE_ENV === 'development' && {
    server: {
      port: 5173,
      host: true,
      strictPort: true,
    },
    preview: {
      port: 4173,
      host: true,
      strictPort: true,
    },
  }),
})

