import { interpret } from "xstate";
import { createPracticeMachine } from "./machine";

// TODO
const USER_ID = "";
const SCORE = 0;

const practiceMachine = createPracticeMachine(USER_ID, SCORE);

it('should eventually reach "questionDisplayed"', (done) => {
  const fetchService = interpret(practiceMachine).onTransition((state) => {
    // this is where you expect the state to eventually
    // be reached
    console.log("state ", state.value);
    if (state.matches("questionDisplayed")) {
      done();
    } else if (state.matches("fetchingError")) {
      done.fail("Reached fetchingError state, expected questionDisplayed.");
    }
  });

  fetchService.start();

  // send zero or more events to the service that should
  // cause it to eventually reach its expected state
  fetchService.send({ type: "PRACTICE_STARTED" });
});
