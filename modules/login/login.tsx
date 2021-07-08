import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../types/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Checkbox } from "@material-ui/core";
import { SignUp } from "./sign-up";
import { AuthProvider } from "../../utils/contexts/auth-context";
import { useAuth } from "../../utils/contexts/auth-context";
import firebase from "../../utils/firebase";
import styles from "./login.module.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  faFacebookSquare,
  faGooglePlusSquare,
} from "@fortawesome/free-brands-svg-icons";

interface PropsLogin {}

const initialInput: User = {
  id: "",
  email: "",
  password: "",
};

const uiConfig = {
  signInSuccessUrl: "/customers",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

export const Login: FC<PropsLogin> = () => {
  const [invalid, setInvalid] = useState(true);
  const [loginFail, setLoginFail] = useState(3);
  const [inputs, setInputs] = useState(initialInput);
  const [signIn, setSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { login } = useAuth();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await login(inputs.email, inputs.password);
      setIsAuth(true);
      router.push("/customers");
    } catch (error) {
      console.log("loi");
    }
  };

  const handleSignInSignUp = (): void => {
    setSignIn(false);
  };

  const handleSignIn = (): void => {
    setSignIn(true);
  };

  return (
    <div
      className="bg-login w-screen h-screen flex items-center
      bg-gradient-to-r bg-cover bg-center"
    >
      {signIn ? (
        <div
          className="float-left m-auto bg-white rounded-12 shadow-2xl
                  mobile:w-5/6 tablet:w-1/2 laptop:w-1/3
                  desktop:w-1/4"
        >
          <div className="text-center">
            <h2 className="mobile:text-18 mobile:h2-2 tablet:text-24  pt-16 font-bold">
              Login
            </h2>
            {!invalid ? (
              <p className="text-red-400 text-12">
                fields cannot be left blank
              </p>
            ) : null}
          </div>
          <form className="w-full mobile:p-8 tablet:p-24">
            <div className={`${styles.txtName} p-8 mobile:h-62 tablet:h-78`}>
              <input
                type="text"
                name="email"
                value={inputs.email}
                placeholder="Email"
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
              <div className="h-96 w-full">
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  className="h-96"
                  firebaseAuth={firebase.auth()}
                />
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
        <AuthProvider>
          <SignUp handleSignIn={handleSignIn} />
        </AuthProvider>
      )}
    </div>
  );
};
