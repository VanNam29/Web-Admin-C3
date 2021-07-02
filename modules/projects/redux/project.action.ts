
import {
    ADD_PROJECT,
    EDIT_PROJECT,
    FETCH_PROJECT_ERROR,
    FETCH_PROJECT_PENDING,
    FETCH_PROJECT_SUCCESS,
    REMOVE_PROJECT,
  } from "../../../constants/constants";
  import { Project } from "../../../types/type";
  
  export const fetchProjectPending = () => {
    return {
      type: FETCH_PROJECT_PENDING,
    }
  } 
  
  export const fetchProjectSuccess = (project:Project) => {
    return {
      type: FETCH_PROJECT_SUCCESS,
      payload: project,
    }
  }
  
  export const fetchProjectError = (error) => {
    return {
      type: FETCH_PROJECT_ERROR,
      error: error,
    }
  }
  
  export const addProject = (project:Project) => {
    return {
      type: ADD_PROJECT,
      payload: project,
    };
  };
  
  export const removeProject = (id:string | number) => {
    return {
      type: REMOVE_PROJECT,
      payload: id,
    };
  };
  
  export const editProject = (project:Project) => {
    return {
      type: EDIT_PROJECT,
      payload: project,
    };
  };
  