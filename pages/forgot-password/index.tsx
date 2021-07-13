import { FC } from "react";
import { ForgotPassword } from "../../modules/authentication/forgot-password/forgot-password";

interface PropsForgotPassword {}

const ForgotPage: FC<PropsForgotPassword> = () => {
  return <ForgotPassword />;
};

export default ForgotPage;
