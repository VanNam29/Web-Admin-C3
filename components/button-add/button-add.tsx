import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import styles from "./button-add.module.css";

interface ButtonAddProps {
  handleAdd: () => void;
}

export const ButtonAdd: FC<ButtonAddProps> = (props) => {
  const { handleAdd } = props;

  const onClickAddCustomer = (): void => {
    handleAdd();
  };

  return (
    <button
      className={`${styles.buttonAdd} h-32 bg-green-500 relative float-right rounded-4 focus:outline-none hover:bg-green-600`}
      onClick={onClickAddCustomer}
    >
      <span
        className={`${styles.textAdd} absolute text-white text-18 font-bold top-1 left-3`}
      >
        Add
      </span>
      {/* <FontAwesomeIcon
        icon={faPlus}
        className={`${styles.iconAdd} h-16 absolute text-white`}
      /> */}
    </button>
  );
};
