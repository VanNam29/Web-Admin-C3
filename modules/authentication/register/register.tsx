import { useEffect, useState } from "react";
import { FC } from "react";
import { User } from "../../../types/type";
import { useAuth } from "../../../utils/contexts/auth-context";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { upperFirst, lowerCase, trim } from "lodash";
import { ModalCustom } from "../../../components/modal-custom/modal-custom";
import { ModalNotification } from "../../../components/modal-notification/modal-notification";
import Spinner from "react-spinner-material";

interface PropsRegister {}

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

function validateEmail(email: string) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
  return regex.test(String(email).toLocaleLowerCase());
}

function validatePassword(password) {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    password.length > 7
  );
}

export const Register: FC<PropsRegister> = (props) => {
  const [errorCreateAccount, setErrorCreateAccount] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [values, setValues] = useState<FormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  //validate
  const [errors, setErrors] = useState<FormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { signUp } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (key: keyof FormValues, value: string) => {
    if (!trim(value)) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(lowerCase(key))} is required`,
      }));
    } else if (key === "username" && value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(lowerCase(key))} must be at least 3 characters`,
      }));
    } else if (key === "email" && !validateEmail(trim(value))) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(
          lowerCase(key)
        )} formatted address yourname@example.com`,
      }));
    } else if (key === "password" && !validatePassword(trim(value))) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(
          lowerCase(key)
        )} must be at least 8 characters and include both lower and upper case characters and include at least one number or symbol`,
      }));
    } else if (key === "confirmPassword" && value !== values.password) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(lowerCase(key))} does not match new password`,
      }));
    } else if (key === "gender" && !value) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(lowerCase(key))} invalid`,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
      setErrorCreateAccount("");
    }
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signUp(values.email, values.password);
      setOpenModal(true);
    } catch {
      setErrorCreateAccount("Failed to create an account");
    }
  };

  const handleSignInSignUp = (): void => {
    router.push("/login");
  };

  const handleShowPassword = (): void => {
    if (values.password) {
      setShowPassword(!showPassword);
    }
  };

  const handleShowPasswordConfirm = (): void => {
    if (values.confirmPassword) {
      setShowPasswordConfirm(!showPasswordConfirm);
    }
  };

  const closeModalNotification = () => {};

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
                value={values.username}
                placeholder=""
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`float-left w-full rounded-4 h-42 focus:outline-none pl-12 mt-4 
                ${
                  errors.username
                    ? "ring-red-400 ring-2 focus:ring-red-600 focus:ring-2"
                    : "ring-blue-400 ring-1 focus:ring-blue-600 focus:ring-1"
                }`}
              ></input>
              <div className="text-red-500 h-2 text-16">{errors.username}</div>
            </div>

            <div className={`p-8 float-left w-full`}>
              <p className="text-gray-700 mt-12">
                Email<span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                value={values.email}
                placeholder=""
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`float-left w-full rounded-4 h-42 focus:outline-none pl-12 mt-4 
                ${
                  errors.email
                    ? "ring-red-400 ring-2 focus:ring-red-600 focus:ring-2"
                    : "ring-blue-400 ring-1 focus:ring-blue-600 focus:ring-1"
                }`}
              ></input>
              <div className="text-red-500 h-2 text-16">{errors.email}</div>
            </div>

            <div className={`p-8 relative float-left w-full`}>
              <p className="text-gray-700 mt-12">
                Password<span className="text-red-400">*</span>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                value={values.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`float-left w-full rounded-4 h-42 focus:outline-none pl-12 mt-4 
                ${
                  errors.password
                    ? "ring-red-400 ring-2 focus:ring-red-600 focus:ring-2"
                    : "ring-blue-400 ring-1 focus:ring-blue-600 focus:ring-1"
                }`}
              ></input>
              <div className="text-red-500 h-3 text-16">{errors.password}</div>
              <div
                className="absolute top-14 right-4"
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
            </div>

            <div className={`p-8 w-full float-left relative`}>
              <p className="text-gray-700 mt-12">
                Confirm Password<span className="text-red-400">*</span>
              </p>
              <input
                type={showPasswordConfirm ? "text" : "password"}
                placeholder=""
                value={values.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`float-left w-full rounded-4 h-42 focus:outline-none pl-12 mt-4 
                ${
                  errors.confirmPassword
                    ? "ring-red-400 ring-2 focus:ring-red-600 focus:ring-2"
                    : "ring-blue-400 ring-1 focus:ring-blue-600 focus:ring-1"
                }`}
              ></input>
              <div
                className="absolute top-14 right-4"
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
              <div className="text-red-500 h-2 text-16">
                {errors.confirmPassword}
              </div>
            </div>

            <span className="pl-8 text-gray-700 leading-8 float-left mt-12">
              Gender<span className="text-red-400">*</span>
            </span>
            <div className="w-full p-8 w-full float-left ">
              <div className="flex">
                <div className="flex-1">
                  <input
                    className="h-20 w-20"
                    type="radio"
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    value="male"
                    name="gender"
                  />{" "}
                  <span className="text-14 text-gray-600 p-2">Male</span>
                </div>
                <div className="flex-1">
                  <input
                    className="h-20 w-20"
                    type="radio"
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
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
                    name="gender"
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                  />{" "}
                  <span className="text-14 text-gray-600 p-2">Other</span>
                </div>
              </div>
              <div className="text-red-500 h-2 text-16">{errors.gender}</div>
            </div>

            <div className="w-full p-8">
              <button
                disabled={loading}
                className="w-full h-46 rounded-4 h-42 focus:ring-1 focus:outline-none mt-12 
               text-white bg-blue-700 hover:bg-blue-800"
                onClick={handleSubmit}
              >
                Register
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
      <div>
        <ModalCustom selector="#portalNotification" isOpen={isOpenModal}>
          <ModalNotification
            closeModalNotification={closeModalNotification}
          ></ModalNotification>
        </ModalCustom>
      </div>
    </>
  );
};
