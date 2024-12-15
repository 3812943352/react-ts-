/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-12 14:56:45
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-12 15:09:49
 * @FilePath: src/store/user/outhReducer.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { RESET_OUTH, SET_OUTH } from "@/utils/actionTypes.tsx";

interface OuthState {
  outh: string | null;
}
const initialState: OuthState = {
  outh: null,
};

const outhReducer = (
  state = initialState,
  action: { type: string; payload?: string },
): OuthState => {
  switch (action.type) {
    case SET_OUTH:
      return {
        ...state,
        outh: action.payload ?? null,
      };
    case RESET_OUTH:
      return {
        ...state,
        outh: null,
      };
    default:
      return state;
  }
};

export default outhReducer;
