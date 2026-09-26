import { test, expect } from '../fixtures';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

// ============================================================================
// SUITE 1: Pruebas de Autenticación y Login
// ============================================================================
test.describe('Suite 1 - Autenticación y Control de Acceso', () => {
  // Hook de preparación común (patrón de la clase 08)
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigate();
  });

  // Test 1: Login exitoso
  test('Test 1 - Login exitoso con credenciales válidas', async ({ page, loginPage }) => {
    await loginPage.login('Admin', 'admin123');
    await expect(page).toHaveURL(/.*dashboard\/index/);
    await page.screenshot({ path: 'evidencias/test1-login-exitoso.png', fullPage: true });
  });

  // Test 2: Login con credenciales inválidas
  test('Test 2 - Login fallido con credenciales inválidas', async ({ page, loginPage }) => {
    await loginPage.login('UsuarioErroneo', 'ClaveInvalida999');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid credentials');
    await page.screenshot({ path: 'evidencias/test2-login-invalido.png', fullPage: true });
  });
});

// ============================================================================
// SUITE 2: Navegación de Módulos y Flujo del Sitio con Login en beforeEach
// ============================================================================
test.describe('Suite 2 - Navegación y Flujo del Sistema', () => {
  // Hook beforeEach para resolver el login automático previo a cada prueba (patrón de la clase 08)
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');
    await expect(page).toHaveURL(/.*dashboard\/index/);
  });

  // Test 3: Parametrizado con for...of
  const modulosMenu = ['PIM', 'Leave', 'Directory'];

  for (const modulo of modulosMenu) {
    test(`Test 3 - Navegación al módulo: ${modulo}`, async ({ page, dashboardPage }) => {
      await dashboardPage.navigateToModule(modulo);
      await dashboardPage.expectModuleHeader(modulo);
      await page.screenshot({ path: `evidencias/test3-modulo-${modulo}.png`, fullPage: true });
    });
  }

  // Test 4: Libre - Cierre de sesión (Logout)
  test('Test 4 - Verificación libre: Cierre de sesión (Logout)', async ({ page, dashboardPage, loginPage }) => {
    await dashboardPage.logout();
    await expect(page).toHaveURL(/.*auth\/login/);
    await expect(loginPage.usernameInput).toBeVisible();
    await page.screenshot({ path: 'evidencias/test4-cierre-sesion.png', fullPage: true });
  });
});
