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
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/coaching/, to: '/index.html' },
        { from: /^\/projects\/.*/, to: '/index.html' },
        { from: /./, to: '/index.html' }
      ]
    }
  },
  preview: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/coaching/, to: '/index.html' },
        { from: /^\/projects\/.*/, to: '/index.html' },
        { from: /./, to: '/index.html' }
      ]
    }
  },
})

