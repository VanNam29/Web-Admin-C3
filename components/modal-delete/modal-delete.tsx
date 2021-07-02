import { FC } from "react";
import { useDispatch } from "react-redux";
import { removeCategory } from "../../modules/categories/redux/category.service";
import { removeCustomer } from "../../modules/customers/redux/customer.service";
import { removeProject } from "../../modules/projects/redux/project.service";
import { Category, Customer, Project } from "../../types/type";
import styles from "./modal-delete.module.css";

interface ModalDeleteProps {
  closeModalDelete: () => void;
  customer?: Customer;
  category?: Category;
  project?: Project;
}

export const ModalDelete: FC<ModalDeleteProps> = (props) => {
  const { customer, category, project, closeModalDelete } = props;
  const dispatch = useDispatch();

  const handleCancel = (): void => {
    closeModalDelete();
  };

  const handleDelete = (): void => {
    if (customer) {
      const action = removeCustomer(customer.id);
      dispatch(action);
    }
    if (category) {
      const action = removeCategory(category.id);
      dispatch(action);
    }
    if (project) {
      const action = removeProject(project.id);
      dispatch(action);
    }
    closeModalDelete();
  };

  return (
    <>
      <div className={styles.overlay}></div>
      <div
        className={`${styles.modal} rounded-8 mobile:w-2/3 tablet:w-1/2 laptop:w-1/3 desktop:w-1/4`}
      >
        {customer ? (
          <p className="text-center p-4 mobile:text-18 tablet:text-20 laptop:text-24">
            Remove customer item:{" "}
            <strong className="mobile:text-20 tablet:text-22 laptop:text-26">
              {customer.name}
            </strong>
          </p>
        ) : null}
        {category ? (
          <p className="text-center p-4 mobile:text-18 tablet:text-20 laptop:text-24">
            Remove category item:{" "}
            <strong className="mobile:text-20 tablet:text-22 laptop:text-26">
              {category.name}
            </strong>
          </p>
        ) : null}
        {project ? (
          <p className="text-center p-4 mobile:text-18 tablet:text-20 laptop:text-24">
            Remove project item:{" "}
            <strong className="mobile:text-20 tablet:text-22 laptop:text-26">
              {project.name}
            </strong>
          </p>
        ) : null}
        <div className={`${styles.footer} mt-12 mobile:w-full tablet:flex`}>
          <button
            className="mobile:w-full tablet:flex-1 h-42 bg-red-500 rounded-4 text-white mr-4 focus:outline-none text-18 hover:bg-red-600"
            role="button"
            onClick={handleDelete}
          >
            Ok
          </button>
          <button
            className="mobile:w-full mobile:mt-8 tablet:mt-0 tablet:flex-1 h-42 bg-gray-300 rounded-4 text-black  focus:outline-none text-18 hover:bg-gray-400"
            role="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
