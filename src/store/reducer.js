import { createStore } from "redux";

// 初始状态
const initialState = {
  token: null,
};

// reducer 函数
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "CLEAR_TOKEN":
      return { ...state, token: null };
    default:
      return state;
  }
};

// 创建 store
const store = createStore(authReducer);

export default store;
