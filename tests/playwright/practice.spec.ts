import { test, expect } from "@playwright/test";

test("Practice Test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").fill("dafex");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Password", { exact: true }).fill("nasi");
  await page.getByLabel("Password", { exact: true }).press("CapsLock");
  await page.getByLabel("Password", { exact: true }).fill("nasiR");
  await page.getByLabel("Password", { exact: true }).press("CapsLock");
  await page.getByLabel("Password", { exact: true }).fill("nasiRendang!23");
  await page.getByLabel("Password", { exact: true }).press("Enter");
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Go to Practice" }).click();
  await page.getByRole("button", { name: "Start New Practice" }).click();
  await page.getByText("CParis").click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByText("BCarbon dioxide").click();
  await page.getByText("Benar!").click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByText("A2").click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByText("B4").click();
  await page.getByText("Benar!").click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByText("BHarper Lee").click();
  await page.getByText("Benar!").click();
  await page.getByRole("button", { name: "Selesai" }).click();
  await page.getByRole("link", { name: "Back to Home" }).click();
  await page
    .getByRole("heading", { name: "Welcome back, Fahrel Gibran" })
    .click();
  await page.getByRole("button", { name: "Sign out" }).click();
  await page.getByRole("heading", { name: "Sign in" }).click();
});
