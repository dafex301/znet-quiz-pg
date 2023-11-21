import { createMachine } from "xstate";

import { fetchAnswer, fetchQuestions } from "@/app/lib/data";
import { IQuestion } from "../lib/definitions";

// export interface QuestionType {
//   id: string;
//   text: string;
//   options: string[];
//   correctAnswer: number;
//   userAnswer?: number;
// }

type QuestionType = Omit<IQuestion, "correctAnswer"> & {
  userAnswer?: number;
  correctAnswer?: number;
};

interface PracticeContext {
  questions: QuestionType[];
  currentQuestionIndex: number;
  score: number;
  error?: string; // Optionally add an error property to the context
}

export const practiceMachine = createMachine<PracticeContext>(
  {
    context: {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
    },
    id: "practiceMachine",
    initial: "idle",
    states: {
      idle: {
        id: "idle",
        on: {
          PRACTICE_STARTED: {
            target: "practiceSession.fetching",
          },
        },
      },
      practiceSession: {
        initial: "fetching",
        states: {
          fetching: {
            invoke: {
              id: "fetchQuestions",
              src: "fetchQuestionsService",
              onDone: {
                target: "questionDisplayed",
                actions: "setQuestions",
              },
              onError: {
                target: "fetchingError",
                actions: "handleError",
              },
            },
          },
          fetchingError: {
            on: {
              RETRY_FETCH: {
                target: "fetching",
              },
              CANCEL: {
                target: "#practiceMachine.idle",
              },
            },
          },
          questionDisplayed: {
            id: "questionDisplayed",
            on: {
              ANSWER_SUBMITTED: {
                target: "submissionEvaluationDisplayed",
                // actions: "evaluateAnswer",
              },
              NEW_QUESTION_REQUESTED: {
                target: "questionDisplayed",
                cond: "hasMoreQuestions",
                actions: "incrementQuestionIndex",
              },
              PRACTICE_FINISHED: {
                target: "#practiceMachine.practiceResultDisplayed",
              },
              PRACTICE_LEFT: {
                target: "leaveConfirmationDisplayed",
              },
            },
          },
          submissionEvaluationDisplayed: {
            id: "submissionEvaluationDisplayed",
            invoke: {
              id: "fetchAnswer",
              src: "fetchAnswerService",
              onDone: {
                actions: "evaluateAnswer",
              },
              onError: {
                target: "fetchingError",
                actions: "handleError",
              },
            },
            on: {
              NEW_QUESTION_REQUESTED: {
                target: "questionDisplayed",
                cond: "hasMoreQuestions",
                actions: "incrementQuestionIndex",
              },
              PRACTICE_FINISHED: {
                target: "#practiceMachine.practiceResultDisplayed",
              },
              PRACTICE_LEFT: {
                target: "leaveConfirmationDisplayed",
              },
            },
          },
          leaveConfirmationDisplayed: {
            id: "leaveConfirmationDisplayed",
            on: {
              LEAVE_CONFIRMED: {
                target: "#practiceMachine.idle",
                actions: "resetQuiz",
              },
              LEAVE_CANCELLED: {
                target: "questionDisplayed",
              },
            },
          },
        },
      },
      practiceResultDisplayed: {
        id: "practiceResultDisplayed",
        on: {
          NEW_PRACTICE_REQUESTED: {
            target: "practiceSession.fetching",
            actions: "resetQuiz",
          },
        },
      },
    },
    schema: {
      events: {} as
        | { type: "PRACTICE_STARTED" }
        | { type: "ANSWER_SUBMITTED"; answer: number }
        | { type: "NEW_QUESTION_REQUESTED" }
        | { type: "PRACTICE_FINISHED" }
        | { type: "PRACTICE_LEFT" }
        | { type: "LEAVE_CONFIRMED" }
        | { type: "LEAVE_CANCELLED" }
        | { type: "NEW_PRACTICE_REQUESTED" }
        | { type: "RETRY_FETCH" }
        | { type: "CANCEL" },
      context: {} as PracticeContext,
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      setQuestions: (context, event) => {
        context.questions = event.data;
        context.error = undefined; // Reset the error if there was one before
      },

      handleError: (context, event) => {
        context.error = event.data; // Assume the error is in event.data; adjust as needed
      },

      evaluateAnswer: (context, event) => {
        if ("data" in event) {
          context.questions[context.currentQuestionIndex].userAnswer =
            event.data.answer;
          context.questions[context.currentQuestionIndex].correctAnswer =
            event.data.correct_answer;
          if (event.data.answer === event.data.correct_answer) {
            context.score++;
          }
        }
      },

      incrementQuestionIndex: (context) => {
        context.currentQuestionIndex++;
      },

      resetQuiz: (context) => {
        context.questions = [];
        context.score = 0;
        context.currentQuestionIndex = 0;
        context.error = undefined;
      },
    },
    services: {
      fetchQuestionsService: async (context, event) => await fetchQuestions(),
      fetchAnswerService: async (context, event) => {
        const correct_answer = await fetchAnswer(event.questionId);
        return { answer: event.answer, correct_answer };
      },
    },
    guards: {
      hasMoreQuestions: (context) => {
        return context.currentQuestionIndex < context.questions.length - 1;
      },
    },
  }
);
