import { createMachine } from "xstate";

import { fetchAnswer, fetchQuestions, updateUserScore } from "../lib/data";
import { IQuestion } from "../lib/definitions";

type QuestionType = Omit<IQuestion, "correctAnswer"> & {
  userAnswer?: number;
  correctAnswer?: number;
};

interface PracticeContext {
  questions: QuestionType[];
  currentQuestionIndex: number;
  score: number;
  userId: string;
  error?: string; // Optionally add an error property to the context
}

export const createPracticeMachine = (userId: string, score: number) =>
  createMachine<PracticeContext>(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QAcBOBDAxgFwJabAFksALXAOzADpcIAbMAYgAUAlAQQGEAVASU4CiAfQDK3dq24CAIgG0ADAF1EKAPaxceVeRUgAHogCsAJgA0IAJ6IAjLeNUAnE4fzX1gGzuAHF4C+v8zQsPAJiTDJKKiCcfDAROA1tKgAzMGxwiihGCG1qCgA3VQBralT0kgBFAFc4LXJYBWUkEGR1TVxtXQMEABYvaypvAHZDHvkvAGZrLwdrcysEIaGJqiGepx6h+Q95IeM-AJaMGNDSCmpokLiEjvIUtIzyLLBUVFVUKLp0bGT3gFt7uVqrVbg0lLpWho6l1EH0BsNRuMpjM5pZELMvFR1k5dj1rPIXO5DP5AscrmEIhcybF4rBEncyo8oAJXu9GKwBNxWABNIQAMU5nAAEo0IW1oc1unt3FRjPIpk4fFN5IYJvNEF53ENHM59j4+kMPCSjsFYhTzlFqQRafTAUyWW9UIxOOwAHKCAAyouakPanUlNiGRKo1mMhnxPWM1iGXhV6oQmu1zgceq8BusxMOlzNZ0i2etNySAEcarA6tJcLBkF8LJBGG6RAB1ASsUQAVQAQoReNwpHJwT7xbcYQgtfIqASJrGg2HjMY+vG8TKM64ow4eu5Q95jfmiLmqaaC3TblQSyDtBWqzW666BI2hBU2wIxLwAPKuoQcx-PvvetRQ4cAwTLxtXkDd1wcdwJh6ExDCGeMJgcQxBjDbZVUgmNjHcHcrT3R4DxOa5j2LUty0rat0FrCAWA4Hh+GEPleFdXgRCFGQ-xaId-VAbpo2DUNwzAqMYzjNEEAmCZQNceRjCQ9xZnkiYcMPPDKUtFSbRPM8y1uS8KKomiuD4QQhA9AQ+W4DjfQlHibFk+wxigww00knYenjQxxllbEHGWZy52mZTCPNPNcM0pJYCqAAjP5K3pAR8nQOgqm+XTyOvaickiApilKB4SHYeoAHcXisridCA6wnCoCZwzgiS9hnEwPPWVYFKnaC5wmXYgvJfd1MI8K7kimK4tuBKkpSsir0ousXkdT5vl+VAAUZAritKgd-z9CrbN6fpBhAxFJmmWZ4y1BwsWcIlrE2Yw1mMXqc3wgariGqgRti4jyAm5LUovdLZuo2972-F930-AQwd-LbOIA7j9FhA6ETGE6UUXTxBk86S7o8PintOF7d3ez6xu0X6prSmaDLYIz6P5JiWLY-smm2mzEYQPjkIEiNhNjQx43unoqCOmTNwaokCdUi1icLYboq++LEr+6b9LrWm6JMsyLLK+Hdo5uFDpGVHkTOsT3H2HVFU8KNjEQpSs1wkKCLeuWqAYdB8jAThtGSXAVv+8g9IyxgzPYAA1YROHfRjWEIdjYeswC9q5kMw156N+cXECarWJxZMMC21il53XppN2Pa9n3yD9gPVZDsPI6EF13QED0zJZsU9ZHUMUyxeQnJcw13DAxc4NWbHpkmKNNQOUkVNL3dWDgKo6GwYOgcYEGhA14zhC-J8xAT1m4Z2kdmrEg7se2cYiRcTVM0OchVAgOAISd-cu7PoCAFp3LEn+2FHYL36rQBgX92a8UggMfoWFdhrEQnbNUl9gzJlTOmIB89gr9Vlt9CBycDb-wWN1TEAlXAwRIcXYB2CiZhTdmtTI+CEbdBTPGGYws87rmmGMXy4wS44Lod9O0ERmSslQEw-WvFyETmkpqAuYwNxsO8FdfOPg0wgSNNQvqtCNJu20vXIGEiRwbBFoYdczlIJygmPdRcvkRYjFXNKQ0Ux+E6MGm7Um30KaBw3lRIxlU7YTgcJJcM+w4IXQFubVqYEPByijPiAuri1K4NtJXb2vt-Z-B8YDPxg5u6VT6MLIkTklirlmPBMS4YBjzmcH5LwAUHBJJlrhZekU16+MgP4lOkEZSixcGGTy85BZLHsYM8WklJb+F8EAA */
      context: {
        questions: [],
        currentQuestionIndex: 0,
        score,
        userId,
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

        evaluateAnswer: async (context, event) => {
          // console.log(context, event);
          if ("data" in event) {
            if (event.data.answer === event.data.correct_answer) {
              context.score++;
              await updateUserScore(context.userId);
            }
          }
        },

        incrementQuestionIndex: (context) => {
          context.currentQuestionIndex++;
        },

        resetQuiz: (context) => {
          context.questions = [];
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

