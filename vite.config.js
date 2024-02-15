import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   https: true // 需要开启https服务
  // },
  plugins: [react()]
  // plugins: [react(), mkcert()]
});
