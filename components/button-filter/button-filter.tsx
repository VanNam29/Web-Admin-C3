import React, { FC, useState } from "react";
import styles from "./button-filter.module.css";

interface ButtonFilterProps {
  onChangeFilter: (value) => void;
}

export const ButtonFilter: FC<ButtonFilterProps> = (props) => {
  const { onChangeFilter } = props;

  const [valueSelect, setValueSelect] = useState("sort");

  const handleOnChange = (event) => {
    setValueSelect(event.target.value);
    onChangeFilter(event.target.value);
  };

  return (
    <select
      value={valueSelect}
      onChange={handleOnChange}
      className={`${styles.filter} rounded-4 bg-gray-200 text-black focus:outline-none`}
      role="button"
    >
      <option selected value="sort" className="bg-white text-black">
        sort by
      </option>
      <option value="name-asc" className="bg-white text-black">
        name-asc
      </option>
      <option value="name-desc" className="bg-white text-black">
        name-desc
      </option>
    </select>
  );
};
