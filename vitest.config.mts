import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx,mjs,mts}'],
    exclude: ['**/*.e2e.{test,spec}.{js,ts,jsx,tsx,mjs,mts}', 'e2e/**/*', 'tests/e2e/**/*'],
  },
});
