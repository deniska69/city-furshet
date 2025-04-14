import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "192.168.0.102",
    port: 4000,
  },
  plugins: [react(), tsconfigPaths()],
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
