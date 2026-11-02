import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: '../public/js', // 输出到 Express 静态目录
    emptyOutDir: true,
    rollupOptions: {
      input: {
        admin: path.resolve(__dirname, 'src/admin/index.jsx'),
        login: path.resolve(__dirname, 'src/login/index.jsx'),
        logout: path.resolve(__dirname, 'src/logout/index.jsx'),
        reader: path.resolve(__dirname, 'src/reader/index.jsx'),
        register: path.resolve(__dirname, 'src/register/index.jsx'),
      },
      output: {
        format: 'es',
        name: '[name]', // 按入口名称生成不同的全局变量
        entryFileNames: '[name]/index.es.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css') && assetInfo.name.includes('admin')) {
            return 'admin/style.css';
          }
          if (assetInfo.name?.endsWith('.css') && assetInfo.name.includes('login')) {
            return 'login/style.css';
          }
          if (assetInfo.name?.endsWith('.css') && assetInfo.name.includes('logout')) {
            return 'logout/style.css';
          }
          return '[name]/assets/[name]-[hash][extname]';
        },
        // 禁用内联动态导入
        inlineDynamicImports: false,
      },
    },
  },
});
