import { FC } from "react";
import { Register } from "../../modules/authentication/register/register";

interface PropsRegister {}

const RegisterPage: FC<PropsRegister> = () => {
  return <Register />;
};

export default RegisterPage;
