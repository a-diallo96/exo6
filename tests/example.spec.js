// @ts-check
const { test, expect } = require('@playwright/test');


test('va sur la page google', async ({ page }) => {

  const searchTerm = 'automatisation des tests logiciels';
  const searchInput = '//textarea[@title="Rechercher"]';

  await page.goto('https://www.google.com/');

  await page.locator('//div[text()="Tout refuser"]').click();


  await page.locator(searchInput).click();


  await page.locator(searchInput).fill("automatisation des tests logiciels");

  await page.keyboard.press('Enter')

  await page.waitForSelector('div#search');


  const results = await page.$$eval('div#search .g', nodes => 
    nodes.filter(n => !(n instanceof SVGElement)).map(n => n.textContent)
);

  const containsTerm = results.some(result => result?.toLowerCase().includes(searchTerm.toLowerCase()));

  if (containsTerm) {
      console.log(`Le terme de recherche "${searchTerm}" est présent dans les résultats.`);
  } else {
      console.log(`Le terme de recherche "${searchTerm}" est absent des résultats.`);
  }



  const title = await page.title();

  const containsInTitle = title.toLowerCase().includes(searchTerm.toLowerCase());
  expect(containsInTitle).toBe(true);

});