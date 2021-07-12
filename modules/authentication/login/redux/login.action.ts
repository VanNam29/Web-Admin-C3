import {
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  LOGIN_USER,
} from "../../../../constants/constants";
import { User } from "../../../../types/type";

export const fetchUserSuccess = (user: User) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};
export const fetchUserError = () => {
  return {
    type: FETCH_USER_ERROR,
  };
};

export const LoginUser = (user: User) => {
  return {
    type: LOGIN_USER,
    payload: user,
  };
};
