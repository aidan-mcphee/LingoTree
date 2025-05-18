import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
    ssr: {
    noExternal: ["@react-sigma/core", "sigma", "graphology"]
  },
  optimizeDeps: {
    include: ["@react-sigma/core", "sigma", "graphology"], // Force client-side bundling
  },
});
