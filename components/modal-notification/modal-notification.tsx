import { FC } from "react";
import styles from "./modal-notification.module.css";
import { useRouter } from "next/router";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalNotificationProps {
  closeModalNotification?: () => void;
  forgotPassword?: boolean;
}

export const ModalNotification: FC<ModalNotificationProps> = (props) => {
  const { forgotPassword, closeModalNotification } = props;
  const router = useRouter();

  const handleClick = (): void => {
    closeModalNotification();
    router.push("/login");
  };

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={`${styles.modal} rounded-8  text-center`}>
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="text-56 text-green-400"
        />
        {forgotPassword ? (
          <p className="text-24 text-green-500 font-bold mt-8">
            Send email successfully!
          </p>
        ) : (
          <p className="text-24 text-green-500 font-bold mt-8">
            Register successfully!
          </p>
        )}
        <div className={`${styles.footer} mt-12 mobile:w-full`}>
          <button
            className="h-42 bg-green-400 rounded-4 text-white mr-4 focus:outline-none text-18 hover:bg-green-500 p-4"
            role="button"
            onClick={handleClick}
          >
            Go to login
          </button>
        </div>
      </div>
    </>
  );
};
