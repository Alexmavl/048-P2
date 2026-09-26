import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'tests/parcial2.spec.ts',
  timeout: 60000,
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    headless: true,
    screenshot: 'on', //'on' | 'off' | 'only-on-failure',
    video: 'on', //'on' | 'off' |'retain-on-failure',
    trace: 'on', //'on' | 'off' |'retain-on-failure', 
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
});