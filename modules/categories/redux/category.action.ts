
import {
    ADD_CATEGORY,
    EDIT_CATEGORY,
    FETCH_CATEGORY_ERROR,
    FETCH_CATEGORY_PENDING,
    FETCH_CATEGORY_SUCCESS,
    REMOVE_CATEGORY,
  } from "../../../constants/constants";
  import { Category } from "../../../types/type";
  
  export const fetchCategoryPending = () => {
    return {
      type: FETCH_CATEGORY_PENDING,
    }
  } 
  
  export const fetchCategorySuccess = (category:Category) => {
    return {
      type: FETCH_CATEGORY_SUCCESS,
      payload: category,
    }
  }
  
  export const fetchCategoryError = (error) => {
    return {
      type: FETCH_CATEGORY_ERROR,
      error: error,
    }
  }
  
  export const addCategory = (category:Category) => {
    return {
      type: ADD_CATEGORY,
      payload: category,
    };
  };
  
  export const removeCategory = (id:string | number) => {
    return {
      type: REMOVE_CATEGORY,
      payload: id,
    };
  };
  
  export const editCategory = (category:Category) => {
    return {
      type: EDIT_CATEGORY,
      payload: category,
    };
  };
  