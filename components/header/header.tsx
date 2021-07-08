import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";
import { faBell, faComments } from "@fortawesome/free-regular-svg-icons";
import { FC } from "react";
import { useState } from "react";
import { Dropdown } from "semantic-ui-react";

interface PropsHeader {
  handleShowNavigation: (isShow: boolean) => void;
  isShowNav: boolean;
  handleOptionUser: () => void;
}

export const Header: FC<PropsHeader> = (props) => {
  const { handleShowNavigation, handleOptionUser, isShowNav } = props;
  const [showNavigation, setShowNavigation] = useState(true);

  const handleClickAvt = () => {
    handleOptionUser();
  };

  const honClickHandleShowNavigation = (): void => {
    setShowNavigation(!showNavigation);
    handleShowNavigation(showNavigation);
  };

  return (
    <div className="w-full h-full">
      <div
        className={`
          ${isShowNav ? "mobile:float-left mobile:w-1/5" : "mobile:float-left"}
          ${isShowNav ? "tablet:float-right mobile:w-1/5" : "tablet:float-left"}
          ${isShowNav ? "tablet:float-left" : ""}
          flex mobile:mt-12 mobile:w-1/2 tablet:w-1/4 laptop:w-1/7 h-full`}
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-gray-500 flex-1 mobile:h-12 mobile:mt-8 tablet:h-16 tablet:mt-4  "
          onClick={honClickHandleShowNavigation}
          role="button"
        />
        <a
          className={`${isShowNav ? "mobile:hidden" : "mobile:block"}
          ${isShowNav ? "tablet:block" : "tablet:block"}
          flex-1 m-2 mobile:text-10 mobile:mt-6 tablet:text-14 tablet:mt-2 text-gray-500`}
          role="button"
        >
          Home
        </a>
        <a
          className={`${isShowNav ? "mobile:hidden" : "mobile:block"}
          ${
            isShowNav ? "tablet:block" : "tablet:block"
          } flex-1 m-2 mobile:text-10 mobile:mt-6 tablet:text-14 tablet:mt-2 text-gray-500`}
          role="button"
        >
          Contact
        </a>
      </div>

      <div className="float-right mobile:mt-12 mobile:w-1/2 tablet:w-2/5">
        <div
          className="float-right flex mobile:mt-2"
          role="button"
          onClick={handleClickAvt}
        >
          <img
            className={`${styles.avt} mobile:w-24 mobile:h-24 mobile:mt-12 mobile:rounded-12 mobile:mr-4 tablet:w-32 tablet:h-32 tablet:rounded-16 tablet:mr-12`}
            src="https://i.pinimg.com/originals/00/6e/3b/006e3b7562cec2b15a448fe514048420.jpg"
          ></img>
          <span className="flex-1 mr-8 mobile:hidden tablet:hidden laptop:block">
            <strong>Admin</strong>
          </span>
        </div>

        <div
          className={`${isShowNav ? "mobile:hidden" : "mobile:block"}
          ${
            isShowNav ? "tablet:block" : "tablet:block"
          } relative h-20 w-32 float-right mt-8`}
        >
          <FontAwesomeIcon
            icon={faBell}
            className={`${styles.iconNotify} h-16 w-16 text-gray-500 absolute`}
            role="button"
          />
          <div className={`${styles.badge} absolute rounded-2 bg-yellow-400`}>
            <span className={`${styles.badgeText} text-8 absolute`}>15</span>
          </div>
        </div>

        <div
          className={`${isShowNav ? "mobile:hidden" : "mobile:block"}
          ${
            isShowNav ? "tablet:block" : "tablet:block"
          } relative h-20 w-32 float-right mt-8`}
        >
          <FontAwesomeIcon
            icon={faComments}
            className={`${styles.iconMessage} h-16 w-16 text-gray-500 absolute`}
            role="button"
          />
          <div className={`${styles.badge} absolute rounded-2 bg-red-400`}>
            <span className={`${styles.badgeText} text-8 absolute text-white`}>
              15
            </span>
          </div>
        </div>
      </div>

      <div className=""></div>
    </div>
  );
};
