import { useState } from "react";
import { FC } from "react";
import { User } from "../../../types/type";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../../utils/contexts/auth-context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface PropsRegister {
  signIn?: boolean;
  // handleSignIn?: (isSignIn: boolean) => void;
}

const initialInput: User = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  gender: "",
};

export const Register: FC<PropsRegister> = (props) => {
  const { signIn } = props;
  const [inputs, setInputs] = useState(initialInput);
  const [errorCreateAccount, setErrorCreateAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  //validate
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorGender, setErrorGender] = useState("");

  const { signUp, currentUser } = useAuth();
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
    setErrorCreateAccount("");
  }, [inputs]);

  const resetValidate = (): void => {
    if (inputs.username && inputs.username.length > 2) {
      setErrorUsername("");
    }
    // const regPassword =
    //   /^([!@#$%^&*](?=[^aeiou]{7,13}$)(?=[[:alnum:]]{7,13}$)(?=.*[A-Z]{1,}.*$).+)$/;
    if (inputs.password) {
      setErrorPassword("");
    }
    if (inputs.confirmPassword && inputs.confirmPassword === inputs.password) {
      setErrorConfirmPassword("");
    }
    if (
      inputs.email &&
      inputs.email.slice(inputs.email.length - 4, inputs.email.length) ===
        ".com"
    ) {
      setErrorEmail("");
    }
    if (inputs.gender) {
      setErrorGender("");
    }
  };

  const validate = (): boolean => {
    //username
    if (!inputs.username || inputs.username.length < 3) {
      setErrorUsername("Please fill in your name more than 3 characters");
    }

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

    //confirmPassword
    if (!inputs.confirmPassword || inputs.confirmPassword !== inputs.password) {
      setErrorConfirmPassword(
        "Confirmation password does not match new password"
      );
    }

    //gender
    if (!inputs.gender) {
      setErrorGender("Please option your gender");
    }

    if (
      errorUsername ||
      errorPassword ||
      errorConfirmPassword ||
      errorEmail ||
      errorGender
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      try {
        // setLoading(true);
        console.log(inputs.gender);

        await signUp(inputs.email, inputs.password);
        router.push("/login");
        alert("You have successfully registered");
      } catch {
        setErrorCreateAccount("Failed to create an account");
      }
    }
    setLoading(false);
  };

  const handleSignInSignUp = (): void => {
    router.push("/login");
  };

  const handleShowPassword = (): void => {
    if (inputs.password) {
      setShowPassword(!showPassword);
    }
  };

  const handleShowPasswordConfirm = (): void => {
    if (inputs.confirmPassword) {
      setShowPasswordConfirm(!showPasswordConfirm);
    }
  };

  return (
    <div
      className="bg-login w-screen h-screen flex items-center
    bg-gradient-to-r bg-cover bg-center"
    >
      <div
        className="float-left m-auto bg-white rounded-12 shadow-md 
                  mobile:w-5/6 tablet:w-1/2 laptop:w-1/3
                  desktop:w-1/4"
      >
        <div className="text-center">
          <h2 className="mobile:text-18 tablet:text-24 pt-8 font-bold">
            Register
          </h2>
          {errorCreateAccount ? (
            <p className="text-14 text-red-500">{errorCreateAccount}</p>
          ) : null}
        </div>
        <form className="w-full mobile:p-8 tablet:p-24">
          <div className={`p-8 w-full float-left`}>
            <p className="text-gray-700">
              Username<span className="text-red-400">*</span>
            </p>
            <input
              type="text"
              name="username"
              value={inputs.username}
              placeholder="Username"
              onChange={handleInputChange}
              className={`ring-blue-400 ring-1 focus:ring-blue-600 focus:ring-1 float-left w-full rounded-4 h-42  focus:outline-none pl-12 mt-4 `}
            ></input>
            {errorUsername ? (
              <p className="text-14 text-red-500 leading-6">{errorUsername}</p>
            ) : null}
          </div>

          <div className={`p-8 float-left w-full`}>
            <p className="text-gray-700 mt-8">
              Email<span className="text-red-400">*</span>
            </p>
            <input
              type="text"
              name="email"
              value={inputs.email}
              placeholder="Email"
              onChange={handleInputChange}
              className={`ring-blue-400 ring-1 float-left w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
            ></input>
            {errorEmail ? (
              <p className="text-14 leading-6 text-red-500">{errorEmail}</p>
            ) : null}
          </div>

          <div className={`p-8 mt-4 relative float-left w-full`}>
            <p className="text-gray-700">
              Password<span className="text-red-400">*</span>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={inputs.password}
              onChange={handleInputChange}
              className={`ring-blue-400 ring-1 float-left w-full rounded-4 h-42 
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
              <p className="text-14 leading-6 text-red-500">{errorPassword}</p>
            ) : null}
          </div>

          <div className={`p-8 mt-4 w-full float-left relative`}>
            <p className="text-gray-700">
              Confirm Password<span className="text-red-400">*</span>
            </p>
            <input
              type={showPasswordConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={inputs.confirmPassword}
              onChange={handleInputChange}
              className={`ring-blue-400 ring-1 float-left w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
            ></input>
            <div
              className="absolute top-12 right-4"
              role="button"
              onClick={handleShowPasswordConfirm}
            >
              {showPasswordConfirm ? (
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
            {errorConfirmPassword ? (
              <p className="text-14 leading-6 text-red-500">
                {errorConfirmPassword}
              </p>
            ) : null}
          </div>

          <span className="pl-8 text-gray-700 leading-8 float-left ">
            Gender<span className="text-red-400">*</span>
          </span>
          <div className="w-full p-8 w-full float-left ">
            <div className="flex">
              <div className="flex-1">
                <input
                  className="h-20 w-20"
                  type="radio"
                  onChange={handleInputChange}
                  value="male"
                  name="gender"
                />{" "}
                <span className="text-14 text-gray-600 p-2">Male</span>
              </div>
              <div className="flex-1">
                <input
                  className="h-20 w-20"
                  type="radio"
                  onChange={handleInputChange}
                  value="female"
                  name="gender"
                />{" "}
                <span className="text-14 text-gray-600 p-2">Female</span>
              </div>
              <div className="flex-1">
                <input
                  className="h-20 w-20"
                  type="radio"
                  value="other"
                  onChange={handleInputChange}
                  name="gender"
                />{" "}
                <span className="text-14 text-gray-600 p-2">Other</span>
              </div>
            </div>
            {errorGender ? (
              <p className="text-12 text-red-500 pl-8">{errorGender}</p>
            ) : null}
          </div>

          <div className="w-full p-8">
            <button
              disabled={loading}
              className="w-full h-46 rounded-4 h-42 focus:ring-1 focus:outline-none mt-12 
               text-white bg-blue-700 hover:bg-blue-800"
              onClick={handleSubmit}
            >
              REGISTER
            </button>
          </div>

          <div className="w-full text-center mt-4">
            <p className="font-medium">
              Already have an account?
              <a
                className="underline text-blue-600 hover:text-blue-800 mobile:block "
                onClick={handleSignInSignUp}
                role="button"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
