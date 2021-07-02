import { FC, useEffect, useState } from "react";
import styles from "./modal-category.module.css";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Category } from "../../types/type";
import {
  createCategory,
  updateCategory,
} from "../../modules/categories/redux/category.service";

interface ModalCategoryProps {
  closeModal?: () => void;
  category?: Category;
}

const initialInput: Category = {
  id: "",
  name: "",
  description: "",
};

export const ModalCategory: FC<ModalCategoryProps> = (props) => {
  const { closeModal, category } = props;
  const [invalid, setInvalid] = useState(true);
  const [inputs, setInputs] = useState(initialInput);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      setInputs(category);
    }
  }, []);

  const onClickCloseModal = (): void => {
    closeModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (event): void => {
    event.preventDefault();
    if (!inputs.name || !inputs.description) {
      setInvalid(false);
    } else {
      if (category) {
        const editCategory: Category = {
          id: category.id,
          name: inputs.name,
          description: inputs.description,
        };
        const action = updateCategory(category.id, editCategory);
        dispatch(action);
      } else {
        const newCategogy: Category = {
          id: uuidv4(),
          name: inputs.name,
          description: inputs.description,
        };
        console.log("demo");

        const action = createCategory(newCategogy);
        dispatch(action);
      }
      closeModal();
    }
  };

  return (
    <>
      <div className={styles.overlay}></div>
      <div
        className={`${styles.modal} rounded-8 mobile:w-4/5 tablet:w-2/3 laptop:w-1/3`}
      >
        <div className={styles.modalHeader}>
          <button
            onClick={onClickCloseModal}
            className="float-right focus:outline-none"
          >
            <FontAwesomeIcon icon={faTimes} className="h-22 text-gray-500" />
          </button>
          {category ? (
            <p className="text-center mobile:text-18 tablet:text-22 laptop:text-24 text-gray-700">
              Edit category
            </p>
          ) : (
            <p className="text-center mobile:text-18 tablet:text-22 laptop:text-24 text-gray-700">
              Add category
            </p>
          )}
        </div>
        <div className={styles.modalBody}>
          <p
            className={`${
              invalid ? "hidden" : ""
            } text-center text-red-400 mobile:text-10 tablet:text-12 laptop:text-14`}
          >
            Field is not null
          </p>
          <form onSubmit={handleSubmit}>
            <div className={`${styles.txtName} w-full p-8 h-78`}>
              <label className="float-left text-14 w-full text-black">
                Name<span className="text-red-500 text-16">*</span> :
              </label>
              {category ? (
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleInputChange}
                  className={`${styles.input} float-left w-full rounded-4 h-42 focus:ring-1 focus:outline-none pl-8 mt-4`}
                ></input>
              ) : (
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleInputChange}
                  className={`${styles.input} float-left w-full rounded-4 h-42 focus:ring-1 focus:outline-none pl-8 mt-4`}
                ></input>
              )}
            </div>
            <div
              className={`${styles.txtName} ${styles.divDescription} w-full p-8 h-78`}
            >
              <label className="float-left text-14 w-full text-black">
                Description<span className="text-red-500 text-16">*</span> :
              </label>
              {category ? (
                <textarea
                  name="description"
                  value={inputs.description}
                  onChange={handleInputChange}
                  className={`${styles.input} float-left w-full rounded-4 h-56 focus:ring-1 focus:outline-none pl-8 mt-4`}
                ></textarea>
              ) : (
                <textarea
                  name="description"
                  value={inputs.description}
                  onChange={handleInputChange}
                  className={`${styles.input} float-left w-full rounded-4 h-56 focus:ring-1 focus:outline-none pl-8 mt-4`}
                ></textarea>
              )}
            </div>

            <div
              className={`${styles.footer} w-full p-8 mobile:h-96 tablet:h-56 tablet:flex`}
            >
              {category ? (
                <button
                  type="submit"
                  className={`${styles.btnAdd} w-56 mobile:w-full tablet:flex-1 h-42 bg-green-500 rounded-4 focus:outline-none hover:bg-green-600 text-white`}
                >
                  Save
                </button>
              ) : (
                <button
                  type="submit"
                  className={`${styles.btnAdd} w-56 mobile:w-full tablet:flex-1 h-42 bg-green-500 rounded-4 focus:outline-none hover:bg-green-600 text-white`}
                >
                  Add
                </button>
              )}
              <button
                className={`${styles.btnCancel} w-56 h-42 mobile:w-full tablet:flex-1 bg-gray-300 rounded-4 focus:outline-none hover:bg-gray-500 text-black mt-6`}
                onClick={onClickCloseModal}
              >
                Cancel
              </button>
            </div>
            {/* <div className="w-full h-1 bg-gray-500"></div> */}
          </form>
        </div>
        <div className={styles.modalFooter}></div>
      </div>
    </>
  );
};
