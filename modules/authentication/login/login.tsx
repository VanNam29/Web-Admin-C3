import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../../types/type";
import { useRouter } from "next/router";
import { Checkbox } from "@material-ui/core";
import { useAuth } from "../../../utils/contexts/auth-context";
import Cookie from "js-cookie";
import firebase from "../../../utils/firebase";
import styles from "./login.module.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
interface PropsLogin {}

const initialInput: User = {
  id: "",
  email: "",
  password: "",
  emailForgotPassword: "",
};

const uiConfig = {
  signInSuccessUrl: "/customers",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

export const Login: FC<PropsLogin> = () => {
  const [invalid, setInvalid] = useState<boolean>(true);
  const [inputs, setInputs] = useState(initialInput);
  const [signIn, setSignIn] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [notifyResetPassword, setNotifyResetPassword] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const { login, resetPassword } = useAuth();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    resetValidate();
  }, [inputs]);

  const resetValidate = (): void => {
    if (
      inputs.email &&
      inputs.email.slice(inputs.email.length - 4, inputs.email.length) ===
        ".com"
    ) {
      setErrorEmail("");
    }
    if (inputs.password) {
      setErrorPassword("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      try {
        setLoading(true);
        await login(inputs.email, inputs.password);
        setIsAuth(true);
        router.push("/customers");
      } catch (error) {
        console.log("loi");
      }
    }
  };

  const validate = (): boolean => {
    //email
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      !inputs.email ||
      regEmail.test(inputs.email) === false ||
      inputs.email.slice(inputs.email.length - 5, inputs.email.length - 1) !==
        ".com"
    ) {
      setErrorEmail(
        "Please provide a properly formatted email address yourname@example.com"
      );
    }
    //password
    const regPassword =
      /^([!@#$%^&*](?=[^aeiou]{7,13}$)(?=[[:alnum:]]{7,13}$)(?=.*[A-Z]{1,}.*$).+)$/;
    if (!inputs.password || regPassword.test(inputs.password) === false) {
      setErrorPassword(
        "Password must be at least 8 characters, and include both lower and upper case characters, and include at least one number or symbol"
      );
    }
    if (errorPassword || errorEmail) {
      return false;
    }
    return true;
  };

  const handleSignInSignUp = (): void => {
    router.push("/register");
  };

  const handleForgotPassword = (): void => {
    setForgotPassword(true);
  };

  const handleShowPassword = (): void => {
    if (inputs.password) {
      setShowPassword(!showPassword);
    }
  };

  //Remember
  useEffect(() => {
    const tempEmail: any = Cookie.get("email") || "";
    setInputs((prev) => ({ ...prev, email: tempEmail }));
    setRemember(!!tempEmail);
  }, []);

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      Cookie.set("email", inputs.email, { expires: 999999999 });
    } else {
      Cookie.remove("email");
    }
    setRemember(e.target.checked);
  };

  const sendEmail = async (event) => {
    event.preventDefault();
    if (inputs.emailForgotPassword) {
      try {
        // setLoading(true);
        await resetPassword(inputs.emailForgotPassword);
        setNotifyResetPassword(
          "Send email successfully! Please check your email!"
        );
        setTimeout(() => {
          setForgotPassword(false);
          setInputs({
            emailForgotPassword: "",
          });
          setNotifyResetPassword("");
        }, 2000);
      } catch (error) {
        console.log("loi");
      }
    }
  };

  return (
    <>
      {forgotPassword ? (
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
                Forgot Password
              </h2>
              {notifyResetPassword ? (
                <p className="p-8 text-red-500">{notifyResetPassword}</p>
              ) : null}
            </div>
            <form className="w-full mobile:p-8 tablet:p-24">
              <div
                className={`${styles.txtName} p-8 mobile:h-62 tablet:h-78 mt-4`}
              >
                <p className="text-gray-700 leading-8">Send email*</p>
                <input
                  type="text"
                  name="emailForgotPassword"
                  placeholder=""
                  value={inputs.emailForgotPassword}
                  onChange={handleInputChange}
                  className={`${styles.input} float-left w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
                ></input>
              </div>

              <div className="w-full p-8">
                <button
                  className="w-full h-46 rounded-4 h-42 hover:bg-blue-800 focus:ring-1 focus:outline-none bg-blue-600 mt-12 
               text-white bg-blue-700"
                  onClick={sendEmail}
                >
                  SEND
                </button>
              </div>
            </form>
            <div className="text-center p-4 w-full">
              <a
                className=""
                onClick={() => setForgotPassword(false)}
                role="button"
              >
                Back
              </a>
            </div>
          </div>
        </div>
      ) : (
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
                Login
              </h2>
            </div>
            <form className="w-full mobile:p-8 tablet:p-24">
              <div className={`p-8 float-left w-full`}>
                <p className="text-gray-700">
                  Email<span className="text-red-400">*</span>
                </p>
                <input
                  type="text"
                  name="email"
                  value={inputs.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                  className={`${styles.input} w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
                ></input>
                {errorEmail ? (
                  <p className="text-14 leading-6 text-red-500">{errorEmail}</p>
                ) : null}
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
                  placeholder="Password"
                  value={inputs.password}
                  onChange={handleInputChange}
                  className={`${styles.input} w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
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
                {errorPassword ? (
                  <p className="text-14 leading-6 text-red-500">
                    {errorPassword}
                  </p>
                ) : null}
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
      )}
    </>
  );
};
