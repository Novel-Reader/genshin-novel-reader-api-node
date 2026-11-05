import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const sourcePath = (feature) => fileURLToPath(new URL(`./src/${feature}/index.jsx`, import.meta.url));

export default defineConfig({
  build: {
    outDir: '../public/build',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        admin: sourcePath('admin'),
        login: sourcePath('login'),
        logout: sourcePath('logout'),
        reader: sourcePath('reader'),
        register: sourcePath('register'),
      },
      output: {
        format: 'es',
        entryFileNames: 'js/[name]/index.es.js',
        chunkFileNames: 'js/assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            if (assetInfo.name.includes('reset')) return 'css/shared/reset.css';
            const feature = ['admin', 'login', 'logout', 'reader', 'register'].find((name) =>
              assetInfo.name.includes(name)
            );
            if (feature) return `css/${feature}/style.css`;
            return 'css/shared/style.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
