/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-12 14:56:22
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-12 15:09:49
 * @FilePath: src/store/user/userReducer.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { RESET_USER, SET_USER } from "@/utils/actionTypes.tsx";

interface UserState {
  user: string | null;
}
const initialState: UserState = {
  user: null,
};

const userReducer = (
  state = initialState,
  action: { type: string; payload?: string },
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload ?? null,
      };
    case RESET_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
