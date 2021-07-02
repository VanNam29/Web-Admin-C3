import { faEdit, faInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC, useState } from "react";
import { ModalCustom } from "../modal-custom/modal-custom";
import { ModalCustomer } from "../modal-customer/modal-customer";
import { ModalDelete } from "../modal-delete/modal-delete";
import { Customer } from "../../types/type";
import { useRouter } from "next/router";

import styles from "./customer-item.module.css";

interface PropsCustomerItem {
  customer: Customer;
  key: number;
  index: number;
}

const CustomerItem: FC<PropsCustomerItem> = (props) => {
  const { customer, index } = props;
  const [isOpenModal, setOpenModal] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);
  const router = useRouter();

  const deleteCustomer = (id): void => {
    setOpenModal(true);
  };

  const closeModalDelete = (): void => {
    setOpenModal(false);
  };

  const handleEdit = (): void => {
    setModalEdit(true);
  };

  const closeModalEdit = (): void => {
    setModalEdit(false);
  };

  const onClickCustomerDetail = (id) => {
    router.push(`/customer-detail/${id}`);
  };

  // elm Active
  let elmActive = null;
  if (customer.status) {
    elmActive = (
      <div className="bg-blue-400 text-18 rounded-4 h-20 w-48">
        <p className="text-white text-12 pl-6 font-bold">Active</p>
      </div>
    );
  } else {
    elmActive = (
      <div className="bg-gray-400 text-18 rounded-4 h-20 w-52">
        <p className="text-white text-12 pl-4 font-bold">Inactive</p>
      </div>
    );
  }

  return (
    <>
      <tr className="text-center mobile:text-12 tablet:text-16 laptop:text-18 mobile:h-32 tablet:h-42 laptop:h-48 hover:bg-gray-100">
        <td
          onClick={() => {
            onClickCustomerDetail(customer.id);
          }}
          role="button"
          className="border border-gray-200 text-right mobile:pr-4 tablet:pr-12"
        >
          {index + 1}
        </td>
        <td
          onClick={() => {
            onClickCustomerDetail(customer.id);
          }}
          role="button"
          className="text-gray-600 border border-gray-200 text-left mobile:pl-4 tablet:pl-12"
        >
          {customer.name}
        </td>
        <td
          onClick={() => {
            onClickCustomerDetail(customer.id);
          }}
          role="button"
          className="text-gray-600 border border-gray-200 text-left mobile:pl-4 tablet:pl-12"
        >
          <span
            className={`${styles.description} mobile:text-12 mobile:h-14 tablet:h-18 laptop:h-20 tablet:text-16 laptop:text-18 `}
            title={customer.description}
          >
            {customer.description}
          </span>
        </td>
        <td
          onClick={() => {
            onClickCustomerDetail(customer.id);
          }}
          role="button"
          className="text-gray-600 border border-gray-200 text-left mobile:pl-4 tablet:pl-12"
        >
          {customer.priority}
        </td>
        <td
          onClick={() => {
            onClickCustomerDetail(customer.id);
          }}
          role="button"
          className="border border-gray-200 text-left mobile:pl-4 tablet:pl-12"
        >
          {elmActive}
        </td>
        {/* </Link> */}
        <td className="border border-gray-200">
          <FontAwesomeIcon
            icon={faEdit}
            className={`${styles.iconEdit} mobile:h-14 mobile:pl-8 mobile:mt-2 tablet:h-20 text-blue-300 hover:text-blue-400 float-left tablet:pl-4 laptop:h-24 laptop:pl-8`}
            onClick={handleEdit}
            role="button"
            title="Edit"
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            className={`${styles.iconDelete} mobile:h-14 mobile:pl-8 mobile:mt-2 tablet:h-20 text-red-300 hover:text-red-400 float-left tablet:pl-4 laptop:h-24 laptop:pl-8`}
            role="button"
            title="Delete"
            onClick={() => deleteCustomer(customer.id)}
          />
        </td>
      </tr>

      <div>
        <ModalCustom selector="#portaldelete" isOpen={isOpenModal}>
          <ModalDelete
            closeModalDelete={closeModalDelete}
            customer={customer}
          ></ModalDelete>
        </ModalCustom>
      </div>
      <div>
        <ModalCustom selector="#portal" isOpen={isModalEdit}>
          <ModalCustomer
            closeModal={closeModalEdit}
            customer={customer}
          ></ModalCustomer>
        </ModalCustom>
      </div>
    </>
  );
};

export default CustomerItem;
