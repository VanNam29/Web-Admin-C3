import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useCallback, useState } from "react";
import _ from "lodash";
import styles from "./search-input.module.css";

interface SearchInputProps {
  findCustomersByName: (name: string) => void;
  searchDebounce: (input: string) => void;
  onChangeSearchTitle: (input: string) => void;
}

export const SearchInput: FC<SearchInputProps> = (props) => {
  const { findCustomersByName, searchDebounce, onChangeSearchTitle } = props;
  const [inputSearch, setInputSearch] = useState("");

  const handleSubmit = (event): void => {
    event.preventDefault();
    setInputSearch(inputSearch.trim());
    findCustomersByName(inputSearch.trim());
  };

  const handleChange = (event): void => {
    setInputSearch(event.target.value);
    debounce(event.target.value.trim());
  };

  const debounce = useCallback(
    _.debounce((_searchValue) => {
      setInputSearch(_searchValue);
      searchDebounce(_searchValue);
    }, 1000),
    []
  );

  return (
    <div className="float-left mobile:mr-0 tablet:mr-4">
      <form className="relative" onSubmit={handleSubmit}>
        <input
          value={inputSearch}
          onChange={handleChange}
          className="h-32 bg-gray-200 focus:ring-1 focus:outline-none pl-8 w-full placeholder-gray-500"
          placeholder="search..."
        ></input>
        <FontAwesomeIcon
          icon={faSearch}
          className={`${styles.iconSearch} h-16 text-gray-600 absolute`}
        />
      </form>
    </div>
  );
};
