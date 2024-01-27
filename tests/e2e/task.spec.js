const { test, expect } = require("@playwright/test");

test("should add task", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  const addButton = await page.waitForSelector('button[id="add-button"]');
  await addButton.click();

  await page.type('input[type="text"]', "Teste");
  await page.type('input[type="date"]', "14-01-2022");
  await page.type('input[type="time"]', "11:00");

  const submitButton = await page.$('button[type="submit"]');
  await submitButton.click();

  await expect(page).toHaveTitle(/task-list/);
});
