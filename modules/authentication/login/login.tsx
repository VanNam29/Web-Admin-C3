import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Checkbox } from "@material-ui/core";
import { useAuth } from "../../../utils/contexts/auth-context";
import Cookie from "js-cookie";
import firebase from "../../../utils/firebase";
import styles from "./login.module.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { upperFirst, lowerCase, trim } from "lodash";
import Spinner from "react-spinner-material";
interface PropsLogin {}

interface FormValues {
  email: string;
  password: string;
}

export const Login: FC<PropsLogin> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<string>("");
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const { login } = useAuth();

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: "/customers",
  };
  const handleInputChange = (key: keyof FormValues, value: string) => {
    if (!trim(value)) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(lowerCase(key))} is required`,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
      setIsAuth("");
    }
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(values.email, values.password);
      setIsAuth("");
      router.push("/customers");
    } catch (error) {
      setIsAuth("The username or password you enter is invalid");
    }
  };

  const handleSignInSignUp = (): void => {
    router.push("/register");
  };

  const handleShowPassword = (): void => {
    if (values.password) {
      setShowPassword(!showPassword);
    }
  };

  //Remember
  useEffect(() => {
    const tempEmail: any = Cookie.get("email") || "";
    setValues((prev) => ({ ...prev, email: tempEmail }));
    setRemember(!!tempEmail);
  }, []);

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      debugger;
      Cookie.set("email", values.email, { expires: 999999999 });
    } else {
      debugger;
      Cookie.remove("email");
    }
    setRemember(e.target.checked);
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  if (loading)
    return (
      <div className="h-screen w-screen">
        <div className="w-56 h-48 m-auto mt-48">
          <Spinner
            size={240}
            spinnerColor={"#F37A24"}
            spinnerWidth={2}
            visible={true}
            radius={40}
            color={"#F37A24"}
            stroke={5}
          />
        </div>
      </div>
    );

  return (
    <>
      <div
        className="bg-login w-screen h-screen flex items-center
            bg-gradient-to-r bg-cover bg-center"
      >
        <div
          className="float-left m-auto bg-white rounded-12 shadow-2xl
                  mobile:w-5/6 tablet:w-1/2 laptop:w-1/3
                  desktop:w-1/4"
        >
          <div className="text-center">
            <h2 className="mobile:text-18 mobile:h2-2 tablet:text-24  pt-16 font-bold">
              Log in
            </h2>
            {isAuth ? (
              <p className="text-red-400 pl-24 pr-24">{isAuth}</p>
            ) : null}
          </div>
          <form className="w-full mobile:p-8 tablet:p-24">
            <div className={`p-8 float-left w-full`}>
              <p className="text-gray-700">
                Email<span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                name="email"
                value={values.email}
                placeholder=""
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`float-left w-full rounded-4 h-42 focus:outline-none pl-12 mt-4 ring-blue-400 ring-1 focus:ring-blue-600 focus:ring-1"`}
              ></input>
              <div className="text-red-500 h-2 text-16">{errors.email}</div>
            </div>
            <div
              className={`${styles.txtName} p-8 mt-12 w-full relative float-left`}
            >
              <p className="text-gray-700">
                Password<span className="text-red-400">*</span>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                name={showPassword ? "text" : "password"}
                placeholder=""
                value={values.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`float-left w-full rounded-4 h-42 focus:outline-none pl-12 mt-4 ring-blue-400 ring-1 focus:ring-blue-600 focus:ring-1"`}
              ></input>
              <div
                className="absolute top-12 right-4"
                role="button"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="text-20 text-gray-400"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-20 text-gray-500"
                  />
                )}
              </div>
              <div className="text-red-500 h-3 text-16">{errors.password}</div>
            </div>
            <div className="tablet:flex mt-24 w-full">
              <div className="tablet:flex-1 -ml-4">
                <Checkbox
                  className=""
                  onChange={handleChangeCheckbox}
                  checked={remember}
                ></Checkbox>
                <span className="text-14 font-medium">Remember Me</span>
              </div>
              <div className="tablet:flex-1">
                <a
                  className="text-blue-600 hover:text-blue-800 text-14 mobile:float-left mobile:ml-8 mobile:mt-0 tablet:float-right tablet:mt-10 tablet:mr-8 underline "
                  role="button"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="w-full p-8">
              <button
                className="w-full h-46 rounded-4 h-42 hover:bg-blue-800 focus:ring-1 focus:outline-none bg-blue-600 mt-12 
                text-white bg-blue-700"
                onClick={handleSubmit}
              >
                Login
              </button>
              <div className="text-center pt-24">
                <p className="text-gray-400">Or login with</p>
              </div>
              <div className="w-full">
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  className=""
                  firebaseAuth={firebase.auth()}
                />
              </div>
            </div>
            <div className="w-full text-center mt-4">
              <span className="font-medium">
                Don't have an account?
                <a
                  className="underline text-blue-600 hover:text-blue-800 mobile:block"
                  onClick={handleSignInSignUp}
                  role="button"
                >
                  Register
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
