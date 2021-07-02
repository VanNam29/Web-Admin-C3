import { FC, useEffect, useState } from "react";
import styles from "./modal-customer.module.css";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Customer } from "../../types/type";
import {
  createCustomers,
  updateCustomer,
} from "../../modules/customers/redux/customer.service";

interface ModalCustomerProps {
  closeModal?: () => void;
  customer?: Customer;
}

const initialInput: Customer = {
  id: "",
  name: "",
  description: "",
  priority: "1",
  status: 1,
};

export const ModalCustomer: FC<ModalCustomerProps> = (props) => {
  const { closeModal, customer } = props;
  const [invalid, setInvalid] = useState(true);
  const [inputs, setInputs] = useState(initialInput);
  const dispatch = useDispatch();

  useEffect(() => {
    if (customer) {
      setInputs(customer);
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
    if (!inputs.name || !inputs.description || !inputs.priority) {
      setInvalid(false);
    } else {
      if (customer) {
        const editCustomer: Customer = {
          id: customer.id,
          name: inputs.name,
          description: inputs.description,
          priority: inputs.priority,
          status: +inputs.status,
        };
        const action = updateCustomer(customer.id, editCustomer);
        dispatch(action);
      } else {
        const newCustomer: Customer = {
          id: uuidv4(),
          name: inputs.name,
          description: inputs.description,
          priority: inputs.priority,
          status: +inputs.status,
        };
        const action = createCustomers(newCustomer);
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
          {customer ? (
            <p className="text-center mobile:text-18 tablet:text-22 laptop:text-24 text-gray-700">
              Edit customer
            </p>
          ) : (
            <p className="text-center mobile:text-18 tablet:text-22 laptop:text-24 text-gray-700">
              Add customer
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
                Name<span className="text-red-500 text-16">*</span>
              </label>
              {customer ? (
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
                Description<span className="text-red-500 text-16">*</span>
              </label>
              {customer ? (
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

            <div className="w-full p-8 h-56 flex">
              <div className={`${styles.txtName} flex-1 pr-4`}>
                <label className="float-left text-14 w-full text-black">
                  Priority<span className="text-red-500 text-16">*</span>
                </label>
                {customer ? (
                  <select
                    value={inputs.priority}
                    className={`${styles.input} h-42 w-full rounded-4 focus:ring-1 focus:outline-none mt-4`}
                    name="priority"
                    role="button"
                    onChange={handleInputChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                ) : (
                  <select
                    className={`${styles.input} h-42 w-full rounded-4 focus:ring-1 focus:outline-none mt-4`}
                    name="priority"
                    role="button"
                    onChange={handleInputChange}
                  >
                    <option selected value="1">
                      1
                    </option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                )}
              </div>
              <div className={`${styles.txtName} flex-1 pl-4`}>
                <label className="float-left text-14 w-full text-black">
                  Status<span className="text-red-500 text-16">*</span>
                </label>
                {customer ? (
                  <select
                    value={inputs.status}
                    className={`${styles.input} h-42 w-full rounded-4 focus:ring-1 focus:outline-none mt-4`}
                    name="status"
                    onChange={handleInputChange}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                ) : (
                  <select
                    className={`${styles.input} h-42 w-full rounded-4 focus:ring-1 focus:outline-none mt-4`}
                    name="status"
                    onChange={handleInputChange}
                  >
                    <option selected value="1">
                      Active
                    </option>
                    <option value="0">Inactive</option>
                  </select>
                )}
              </div>
            </div>
            <div
              className={`${styles.footer} w-full p-8 mobile:h-96 tablet:h-56 tablet:flex`}
            >
              {customer ? (
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
