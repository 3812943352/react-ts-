/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-21 10:15:42
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-12 15:04:21
 * @FilePath: src/store/user/catchReducer.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
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
