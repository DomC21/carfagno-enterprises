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
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    allowedHosts: ["old-session-app-tunnel-s1nkxb52.devinapps.com"]
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
    allowedHosts: ["old-session-app-tunnel-s1nkxb52.devinapps.com"]
  },
})

