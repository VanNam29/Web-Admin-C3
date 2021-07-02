import { addProject, editProject, fetchProjectSuccess } from "./project.action";
import http from "./http-project";
import { Project } from "../../../types/type";

export const fetchProject = (params) => async (dispatch) => {
  try {
    const res = await http.get("/projects", { params });

    dispatch(fetchProjectSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const createProject = (project: Project) => async (dispatch) => {
  try {
    const res = await http.post("/projects", project);

    dispatch(addProject(res.data));
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeProject = (id: string | number) => async (dispatch) => {
  try {
    await http.delete(`/projects/${id}`);
    dispatch(removeProject(id));
  } catch (error) {
    console.log(error);
  }
};

export const updateProject =
  (id: string | number, project: Project) => async (dispatch) => {
    try {
      const res = await http.put(`/projects/${id}`, project);
      dispatch(editProject(project));

      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const findProjectByName = (name: string) => async (dispatch) => {
  try {
    const res = await http.get(`projects/?name=${name}`);
    dispatch(fetchProjectSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
