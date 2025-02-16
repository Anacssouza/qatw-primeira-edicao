import { test, expect } from '@playwright/test';

test('Código inválido > Não permite autenticar', async ({ page }) => {
  await page.goto('http://paybank-mf-auth:3000/');

  const user = {
    cpf: "00000014141",
    codigo: "147258"
  }

  await page.getByRole('textbox', { name: 'Digite seu CPF' }).fill('00000014141');
  await page.getByRole('button', { name: 'Continuar' }).click();

  for (let digito of user.codigo) {
    await page.getByRole('button', { name: digito }).click();
  }

  await page.getByRole('button', { name: 'Continuar' }).click();

  await page.getByRole('textbox', { name: '000000' }).fill('123456');
  await page.getByRole('button', { name: 'Verificar' }).click();
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});