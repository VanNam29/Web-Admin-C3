import { useState } from "react";
import { FC } from "react";
import { User } from "../../types/type";
import styles from "./login.module.css";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../utils/contexts/auth-context";
import { useRouter } from "next/router";

interface PropsSignUp {
  signIn?: boolean;
  handleSignIn?: (isSignIn: boolean) => void;
}

const initialInput: User = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  gender: "male",
};

export const SignUp: FC<PropsSignUp> = (props) => {
  const { signIn, handleSignIn } = props;
  const [inputs, setInputs] = useState(initialInput);
  const [errorConfirmPassword, setErrorConfirmPassWord] = useState("");
  const [errorCreateAccount, setErrorCreateAccount] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp, currentUser } = useAuth();
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
    const newAccount = {
      id: uuidv4(),
      email: inputs.email,
      username: inputs.username,
      password: inputs.password,
      gender: inputs.gender,
    };
    // console.log("acc", newAccount);

    if (inputs.password !== inputs.confirmPassword) {
      setErrorConfirmPassWord("Password do not match");
    }
    try {
      setErrorConfirmPassWord("");
      setLoading(true);
      await signUp(inputs.email, inputs.password);
      router.push("/login");
      handleSignIn(false);
    } catch {
      setErrorCreateAccount("Failed to create an account");
    }
    setLoading(false);
  };

  const handleSignInSignUp = (): void => {
    handleSignIn(false);
  };

  return (
    <div
      className="float-left m-auto bg-white rounded-12 shadow-md 
                  mobile:w-5/6 tablet:w-1/2 laptop:w-1/3
                  desktop:w-1/4"
    >
      <div className="text-center">
        <h2 className="mobile:text-18 mobile:h2-2 tablet:text-24 pt-16 font-bold">
          SignUp
        </h2>
        {/* <p>{JSON.stringify(currentUser)}</p> */}
      </div>
      <form className="w-full mobile:p-8 tablet:p-24">
        <div className={`${styles.txtName} p-8 mobile:h-62 tablet:h-78`}>
          <input
            type="text"
            name="email"
            value={inputs.email}
            placeholder="Email*"
            onChange={handleInputChange}
            className={`${styles.input} float-left w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
          ></input>
        </div>
        <div className={`${styles.txtName} p-8 mobile:h-62 tablet:h-78`}>
          <input
            type="text"
            name="username"
            value={inputs.username}
            placeholder="Username*"
            onChange={handleInputChange}
            className={`${styles.input} float-left w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
          ></input>
        </div>
        <div className={`${styles.txtName} p-8 mobile:h-62 tablet:h-78 mt-4`}>
          <input
            type="password"
            name="password"
            placeholder="Password*"
            value={inputs.password}
            onChange={handleInputChange}
            className={`${styles.input} float-left w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
          ></input>
        </div>
        <div className={`${styles.txtName} p-8 mobile:h-62 tablet:h-78 mt-4`}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="ConfirmPassword*"
            value={inputs.confirmPassword}
            onChange={handleInputChange}
            className={`${styles.input} float-left w-full rounded-4 h-42 
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
          ></input>
        </div>

        <span className="pl-8 text-gray-700">Gender*</span>
        <div className="flex p-8">
          <div className="flex-1">
            <input
              className="h-20 w-20"
              type="radio"
              onChange={handleInputChange}
              value="male"
              name="gender"
            />{" "}
            <span className="text-14 text-gray-600">Male</span>
          </div>
          <div className="flex-1">
            <input
              className="h-20 w-20"
              type="radio"
              onChange={handleInputChange}
              value="female"
              name="gender"
            />{" "}
            <span className="text-14 text-gray-600">Female</span>
          </div>
          <div className="flex-1">
            <input
              className="h-20 w-20"
              type="radio"
              value="other"
              onChange={handleInputChange}
              name="gender"
            />{" "}
            <span className="text-14 text-gray-600">Other</span>
          </div>
        </div>

        <div className="w-full p-8">
          <button
            disabled={loading}
            className="w-full h-46 rounded-4 h-42 focus:ring-1 focus:outline-none bg-blue-700 mt-12 
               text-white bg-gradient-to-r from-blue-400 via-indigo-500 to--500"
            onClick={handleSubmit}
          >
            SIGN UP
          </button>
        </div>

        <div className="w-full text-center mt-4">
          <span className="font-medium">
            Already have an account?
            <a
              className="underline text-blue-500 mobile:block"
              onClick={handleSignInSignUp}
              role="button"
            >
              Sign in
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};
