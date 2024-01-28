const { test, expect } = require("@playwright/test");

test("should add and delete tasks", async ({ page }) => {
  const baseURL = "http://localhost:8080/";
  await page.goto(baseURL);

  const clickIfExists = async (selector) => {
    const element = await page.$(selector);
    if (element) {
      await element.click();
    } else {
      throw new Error(`Element with selector ${selector} not found.`);
    }
  };

  const addTask = async (description, date, time) => {
    await clickIfExists('button[id="add-button"]');

    await page.type('input[type="text"]', description);
    await page.type('input[type="date"]', date);
    await page.type('input[type="time"]', time);

    await clickIfExists('button[type="submit"]');
  };

  await addTask("Teste", "2022-01-14", "11:00");
  await addTask("Teste 2", "2023-05-18", "08:00");

  const taskCardsBefore = await page.$$("#task-card");

  expect(taskCardsBefore.length).toBe(2);

  const taskDescriptions = ["Teste", "Teste 2"];

  for (let i = 0; i < taskCardsBefore.length; i++) {
    const hasH3Element = await taskCardsBefore[i].$eval(
      "h3",
      (h3Element, targetText) => h3Element.textContent.includes(targetText),
      taskDescriptions[i]
    );

    expect(hasH3Element).toBeTruthy();
  }

  await clickIfExists('button[id="delete-button"]');

  const taskCardsAfter = await page.$$("#task-card");

  expect(taskCardsAfter.length).toBe(1);
});
