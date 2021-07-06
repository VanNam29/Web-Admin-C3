import { useEffect } from "react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../types/type";
import styles from "./login.module.css";
// import { LoginUser } from "./redux/login.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginUser } from "./redux/login.service";
import { useRouter } from "next/router";
import { Checkbox } from "@material-ui/core";
import {
  faFacebookSquare,
  faGooglePlusSquare,
} from "@fortawesome/free-brands-svg-icons";
import { SignUp } from "./sign-up";

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
  const [signIn, setSignIn] = useState(true);
  const isAuthenticated: number = useSelector(
    (state: any) => state.users.isAuthenticated
  );

  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleSignInSignUp = (): void => {
    setSignIn(false);
  };

  const handleSignIn = (): void => {
    setSignIn(true);
  };

  if (isAuthenticated === 1) {
    router.push("/customers");
  }

  return (
    <div
      className="bg-gray-200 w-screen h-screen flex items-center
      bg-gradient-to-r from-blue-200 via-indigo-400 to-pink-400"
    >
      {signIn ? (
        <div
          className="float-left m-auto bg-white rounded-12 shadow-md 
                  mobile:w-5/6 tablet:w-1/2 laptop:w-1/3
                  desktop:w-1/4"
        >
          <div className="text-center">
            <h2 className="mobile:text-18 mobile:h2-2 tablet:text-24  pt-16 font-bold">
              Login
            </h2>
            {/* {loginFail === 2 ? <p>Login sai</p> : null} */}
            {!invalid ? (
              <p className="text-red-400 text-12">
                fields cannot be left blank
              </p>
            ) : null}
          </div>
          <form className="w-full mobile:p-8 tablet:p-24">
            <div className={`${styles.txtName} p-8 mobile:h-62 tablet:h-78`}>
              {/* <label className="float-left mobile:text-14 tablet:text-16 w-full text-black font-medium">
              Username
              <span className="text-red-500 text-16">*</span>
            </label> */}
              <input
                type="text"
                name="username"
                value={inputs.username}
                placeholder="Username"
                onChange={handleInputChange}
                className={`${styles.input} float-left w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
              ></input>
            </div>
            <div
              className={`${styles.txtName} p-8 mobile:h-62 tablet:h-78 mt-4`}
            >
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={inputs.password}
                onChange={handleInputChange}
                className={`${styles.input} float-left w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
              ></input>
            </div>
            <div className="tablet:flex">
              <div className="tablet:flex-1 -ml-4">
                <Checkbox></Checkbox>
                <span className="text-14 font-medium">Remember Me</span>
              </div>
              <div className="tablet:flex-1">
                <a
                  className="text-blue-700 text-14 mobile:float-left mobile:ml-8 mobile:mt-0 tablet:float-right tablet:mt-10 tablet:mr-8 underline "
                  role="button"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="w-full p-8">
              <button
                className="w-full h-46 rounded-4 h-42 focus:ring-1 focus:outline-none bg-blue-700 mt-12 
               text-white bg-gradient-to-r from-blue-400 via-indigo-500 to--500"
                onClick={handleSubmit}
              >
                LOGIN
              </button>
              <div className="text-center pt-24">
                <p className="text-gray-400">Or login with</p>
              </div>
              <div className="tablet:flex pt-12">
                <button className="tablet:flex-1 text-blue-500 border-solid border-2 border-blue-500 rounded-4 h-42 mr-4">
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    className="text-24"
                  />
                  <span className="p-4">Facebook</span>
                </button>
                <button className="tablet:flex-1 text-red-500 border-solid border-2 border-red-500 rounded-4 h-42 ml-4">
                  <FontAwesomeIcon
                    icon={faGooglePlusSquare}
                    className="text-24"
                  />
                  <span className="p-4">Google</span>
                </button>
              </div>
            </div>
            <div className="w-full text-center mt-4">
              <span className="font-medium">
                Don't have an account?
                <a
                  className="underline text-blue-500 mobile:block"
                  onClick={handleSignInSignUp}
                  role="button"
                >
                  Sign up
                </a>
              </span>
            </div>
          </form>
        </div>
      ) : (
        <SignUp handleSignIn={handleSignIn} />
      )}
    </div>
  );
};
