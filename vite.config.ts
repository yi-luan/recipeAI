import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Split rarely-changing vendor code into its own cacheable chunks.
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[/\\](react|react-dom|scheduler)[/\\]/,
            },
            {
              name: 'antd',
              test: /node_modules[/\\](antd|@ant-design|@rc-component|rc-[^/\\]+|dayjs)[/\\]/,
            },
          ],
        },
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
