import { useEffect, useState } from "react";
import CustomerItem from "../../components/customer-item/customer-item";
import { Customer } from "../../types/type";
import React, { FC } from "react";
import { MainLayout } from "../../components/layouts/layout";

import styles from "./customers.module.css";
import { SearchInput } from "../../components/search-input/search-input";
import { ButtonFilter } from "../../components/button-filter/button-filter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerAll,
  findCustomersByName,
} from "../../modules/customers/redux/customer.service";
import http from "../../modules/customers/redux/http-customer";

import { ButtonAdd } from "../../components/button-add/button-add";
import { ModalCustomer } from "../../components/modal-customer/modal-customer";
import { ModalCustom } from "../../components/modal-custom/modal-custom";
import Pagination from "@material-ui/lab/Pagination";
import { fetchCustomerSuccess } from "../../modules/customers/redux/customer.action";
import { useAuth } from "../../utils/contexts/auth-context";
import { useRouter } from "next/router";

interface PropsCustomer {
  customers?: Customer[];
}

export const ListCustomer: FC<PropsCustomer> = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItem, setTotalItem] = useState(15);
  const [sortName, setSortName] = useState("");
  const [order, setOrder] = useState("");
  const { token } = useAuth();

  const pageSizes = [2, 5, 10];

  const dispatch = useDispatch();
  const router = useRouter();
  const listCustomerAll = useSelector((state: any) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomerAll());
    console.log("token -listCustomer ", token);
  }, []);

  const handleAdd = (): void => {
    setIsOpen(true);
  };

  const searchDebounce = (input: string): void => {
    setSearchTitle(input);
  };

  const findByName = (name: string): void => {
    setSearchTitle(name);
    const action = findCustomersByName(name);
    dispatch(action);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const onChangeSearchTitle = (event): void => {
    const searchTitle = event.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize, sortName, order) => {
    const params = {};

    if (searchTitle) {
      params["name"] = searchTitle;
    }

    if (page) {
      params["_page"] = page;
    }

    if (pageSize) {
      params["_limit"] = pageSize;
    }

    if (sortName) {
      params["_sort"] = sortName;
    }

    if (order) {
      params["_order"] = order;
    }

    return params;
  };

  const retrieveCustomers = () => {
    const params = getRequestParams(
      searchTitle,
      page,
      pageSize,
      sortName,
      order
    );
    http
      .get("/customers", { params })
      .then((res) => {
        const sizePagination = Math.ceil(totalItem / pageSize);

        setCustomers(res.data);
        setCount(sizePagination);
        dispatch(fetchCustomerSuccess(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(
    () => {
      retrieveCustomers();
    },
    [page, pageSize, customers]
    // [page, pageSize, JSON.stringify(customers)]
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event): void => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const onChangeFilter = (value): void => {
    // console.log(value);
    setSortName(value.slice(0, 4));
    setOrder(value.slice(5, value.length));
  };

  // if (!token) {
  //   router.push("/login");
  // }

  return (
    <MainLayout title="customers list">
      <>
        {/* <div className={`${styles.overlay} mobile:block tablet:hidden`}></div> */}
        <div className={`w-full h-full`}>
          <div className="w-96/100 h-full bg-white m-auto  rounded-4 shadow-md mobile:mt-4 tablet:mt-24 laptop:mt-42">
            <div className="w-96/100 mobile:h-78 tablet:h-78 m-auto tablet:relative">
              <p
                className={`${styles.title} mobile:text-18 tablet:text-24 tablet:absolute text-gray-700 tablet:top-6`}
              >
                List customer
              </p>
              <div
                className={`${styles.search} mobile:h-78 tablet:h-62 tablet:absolute tablet:right-0`}
              >
                <div className="float-right mobile:mt-4 tablet:mt-0">
                  <ButtonAdd handleAdd={handleAdd} />
                </div>
                <div className="float-right mobile:mt-4 tablet:mt-0">
                  <ButtonFilter onChangeFilter={onChangeFilter} />
                </div>
                <div className="float-right mobile:mt-4 mobile:z-10 tablet:mt-0">
                  <SearchInput
                    findCustomersByName={findByName}
                    searchDebounce={searchDebounce}
                    onChangeSearchTitle={onChangeSearchTitle}
                  />
                </div>
              </div>
            </div>
            <table
              className={`${styles.table} w-96/100 bg-white m-auto border-collapse border border-gray-200 mobile:pt-24 overflow-x-auto`}
            >
              <thead className="shadow">
                <tr className="bg-white mobile:h-32 tablet:h-42 mobile:text-8 tablet:text-16 laptop:text-18 laptop:h-48">
                  <th className="border border-gray-200 w-1/20 text-left mobile:pl-4 tablet:pl-12">
                    Index
                  </th>
                  <th className="border border-gray-200 w-1/5 text-left mobile:pl-4 tablet:pl-12">
                    Name
                  </th>
                  <th className="border border-gray-200 w-9/20 text-left mobile:pl-4 tablet:pl-12">
                    Description
                  </th>
                  <th className="border border-gray-200 w-3/20 text-left mobile:pl-4 tablet:pl-12">
                    Priority
                  </th>
                  <th className="border border-gray-200 w-1/10 text-left mobile:pl-4 tablet:pl-12">
                    Status
                  </th>
                  <th className="border border-gray-200 w-1/20 text-left mobile:pl-4 tablet:pl-12">
                    Option
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {customers ? (
                  customers.map((customer: Customer, index: number) => (
                    <CustomerItem
                      key={index}
                      customer={customer}
                      index={index}
                    />
                  ))
                ) : (
                  <p>not found data</p>
                )}
              </tbody>
            </table>
            <div className="w-96/100 mobile:h-78 tablet:h-48 m-auto mt-16">
              <div className="float-left mobile:pr-24 tablet:pr-0">
                {"Show items: "}
                <select
                  onChange={handlePageSizeChange}
                  value={pageSize}
                  className="bg-white rounded-4 focus:outline-none shadow-md border-solid border-2 border-gray-300"
                  role="button"
                >
                  {pageSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              {/* pagination */}
              <div className="mobile:float-left tablet:float-right mobile:mt-8 tablet:mt-0 focus:outline-none">
                <Pagination
                  className="my-3 focus:outline-none"
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  shape="rounded"
                  color="primary"
                  onChange={handlePageChange}
                />
              </div>
            </div>
            <div>
              <ModalCustom selector="#portal" isOpen={modalIsOpen}>
                <ModalCustomer closeModal={closeModal} />
              </ModalCustom>
            </div>
          </div>
        </div>
      </>
    </MainLayout>
  );
};
