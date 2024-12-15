/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-12 16:48:19
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-13 11:06:24
 * @FilePath: src/store/user/outhListReducer.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import {
  RESET_OUTH_List,
  SET_OUTH_List,
} from "@/utils/actionTypes.tsx";

interface OuthListState {
  outhList: [string] | null;
}
const initialState: OuthListState = {
  outhList: null,
};

const outhListReducer = (
  state = initialState,
  action: {
    type: string;
    payload?: [string];
  },
): OuthListState => {
  switch (action.type) {
    case SET_OUTH_List:
      return {
        ...state,
        outhList: action.payload ?? null,
      };
    case RESET_OUTH_List:
      return {
        ...state,
        outhList: null,
      };
    default:
      return state;
  }
};

export default outhListReducer;
