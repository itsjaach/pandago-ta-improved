import { test, expect } from '@playwright/test';

test('info is loaded and Pokemon appear on the main page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('td').filter({ hasText: 'Bulbasaur' })).toHaveText('Bulbasaur');
})

test('app should navigate back to the home page from a detail view', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Bulbasaur').click();
  await page.getByLabel('Go back to main page').click();
  await expect(page).toHaveURL('/')
});

test('Detailed information of a Pokémon is displayed when selected', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Bulbasaur').click();
  await expect(page).toHaveURL('/pokemon/bulbasaur')
  await expect(page.getByText('BULBASAUR')).toBeVisible();
});

test('Pokémon can be filtered by type', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByRole('listbox').getByText('water').click(); 
  await expect(page.getByText('Bulbasaur')).toBeHidden();
  await expect(page.getByText('Squirtle')).toBeVisible();
});

test('Pokémon can be filtered by name', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Search Pokemon by name').click();
  await page.getByLabel('Search Pokemon by name').fill('squirtle');
  await expect(page.getByText('Bulbasaur')).toBeHidden();
  await expect(page.getByText('Squirtle')).toBeVisible();
});

test('Pokémon can be filtered by id', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Search Pokemon by name').click();
  await page.getByLabel('Search Pokemon by name').fill('30');
  await expect(page.getByText('Bulbasaur')).toBeHidden();
  await expect(page.getByText('Nidorina')).toBeVisible();
});

test('Table will show an error message if no Pokemon fit the search', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Search Pokemon by name').click();
  await page.getByLabel('Search Pokemon by name').fill('loremipsum');
  await expect(page.getByText('Bulbasaur')).toBeHidden();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByLabel('Search Pokemon by name').fill('3000');
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
});

test('Pokémon table paginator can be changed', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('List of Pokemon').getByRole('combobox').locator('i').click();
  await page.getByText('25').click();
  await expect(page.getByRole('cell', { name: '25' })).toBeVisible();
});

test('Pokémon table name column is sorted', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('cell', { name: 'Name', exact: true }).locator('i').click();
  await expect(page.getByText('Abra')).toBeVisible();
  await page.getByRole('cell', { name: 'Name', exact: true }).locator('i').click();
  await expect(page.getByText('Zubat')).toBeVisible();
});

test('Page is accessible through keyboard navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Bulbasaur').press('Tab');
  await page.getByText('Ivysaur').press('Enter');
  await expect(page).toHaveURL('/pokemon/ivysaur')
  await page.locator('body').press('Tab');
  await page.getByLabel('Go back to main page').press('Enter');
  await expect(page).toHaveURL('/')
});


