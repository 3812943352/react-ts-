/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 20:26:07
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-16 10:05:05
 * @FilePath: src/store/user/tokenReducer.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { RESET_TOKEN, SET_TOKEN } from "../../utils/actionTypes";

interface TokenState {
  token: string | null;
}

interface catchKeyState {
  catchKey: string | null | undefined;
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

export default tokenReducer;
