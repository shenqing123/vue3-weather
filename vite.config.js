import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
	  imports: [
		// 需要自动导入的API，自动导入vue和vue-router相关函数
		'vue',
		'vue-router',
		'pinia',
	  ],
	   // 指明 .d.ts 文件的位置和文件名，生成 `auto-import.d.ts` 全局声明
	  dts: 'src/types/auto-import.d.ts',
    }),],
})
