import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  define: {
    'import.meta.env.VITE_APP_API_BASE_URL': JSON.stringify(
      process.env.VITE_APP_API_BASE_URL
    ),
  },
});
