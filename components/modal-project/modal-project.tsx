import { FC, useEffect, useState } from "react";
import styles from "./modal-project.module.css";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Project } from "../../types/type";
import {
  createProject,
  updateProject,
} from "../../modules/projects/redux/project.service";

interface ModalProjectProps {
  closeModal?: () => void;
  project?: Project;
}

const initialInput: Project = {
  id: "",
  name: "",
  description: "",
  kind: "small",
};

export const ModalProject: FC<ModalProjectProps> = (props) => {
  const { closeModal, project } = props;
  const [invalid, setInvalid] = useState(true);
  const [inputs, setInputs] = useState(initialInput);
  const dispatch = useDispatch();

  useEffect(() => {
    if (project) {
      setInputs(project);
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
    if (!inputs.name || !inputs.description || !inputs.kind) {
      setInvalid(false);
    } else {
      if (project) {
        const editProject: Project = {
          id: project.id,
          name: inputs.name,
          description: inputs.description,
          kind: inputs.kind,
        };
        const action = updateProject(project.id, editProject);
        dispatch(action);
      } else {
        const newProject: Project = {
          id: uuidv4(),
          name: inputs.name,
          description: inputs.description,
          kind: inputs.kind,
        };

        const action = createProject(newProject);
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
          {project ? (
            <p className="text-center mobile:text-18 tablet:text-22 laptop:text-24 text-gray-700">
              Edit Project
            </p>
          ) : (
            <p className="text-center mobile:text-18 tablet:text-22 laptop:text-24 text-gray-700">
              Add Project
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
              {project ? (
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
              {project ? (
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
            <div className={`${styles.txtName} w-full p-8 h-56`}>
              <label className="float-left text-14 w-full text-black">
                Kind<span className="text-red-500 text-16">*</span>
              </label>
              {project ? (
                <select
                  value={inputs.kind}
                  className={`${styles.input} h-42 w-full rounded-4 focus:ring-1 focus:outline-none mt-4`}
                  name="kind"
                  role="button"
                  onChange={handleInputChange}
                >
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
              ) : (
                <select
                  className={`${styles.input} h-42 w-full rounded-4 focus:ring-1 focus:outline-none mt-4`}
                  name="kind"
                  role="button"
                  onChange={handleInputChange}
                >
                  <option selected value="small">
                    small
                  </option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
              )}
            </div>

            <div
              className={`${styles.footer} w-full p-8 mobile:h-96 tablet:h-56 tablet:flex`}
            >
              {project ? (
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
