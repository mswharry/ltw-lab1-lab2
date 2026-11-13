import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backend = "http://127.0.0.1:8081";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user/": backend,
      "/photosOfUser/": backend,
      "/test/": backend,
    },
  },
});
