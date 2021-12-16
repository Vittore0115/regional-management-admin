import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport from 'vite-plugin-style-import';

const baseURL = {}

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
	plugins: [
		vue(),
		styleImport({
			libs: [
				{
					libraryName: 'element-plus',
					esModule: true,
					ensureStyleFile: true,
					resolveStyle: (name) => {
						name = name.slice(3)
						return `element-plus/packages/theme-chalk/src/${name}.scss`;
					},
					resolveComponent: (name) => {
						return `element-plus/lib/${name}`;
					},
				},
			],
		})
	],
	base: baseURL[mode],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `$injectedColor: orange;`
			}
		},
	},
	resolve: {
		//别名配置
		alias: {
			'@': path.resolve(__dirname, './src')
		},
	},
	server: {
		host: '0.0.0.0',
		port: 8080,
		// strictPort: true, // 若端口已被占用则会直接退出，而不是尝试下一个可用端口
		open: true, // 服务器启动时自动在浏览器中打开应用程序。当此值为字符串时，会被用作 URL 的路径名。
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},
		}
	},
	build: {
		sourcemap: false, //构建后是否生成 source map 文件 默认是false
		outDir: 'dist',
		assetsDir: 'assets',
		assetsInlineLimit: 4096//4kb  // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求
	}
},
)
