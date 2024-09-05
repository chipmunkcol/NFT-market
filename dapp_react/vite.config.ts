import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";
import prerender from "@prerenderer/rollup-plugin";
// import svgr from "vite-plugin-svgr";
// import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    prerender({
      routes: [
        "/",
        "/market-place",
        "/market-place/nft",
        "/market-place/collection",
        "/create",
        "/create-mint-nft",
        "/create-collection/step-1",
        "/create-collection/step-2",
        // "/mypage",
        // "/nft-detail",
      ],
      renderer: "@prerenderer/renderer-puppeteer",
      // rendererOptions: {
      //   renderAfterDocumentEvent: "custom-render-trigger",
      // },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
      postProcess(renderedRoute) {
        // Replace all http with https urls and localhost to your site url
        renderedRoute.html = renderedRoute.html
          .replace(/http:/gi, "https:")
          .replace(
            /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/gi,
            "dztwi6z9vov5x.cloudfront.net/" || ""
          );
        renderedRoute.html = renderedRoute.html.replace(
          /<style[^>]*>.*?swal2.*?<\/style>/g, // 모든 <style> 태그 제거
          ""
        );
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(__dirname), "./src"),
    },
  },
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
