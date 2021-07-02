import Link from "next/link";
import { routers } from "../../config.router";
import { ConfigRouter } from "../../types/type";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faCode,
  faBriefcase,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./navigation-menu.module.css";
import { FC } from "react";

interface PropsNavigationMenu {
  isShowNav: boolean;
}

export const NavigationMenu: FC<PropsNavigationMenu> = (props) => {
  const { isShowNav } = props;

  const configRouter = routers.map((router: ConfigRouter, index) => (
    <>
      <Link href={router.path}>
        <div className="h-48 w-full" role="button">
          {/* <FontAwesomeIcon icon={router.icon} className="h-12 w-12" /> */}
          <a className="block py-12 px-24 text-16 hover:bg-blue-600 hover:text-white space-y-12 px-12 py-8">
            {router.name}
          </a>
        </div>
      </Link>
    </>
  ));

  return (
    <div
      className={`bg-gray-800 text-blue-100 w-full h-full ${
        isShowNav ? "block" : "hidden"
      } transition duration-200 ease-in-out`}
    >
      {/* logo */}
      <div className="h-48 w-full pt-2 pl-24">
        <span className="text-26 text-gray-100">
          <strong>VMO</strong> Admin
        </span>
      </div>
      <div className="w-full h-1 bg-gray-400"></div>

      {/* nav */}
      <nav className="w-full">{configRouter}</nav>
    </div>

    // <div className="h-full">
    //   <div
    //     className={`
    //     ${isShowNav ? "mobile:h-48 p-4" : "mobile:h-48 p-4"}
    //     ${isShowNav ? "tablet:h-48 " : "tablet:h-48 p-4"}
    //     ${isShowNav ? "laptop:h-48 p-8" : "laptop:h-48 p-4"}
    //       bg-white`}
    //     // transform duration-200 ease-in-out
    //   >
    //     <img
    //       className={`
    //         ${
    //           isShowNav
    //             ? "mobile:h-12 mobile:mt-8 mobile:ml-12"
    //             : "mobile:h-12 mobile:mt-16"
    //         }
    //         ${isShowNav ? "tablet:h-24" : "tablet:h-18"}
    //         ${
    //           isShowNav ? "laptop:h-32 laptop:pl-24 laptop:mt-2" : "laptop:h-24"
    //         }
    //         float-left `}
    //       src="https://cdn.jobhopin.com/avatars/30ac860a-2f42-4a6b-bdfd-372f62da2239.png"
    //     ></img>
    //     {isShowNav ? (
    //       <span className="text-gray-600 float-left mt-22 ml-8 mobile:hidden tablet:block tablet:text-16 tablet:mt-12 laptop:text-20 laptop:mt-6">
    //         <strong>Admin</strong>
    //       </span>
    //     ) : null}
    //   </div>

    //   <div
    //     className={`
    //     ${isShowNav ? "h-9/10" : "h-19/20"}
    //       w-full float-left`}
    //   >

    //     <div className="w-1/5 float-left" role="button">
    //       <div className="mobile:h-32 mobile:ml-4 tablet:h-49 tablet:ml-12 float-left w-full">
    //         {isShowNav ? (
    //           <div className="w-full h-1 bg-gray-300 mobile:hidden tablet:block"></div>
    //         ) : null}
    //         <FontAwesomeIcon
    //           icon={faUser}
    //           className={`
    //             ${
    //               isShowNav
    //                 ? "mobile:h-12 mobile:mt-12"
    //                 : "mobile:h-14 mobile:pl-2 mobile:mt-8"
    //             }
    //             ${
    //               isShowNav
    //                 ? "tablet:h-24 tablet:mt-12"
    //                 : "tablet:h-18 tablet:pl-1"
    //             }
    //             ${
    //               isShowNav
    //                 ? "laptop:h-24 laptop:float-right laptop:pr-8"
    //                 : "laptop:h-24"
    //             }
    //             text-gray-500 float-left`}
    //         />
    //       </div>
    //       <div className="mobile:h-32  mobile:ml-4 tablet:h-49 tablet:ml-12 ml-12 float-left w-full">
    //         {isShowNav ? (
    //           <div className="w-full h-1 bg-gray-300 mobile:hidden tablet:block"></div>
    //         ) : null}
    //         <FontAwesomeIcon
    //           icon={faShoppingCart}
    //           className={`
    //           ${
    //             isShowNav
    //               ? "mobile:h-12 mobile:mt-12"
    //               : "mobile:h-14 mobile:pl-2 mobile:mt-8"
    //           }
    //           ${isShowNav ? "tablet:h-24 tablet:mt-12" : "tablet:h-18"}
    //           ${
    //             isShowNav
    //               ? "laptop:h-24 laptop:float-right laptop:pr-8"
    //               : "laptop:h-24"
    //           }
    //             text-gray-500 float-left`}
    //         />
    //       </div>
    //       <div className="mobile:h-32  mobile:ml-4 tablet:h-49 tablet:ml-12 ml-12 float-left w-full">
    //         {isShowNav ? (
    //           <div className="w-full h-1 bg-gray-300 mobile:hidden tablet:block"></div>
    //         ) : null}
    //         <FontAwesomeIcon
    //           icon={faBriefcase}
    //           className={`
    //           ${
    //             isShowNav
    //               ? "mobile:h-12 mobile:mt-12"
    //               : "mobile:h-14 mobile:pl-2 mobile:mt-8"
    //           }
    //           ${
    //             isShowNav
    //               ? "tablet:h-24 tablet:mt-12"
    //               : "tablet:h-18 tablet:pl-1"
    //           }
    //           ${
    //             isShowNav
    //               ? "laptop:h-24 laptop:float-right laptop:pr-8"
    //               : "laptop:h-24"
    //           }
    //             text-gray-500 float-left`}
    //         />
    //       </div>
    //     </div>

    //     {isShowNav ? (
    //       <div className="h-7/8 w-4/5 float-left">{configRouter}</div>
    //     ) : null}
    //   </div>
    // </div>
  );
};
