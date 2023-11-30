import { Page, expect, test } from "@playwright/test";
import { createModel } from "@xstate/test";
import { addTestsToMachine, dedupPathPlans } from "../utils";
import { practiceMachine } from "../../app/practice/machine";

const practiceMachineWithTests = addTestsToMachine(practiceMachine, {
  idle: async (page) => {
    await expect(page.getByText("Start Practice")).toBeVisible();
  },
  questionDisplayed: async (page) => {
    await expect(page.getByText("What's the capital of France?")).toBeVisible();
  },
  submissionEvaluationDisplayed: async (page) => {
    await expect(page.getByText("Correct answer:")).toBeVisible();
  },
  leaveConfirmationDisplayed: async (page) => {
    await expect(
      page.getByText("Are you sure you want to leave?")
    ).toBeVisible();
  },
  practiceResultDisplayed: async (page) => {
    await expect(page.getByText("Your Score:")).toBeVisible();
  },
});

const model = createModel<Page>(practiceMachineWithTests, {
  events: {
    PRACTICE_STARTED: {
      exec: async (page) => {
        await page.click("text='Start Practice'");
      },
    },
    ANSWER_SUBMITTED: {
      exec: async (page) => {
        await page.click("text='Paris'");
      },
    },
    NEW_QUESTION_REQUESTED: {
      exec: async (page) => {
        await page.click("text='Next'");
      },
    },
    PRACTICE_FINISHED: {
      exec: async (page) => {
        await page.click("text='Selesai'");
      },
    },
    PRACTICE_LEFT: {
      exec: async (page) => {
        await page.click("text='Leave'");
      },
    },
    LEAVE_CONFIRMED: {
      exec: async (page) => {
        await page.click("text='Yes'");
      },
    },
    LEAVE_CANCELLED: {
      exec: async (page) => {
        await page.click("text='No'");
      },
    },
    NEW_PRACTICE_REQUESTED: {
      exec: async (page) => {
        await page.click("text='Start New Practice'");
      },
    },
  },
});

const pathPlans = model.getShortestPathPlans();

// test.describe.configure({ mode: "parallel" });
// test.beforeEach(async ({ page }, testInfo) => {
//   console.log(`Running ${testInfo.title}`);
//   await page.goto("https://my.start.url/");
// });

test.describe("znet-pg-practice mbt", () => {
  dedupPathPlans(pathPlans).forEach((plan) => {
    // pathPlans.forEach((plan) => {
    test(plan.description, async ({ page }) => {
      await page.goto("http://localhost:3000");
      await page.waitForLoadState("load");
      await page.getByLabel("Username").fill("dafex");
      await page.keyboard.press("Enter");
      await page.getByLabel("Password", { exact: true }).fill("nasiRendang!23");
      await page.keyboard.press("Enter");
      await page.getByRole("link", { name: "Go to Practice" }).click();
      await plan.test(page);
    });
  });
});
