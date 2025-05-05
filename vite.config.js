import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '192.168.0.102',
		port: 4000,
	},
	plugins: [react(), tsconfigPaths(), tailwindcss()],
});
