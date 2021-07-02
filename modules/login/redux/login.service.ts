import { fetchUserSuccess, fetchUserError } from "./login.action";
import http from "./http-login";
import { User } from "../../../types/type";

export const loginUser = (checkUser: User) => async (dispatch) => {
  try {
    const res = await http.get("/users");
    console.log("res", res.data);

    let check: boolean = false;
    res.data.map((user: User) => {
      if (
        user.username === checkUser.username &&
        user.password === checkUser.password
      ) {
        check = true;
      }
    });

    if (check) {
      dispatch(fetchUserSuccess(res.data));
    } else {
      dispatch(fetchUserError());
    }
  } catch (error) {
    console.log(error);
  }
};

// export const loginUser = () => async (dispatch) => {
//   try {
//     const res = await http.get("/users");

//     dispatch(loginUser());
//   } catch (error) {
//     console.log(error);
//   }
// };
