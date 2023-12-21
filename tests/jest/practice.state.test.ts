import { createPracticeMachine } from "../../app/practice/machine";
import { interpret } from "xstate";
import { waitFor } from "xstate/lib/waitFor";

// TODO: fill in the blanks
const USER_ID = "";
const SCORE = 0;

const practiceMachine = createPracticeMachine(USER_ID, SCORE);

const mockPracticeMachine = practiceMachine.withConfig({
  services: {
    fetchQuestionsService: (_, event) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            questions: [
              {
                id: "1",
                text: "What's the capital of France?",
                options: ["Jakarta", "Paris", "London", "New Delhi"],
              },
              {
                id: "2",
                text: "What's the capital of Indonesia?",
                options: ["Jakarta", "Paris", "London", "New Delhi"],
              },
            ],
          });
        }, 50);
      }),
    fetchAnswerService: (_, event) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            answer: event.answer,
            correct_answer: 1,
          });
        }, 50);
      }),
  },
});

it('should eventually reach "questionDisplayed"', (done) => {
  const pmTest = interpret(practiceMachine).onTransition((state) => {
    if (state.matches("practiceSession.questionDisplayed")) {
      done();
    }
  });
  pmTest.start();
  pmTest.send("PRACTICE_STARTED");
});

it('should eventually reach "submissionEvaluationDisplayed"', (done) => {
  const pmTest = interpret(practiceMachine).onTransition((state) => {
    if (
      state.matches("practiceSession.submissionEvaluationDisplayed") &&
      state.actions.length > 0 &&
      state.actions[0].type === "evaluateAnswer"
    ) {
      done();
    }
  });
  (async () => {
    pmTest.start();
    pmTest.send("PRACTICE_STARTED");
    await waitFor(pmTest, (state) =>
      state.matches("practiceSession.questionDisplayed")
    );
    pmTest.send({
      type: "ANSWER_SUBMITTED",
      answer: 2,
      questionId: "07e338dd-cde0-04b3-25a7-27895c23e2d7",
    });
  })();
});
