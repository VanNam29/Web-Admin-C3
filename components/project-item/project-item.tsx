import { faEdit, faInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC, useState } from "react";
import { ModalCustom } from "../modal-custom/modal-custom";
import { ModalProject } from "../modal-project/modal-project";
import { ModalDelete } from "../modal-delete/modal-delete";
import { Project } from "../../types/type";
import { useRouter } from "next/router";

import styles from "./project-item.module.css";

interface PropsProjectItem {
  project: Project;
  key: number;
  index: number;
}

export const ProjectItem: FC<PropsProjectItem> = (props) => {
  const { project, index } = props;
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

  const onClickProjectDetail = (id) => {
    router.push(`/project-detail/${id}`);
  };

  return (
    <>
      <tr className="text-center mobile:text-12 tablet:text-16 laptop:text-18 mobile:h-32 tablet:h-42 laptop:h-48 hover:bg-gray-100">
        <td
          onClick={() => {
            onClickProjectDetail(project.id);
          }}
          role="button"
          className="border border-gray-200 text-right mobile:pr-4 tablet:pr-12"
        >
          {index + 1}
        </td>
        <td
          onClick={() => {
            onClickProjectDetail(project.id);
          }}
          role="button"
          className="text-gray-600 border border-gray-200 text-left mobile:pl-4 tablet:pl-12"
        >
          {project.name}
        </td>
        <td
          onClick={() => {
            onClickProjectDetail(project.id);
          }}
          role="button"
          className="text-gray-600 border border-gray-200 text-left mobile:pl-4 tablet:pl-12"
        >
          <span
            className={`${styles.description} mobile:h-14 tablet:h-18 laptop:h-20 mobile:text-12 tablet:text-16 laptop:text-18`}
            title={project.description}
          >
            {project.description}
          </span>
        </td>
        <td
          onClick={() => {
            onClickProjectDetail(project.id);
          }}
          role="button"
          className="text-gray-600 border border-gray-200 text-left mobile:pl-4 tablet:pl-12"
        >
          {project.kind}
        </td>
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
            onClick={() => deleteCustomer(project.id)}
          />
        </td>
      </tr>
      <div>
        <ModalCustom selector="#portaldelete" isOpen={isOpenModal}>
          <ModalDelete
            closeModalDelete={closeModalDelete}
            project={project}
          ></ModalDelete>
        </ModalCustom>
      </div>
      <div>
        <ModalCustom selector="#portal" isOpen={isModalEdit}>
          <ModalProject
            closeModal={closeModalEdit}
            project={project}
          ></ModalProject>
        </ModalCustom>
      </div>
    </>
  );
};
