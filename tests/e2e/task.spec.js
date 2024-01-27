const { test, expect } = require("@playwright/test");

test("should add and delete tasks", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  // add first task
  const addButtonFirst = await page.waitForSelector('button[id="add-button"]');
  await addButtonFirst.click();

  await page.type('input[type="text"]', "Teste");
  await page.type('input[type="date"]', "14-01-2022");
  await page.type('input[type="time"]', "11:00");

  const submitButtonFirst = await page.$('button[type="submit"]');
  await submitButtonFirst.click();

  // add second task
  const addButtonSecond = await page.waitForSelector('button[id="add-button"]');
  await addButtonSecond.click();

  await page.type('input[type="text"]', "Teste 2");
  await page.type('input[type="date"]', "18-05-2023");
  await page.type('input[type="time"]', "08:00");

  const submitButtonSecond = await page.$('button[type="submit"]');
  await submitButtonSecond.click();

  // verify taskCards
  const taskCards = await page.$$("#task-card");

  expect(taskCards.length).toBe(2);

  const hasFirstH3Element = await taskCards[0].$eval(
    "h3",
    (h3Element, targetText) => {
      return h3Element.textContent.includes(targetText);
    },
    "Teste"
  );

  expect(hasFirstH3Element).toBeTruthy();

  const hasSecondH3Element = await taskCards[1].$eval(
    "h3",
    (h3Element, targetText) => {
      return h3Element.textContent.includes(targetText);
    },
    "Teste 2"
  );

  expect(hasSecondH3Element).toBeTruthy();
});
