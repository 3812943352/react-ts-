import { RESET_CATCH, SET_CATCH } from "../../utils/actionTypes";

interface catchKeyState {
  catchKey: string | null | undefined;
}

const catchKeyState: catchKeyState = {
  catchKey: null,
};

const catchReducer = (
  state = catchKeyState,
  action: { type: string; payload?: string },
): catchKeyState => {
  switch (action.type) {
    case SET_CATCH:
      return {
        ...state,
        catchKey: action.payload ?? null,
      };
    case RESET_CATCH:
      return {
        ...state,
        catchKey: null,
      };
    default:
      return state;
  }
};

export default catchReducer;
