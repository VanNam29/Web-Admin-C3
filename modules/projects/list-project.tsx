import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../components/layouts/layout";
import { Project } from "../../types/type";
import { findProjectByName } from "../../modules/projects/redux/project.service";
import http from "../../modules/projects/redux/http-project";
import { fetchProjectSuccess } from "../../modules/projects/redux/project.action";
import { ButtonAdd } from "../../components/button-add/button-add";
import { ButtonFilter } from "../../components/button-filter/button-filter";
import { SearchInput } from "../../components/search-input/search-input";
import { ProjectItem } from "../../components/project-item/project-item";
import Pagination from "@material-ui/lab/Pagination";
import { ModalCustom } from "../../components/modal-custom/modal-custom";
import { ModalProject } from "../../components/modal-project/modal-project";

import styles from "./projects.module.css";
import { FC } from "react";

interface ListProjectProps {}

export const ListProject: FC<ListProjectProps> = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  //
  const [projects, setProject] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItem, setTotalItem] = useState(15);

  const [sortName, setSortName] = useState("");
  const [order, setOrder] = useState("");

  const pageSizes = [2, 5, 10];

  const dispatch = useDispatch();

  const handleAdd = (): void => {
    setIsOpen(true);
  };

  const searchDebounce = (input: string): void => {
    console.log(input);
    setSearchTitle(input);
  };

  const findByName = (name: string): void => {
    console.log(name);
    setSearchTitle(name);
    const action = findProjectByName(name);
    dispatch(action);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  // pagination
  const handleChange = (): void => {};

  const onChangeSearchTitle = (event): void => {
    const searchTitle = event.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize, sortName, order) => {
    let params = {};

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
      .get("/projects", { params })
      .then((res) => {
        const sizePagination = Math.ceil(totalItem / pageSize);
        setProject(res.data);
        setCount(sizePagination);
        dispatch(fetchProjectSuccess(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveCustomers();
  }, [page, pageSize, projects]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event): void => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const onChangeFilter = (value): void => {
    console.log(value);
    setSortName(value.slice(0, 4));
    setOrder(value.slice(5, value.length));
  };

  return (
    <MainLayout title="project list">
      <div className="w-full h-full bg-gray-200">
        <div className="w-96/100 h-full bg-white m-auto  rounded-4 shadow-md mobile:mt-4 tablet:mt-24 laptop:mt-42">
          <div className="w-96/100 mobile:h-78 tablet:h-78 m-auto tablet:relative">
            <p
              className={`${styles.title} mobile:text-18 tablet:text-24 tablet:absolute text-gray-700 tablet:top-6`}
            >
              List project
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
              <div className="float-right mobile:mt-4 tablet:mt-0">
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
                  Kind
                </th>
                <th className="border border-gray-200 w-1/20 text-left mobile:pl-4 tablet:pl-12">
                  Option
                </th>
              </tr>
            </thead>
            <tbody className="">
              {projects ? (
                projects.map((project: Project, index: number) => (
                  <ProjectItem key={index} project={project} index={index} />
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
            <div className="mobile:float-left tablet:float-right mobile:mt-8 tablet:mt-0">
              <Pagination
                className="my-3"
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
              <ModalProject closeModal={closeModal} />
            </ModalCustom>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
