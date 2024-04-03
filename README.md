- vite 사용 시 유의사항
  - import { ReactComponent as iconEther } from '[path]';
    이렇게 svg 파일 불러오는거 설정해줘야됨 (cra랑 다름)
  1. npm install @svgr/rollup
  2. vite.config.ts) import svgr from "@svgr/rollup"; 추가
  3. vite.config.ts) export default defineConfig({
     plugins: [react(), svgr()],
     }); 추가
