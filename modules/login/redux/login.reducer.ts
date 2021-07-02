import {
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
} from "../../../constants/constants";
import { toast } from "react-toastify";

const initialState:Object = {
  isAuthenticated: 3,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS: {
      toast.success("login success");
      return {
        ...state,
        isAuthenticated: 1,
      };
    }
    case FETCH_USER_ERROR: {
      // toast.warn("login fail");
      return {
        ...state,
        isAuthenticated: 2,
      };
    }
    default: {
      return state;
    }
  }
};
