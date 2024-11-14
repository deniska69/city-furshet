import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "192.168.0.102",
    port: 4000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      containers: "/src/containers",
      helpers: "/src/helpers",
      hooks: "/src/hooks",
      services: "/src/services",
      stores: "/src/stores",
    },
  },
});
