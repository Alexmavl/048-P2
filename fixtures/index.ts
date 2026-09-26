import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

type AppFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<AppFixtures>({
  // Fixture de página de Login (patrón de la clase 09)
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await use(lp);
  },

  // Fixture de página de Dashboard para navegación (patrón de la clase 09)
  dashboardPage: async ({ page }, use) => {
    const dp = new DashboardPage(page);
    await use(dp);
  },
});

export { expect } from '@playwright/test';
