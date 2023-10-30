import { defineConfig, loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { createVuePlugin } from 'vite-plugin-vue2';
import { createSvgPlugin } from 'vite-plugin-vue2-svg';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

const title = 'AIDI'; // title
const resolve = (dir) => path.resolve(__dirname, dir);
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = env.port || env.npm_config_port || 9999; // prot
  return {
    base: `/`,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@c': resolve('src/components/'),
        '@v': resolve('src/views/'),
        // '@s': resolve('src/static/'),
        '@u': resolve('src/utils/'),
      },
      extensions: ['.vue', '.js', '.jsx', '.json'],
    },
    plugins: [
      createVuePlugin({ jsx: true }),
      viteMockServe({ mockPath: 'mock', localEnabled: true }),
      createSvgPlugin(),
      createHtmlPlugin({ minify: true, inject: { data: { title } } }),
    ],
    server: {
      watch: { ignored: ['!**/node_modules/your-package-name/**'] },
      host: '0.0.0.0',
      port,
      hmr: {},
      proxy: { '/api': { target: '192.168.31.1', changeOrigin: true, ws: true } },
    },
    build: {
      assetsDir: 'static',
      minify: 'terser',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // 静态资源打包做处理
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
        },
      },
      terserOptions: {
        compress: { drop_console: true, drop_debugger: true },
      },
    },
    optimizeDeps: {
      exclude: ['your-package-name'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ``,
        },
      },
    },
  };
});
