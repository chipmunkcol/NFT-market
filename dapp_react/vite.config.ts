import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
});

// import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react-refresh";
// import nodePolyfills from "rollup-plugin-node-polyfills";
// import svgr from "@svgr/rollup";

// export default defineConfig({
//   plugins: [reactRefresh(), nodePolyfills(), svgr()],
//   build: {
//     rollupOptions: {
//       plugins: [nodePolyfills()],
//     },
//   },
//   optimizeDeps: {
//     include: ["react"],
//   },
// });
// // export default defineConfig({
// //   plugins: [react(), svgr()],
// // });
