import { test, expect } from "@playwright/test";

test.describe("Practice Machine", () => {
  test("should be in idle state initially", async ({ page }) => {
    await page.goto("await page.goto('http://localhost:3000/practice');
    // await page.goto('http://localhost:3000/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fpractice');
    await page.getByLabel('Email address or username').click();
    await page.getByLabel('Email address or username').fill('rachelrdmk17@gmail.com');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Password', { exact: true }).press('CapsLock');
    await page.getByLabel('Password', { exact: true }).fill('R');
    await page.getByLabel('Password', { exact: true }).press('CapsLock');
    await page.getByLabel('Password', { exact: true }).fill('Rrdmk1742');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Continue' }).click();
    const page1 = await page1Promise;
    await page.getByRole('button', { name: 'Start New Practice' }).click();
    await expect(startPracticeButton).toBeVisible();
    // await page.getByText('CParis').click();
    // await page.getByRole('button', { name: 'Next' }).click();
    // await page.getByText('BCarbon dioxide').click();
    // await page.getByRole('button', { name: 'Next' }).click();
    // await page.getByText('A2').click();
    // await page.getByRole('button', { name: 'Next' }).click();
    // await page.getByText('B4').click();
    // await page.getByRole('button', { name: 'Next' }).click();
    // await page.getByText('BHarper Lee').click();
    // await page.getByRole('button', { name: 'Selesai' }).click();");
    // await expect(startPracticeButton).toBeVisible();
  });

  test("should display question when in questionDisplayed state", async ({ page }) => {
    await page.goto("http://localhost:3000/practice");
    const questionText = await page.locator("text=What's the capital of France?");
    await expect(questionText).toBeVisible();
  });

  test("should display submission evaluation when in submissionEvaluationDisplayed state", async ({ page }) => {
    await page.goto("http://localhost:3000/practice");
    const evaluationText = await page.locator("text=Correct answer:");
    await expect(evaluationText).toBeVisible();
  });

  test("should display leave confirmation when in leaveConfirmationDisplayed state", async ({ page }) => {
    await page.goto("http://localhost:3000/practice");
    const confirmationText = await page.locator("text=Are you sure you want to leave?");
    await expect(confirmationText).toBeVisible();
  });

  test("should display practice result when in practiceResultDisplayed state", async ({ page }) => {
    await page.goto("http://localhost:3000/practice");
    const scoreText = await page.locator("text=Your Score:");
    await expect(scoreText).toBeVisible();
  });
});
