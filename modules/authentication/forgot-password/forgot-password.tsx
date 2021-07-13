import router from "next/router";
import { FC, useState } from "react";
import { User } from "../../../types/type";
import { useAuth } from "../../../utils/contexts/auth-context";
import styles from "./forgot-password.module.css";

interface PropsForgotPassword {}

const initialInput: User = {
  emailForgotPassword: "",
};

export const ForgotPassword: FC<PropsForgotPassword> = () => {
  const [inputs, setInputs] = useState(initialInput);
  const [notifyResetPassword, setNotifyResetPassword] = useState<string>("");
  const { resetPassword } = useAuth();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
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

  const handleBackLogin = () => {
    router.push("/login");
  };

  return (
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
          <div className={`p-8 mobile:h-62 tablet:h-78 mt-4`}>
            <p className="text-gray-700 leading-8">Send email*</p>
            <input
              type="text"
              name="emailForgotPassword"
              placeholder="Email"
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
          <a className="" onClick={handleBackLogin} role="button">
            Back
          </a>
        </div>
      </div>
    </div>
  );
};
