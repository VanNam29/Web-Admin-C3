import { FC } from "react";
import { Login } from "../../modules/authentication/login/login";

interface PropsLogin {}

const LoginPage: FC<PropsLogin> = () => {
  return <Login />;
};

export default LoginPage;
