import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import styles from "./pagination.module.css";

interface PaginationProps {
  count: number;
  page: number;
  onChange: () => void;
}

export const Pagination: FC<PaginationProps> = (props) => {
//   const { count, page, onChange } = props;
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="w-full h-48 mt-16">
      <div className={`${styles.entries} float-left`}>
        <span>Showing 11 to 20 of 57 entries</span>
      </div>

      <div className={`${styles.pagination} float-right h-36`}>
        <div className={`${styles.previous} w-82 h-36 float-left relative`}>
          <span className="absolute ml-16 mt-2">Previous</span>
          <FontAwesomeIcon
            icon={faAngleDoubleLeft}
            className="h-12 absolute mt-10 ml-2"
          />
        </div>
        <div className="flex float-left w-108 h-36">
          <div className={`${styles.subpagination} flex-1 text-center`}>
            <span className="h-full w-full mt-4">1</span>
          </div>
          <div className={`${styles.subpagination} flex-1 text-center`}>
            <span className="h-full w-full mt-4">2</span>
          </div>
          <div className={`${styles.subpagination} flex-1 text-center`}>
            <span className="h-full w-full mt-4">3</span>
          </div>
        </div>
        <div className={`${styles.next} float-left w-56 h-36 relative`}>
          <span className="absolute mt-4 ml-2">Next</span>
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            className="h-12 absolute mt-10 ml-36"
          />
        </div>
      </div>
    </div>
  );
};
