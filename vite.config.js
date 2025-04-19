import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/Orbital.js",
      name: "Orbital",
      formats: ["es", "umd"],
      fileName: (format) => `orbital.${format}.js`,
    },
  },
  test: {
    // see : vitest.workspace.js
  },
});
