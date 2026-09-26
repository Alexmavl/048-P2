import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  // Locators como propiedades de la clase
  readonly headerTitle: Locator;
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutButton = page.locator('a.oxd-userdropdown-link', { hasText: 'Logout' });
  }

  // Métodos como acciones de alto nivel
  async navigateToModule(moduleName: string) {
    const menuItem = this.page.locator('.oxd-main-menu-item', { hasText: moduleName });
    await menuItem.click();
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
  }

  async expectModuleHeader(expectedHeader: string) {
    await expect(this.headerTitle).toBeVisible();
    await expect(this.headerTitle).toHaveText(expectedHeader);
  }
}
