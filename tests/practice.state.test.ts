import { practiceMachine } from "../app/practice/machine";
import { interpret } from "xstate";

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
  const pmTest = interpret(mockPracticeMachine).onTransition((state) => {
    // console.log(state.value);
    if (state.matches("practiceSession.questionDisplayed")) {
      done();
    }
  });
  pmTest.start();
  pmTest.send("PRACTICE_STARTED");
});

it('should eventually reach "submissionEvaluationDisplayed"', (done) => {
  const pmTest = interpret(mockPracticeMachine).onTransition((state) => {
    if (state.matches("practiceSession.questionDisplayed")) {
      pmTest.send("ANSWER_SUBMITTED", { answer: 1 });
    }
    if (state.matches("practiceSession.submissionEvaluationDisplayed")) {
      done();
    }
  });
  pmTest.start();
  pmTest.send("PRACTICE_STARTED");
});