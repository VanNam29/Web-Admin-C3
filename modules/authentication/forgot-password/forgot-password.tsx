import router from "next/router";
import { FC, useState } from "react";
import { User } from "../../../types/type";
import { useAuth } from "../../../utils/contexts/auth-context";
import { upperFirst, lowerCase, trim } from "lodash";
import { ModalCustom } from "../../../components/modal-custom/modal-custom";
import { ModalNotification } from "../../../components/modal-notification/modal-notification";

interface PropsForgotPassword {}

interface FormValues {
  emailForgotPassword: string;
}

function validateEmail(email: string) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
  return regex.test(String(email).toLocaleLowerCase());
}

export const ForgotPassword: FC<PropsForgotPassword> = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [values, setValues] = useState<FormValues>({
    emailForgotPassword: "",
  });
  const [errors, setErrors] = useState<FormValues>({
    emailForgotPassword: "",
  });
  const [notifyResetPassword, setNotifyResetPassword] = useState<string>("");
  const { resetPassword } = useAuth();

  const sendEmail = async (event) => {
    event.preventDefault();
    try {
      // setLoading(true);
      await resetPassword(values.emailForgotPassword);
      setOpenModal(true);
    } catch (error) {
      setNotifyResetPassword("Send email failed");
    }
  };

  const handleInputChange = (key: keyof FormValues, value: string) => {
    if (!trim(value)) {
      setErrors((prev) => ({
        ...prev,
        [key]: `Email is required`,
      }));
    } else if (key === "emailForgotPassword" && !validateEmail(trim(value))) {
      setErrors((prev) => ({
        ...prev,
        [key]: `Email formatted address yourname@example.com`,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBackLogin = () => {
    router.push("/login");
  };

  const closeModalNotification = () => {};

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
              Forgot Password
            </h2>
            {notifyResetPassword ? (
              <p className="p-8 text-red-500">{notifyResetPassword}</p>
            ) : null}
          </div>
          <form className="w-full mobile:p-8 tablet:p-24">
            <div className={`p-8 float-left mt-4 w-full`}>
              <p className="text-gray-700 leading-8">
                Send email<span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                placeholder=""
                value={values.emailForgotPassword}
                onChange={(e) =>
                  handleInputChange("emailForgotPassword", e.target.value)
                }
                className={`float-left w-full rounded-4 h-42 ring-1 ring-blue-400
                focus:ring-1 focus:outline-none pl-12 mt-4 focus:ring-blue-600`}
              ></input>
              <div className="text-red-500 h-4 text-16">
                {errors.emailForgotPassword}
              </div>
            </div>

            <div className="w-full p-8 float-left">
              <button
                className="w-full h-46 rounded-4 h-42 hover:bg-blue-800 focus:ring-1 focus:outline-none bg-blue-600 mt-12 
               text-white bg-blue-700"
                onClick={sendEmail}
              >
                Send
              </button>
            </div>
          </form>
          <div className="w-full float-left p-8">
            <div className="w-56 h-28 bg-black m-auto text-center rounded-4">
              <a className="text-white" onClick={handleBackLogin} role="button">
                Back
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ModalCustom selector="#portalNotification" isOpen={isOpenModal}>
          <ModalNotification
            closeModalNotification={closeModalNotification}
            forgotPassword={true}
          ></ModalNotification>
        </ModalCustom>
      </div>
    </>
  );
};
