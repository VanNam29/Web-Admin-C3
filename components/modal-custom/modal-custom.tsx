import { FC } from "react";
import ReactDOM, {createPortal} from "react-dom";

interface ModalCustomerProps {
  children: any;
  selector: any;
  isOpen: boolean;
}

export const ModalCustom: FC<ModalCustomerProps> = (props) => {
  const { children, selector, isOpen } = props;

  let mounted = isOpen;

  return mounted ? createPortal(children, document.querySelector(selector)) : null

};

