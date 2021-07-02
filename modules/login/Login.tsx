import { useEffect } from "react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../types/type";
import styles from "./login.module.css";
// import { LoginUser } from "./redux/login.action";
import { loginUser } from "./redux/login.service";
import { useRouter } from "next/router";
import { Checkbox } from "@material-ui/core";

interface PropsLogin {}

const initialInput: User = {
  id: "",
  username: "",
  password: "",
};

export const Login: FC<PropsLogin> = () => {
  const [invalid, setInvalid] = useState(true);
  const [loginFail, setLoginFail] = useState(3);
  const [inputs, setInputs] = useState(initialInput);
  const isAuthenticated: number = useSelector(
    (state: any) => state.users.isAuthenticated
  );
  const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   if (isAuthenticated === 2) {
  //     setLoginFail(2);
  //   }
  // });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (event): void => {
    event.preventDefault();
    if (!inputs.username || !inputs.password) {
      setInvalid(false);
      setLoginFail(3);
    } else {
      const userCheck = {
        username: inputs.username,
        password: inputs.password,
      };

      const action = loginUser(userCheck);
      dispatch(action);
      setInvalid(true);
    }
  };

  if (isAuthenticated === 1) {
    router.push("/customers");
  }

  return (
    <div className="bg-gray-200 w-screen h-screen flex items-center">
      <div
        className="float-left m-auto bg-white rounded-12 shadow-md 
                  mobile:w-5/6 mobile:h-55/100 tablet:w-1/2 tablet:h-3/5 laptop:w-1/3 laptop:h-3/5 desktop:w-1/4 desktop:h-55/100"
      >
        <div className="text-center">
          <p className="mobile:text-18 mobile:p-2 tablet:text-24  mt-8 font-bold">
            Login
          </p>
          {/* {loginFail === 2 ? <p>Login sai</p> : null} */}
          {!invalid ? (
            <p className="text-red-400 text-12">fields cannot be left blank</p>
          ) : null}
        </div>
        <form className="w-full mobile:p-8 tablet:p-24">
          <div className={`${styles.txtName} p-8 mobile:h-62 tablet:h-78`}>
            <label className="float-left mobile:text-14 tablet:text-16 w-full text-black font-medium">
              Username
              <span className="text-red-500 text-16">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleInputChange}
              className={`${styles.input} float-left w-full rounded-4 h-42 focus:ring-1 focus:outline-none pl-8 mt-4`}
            ></input>
          </div>
          <div
            className={`${styles.txtName} p-8 mobile:h-62 tablet:h-78 mt-12`}
          >
            <label className="float-left mobile:text-14 tablet:text-16 w-full text-black font-medium">
              Password<span className="text-red-500 text-16">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              className={`${styles.input} float-left w-full rounded-4 h-42 focus:ring-1 focus:outline-none pl-8 mt-4`}
            ></input>
          </div>
          <div className="tablet:flex">
            <div className="tablet:flex-1 -ml-4">
              <Checkbox></Checkbox>
              <span className="text-14 font-medium">Remember Me</span>
            </div>
            <div className="tablet:flex-1">
              <a
                className="text-blue-500 text-14 mobile:float-left mobile:ml-8 mobile:mt-0 tablet:float-right tablet:mt-10 tablet:mr-8 underline "
                role="button"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="w-full p-8">
            <button
              className=" w-full h-42 rounded-4 h-42 focus:ring-1 focus:outline-none bg-blue-700 mt-12 text-white"
              onClick={handleSubmit}
            >
              Login
            </button>
            <button className="w-full rounded-4 h-42 mt-16 focus:outline-none bg-white text-black border-solid border-2 border-light-blue-600 hover:bg-gray-400 hover:text-white">
              Login with Google
            </button>
          </div>
          <div className="w-full text-center mt-4">
            <span className="font-medium">
              Don't have an account?{" "}
              <a className="underline text-blue-500 mobile:block" role="button">
                Sign up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
