/*
 * @Author: wb
 * @Date: 2024-11-20 20:26:07
 * @LastEditors: wb
 * @LastEditTime: 2024-11-20 20:27:41
 * @FilePath: \demo\src\store\user\reducer.tsx
 * @Description: 请填写简介
 */
import {
  SET_TOKEN,
  RESET_TOKEN,
  SET_CATCH,
  RESET_CATCH,
} from "../../utils/actionTypes";

interface TokenState {
  token: string | null;
}
interface catchKeyState {
  catchKey: string | null;
}

const initialState: TokenState = {
  token: null,
};

const catchKeyState: catchKeyState = {
  catchKey: null,
};
const tokenReducer = (
  state = initialState,
  action: { type: string; payload?: string },
): TokenState => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload ?? null,
      };
    case RESET_TOKEN:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
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

export default tokenReducer;
