// import { produce } from "immer";
import {
    ADD_CATEGORY,
    EDIT_CATEGORY,
    FETCH_CATEGORY_ERROR,
    FETCH_CATEGORY_PENDING,
    FETCH_CATEGORY_SUCCESS,
    REMOVE_CATEGORY,
  } from "../../../constants/constants";
  
  const initialState = []
  
  export const categoryReducer = (state = initialState, action) =>{
      switch (action.type) {
        case FETCH_CATEGORY_PENDING: {
          return state;
  
        }
  
        case FETCH_CATEGORY_SUCCESS: {
          return action.payload;
        }
  
        case FETCH_CATEGORY_ERROR: {
          return state;
        }
  
        case ADD_CATEGORY: {
          return [action.payload ,...state];
        }
  
        case REMOVE_CATEGORY: {
          return state.filter((category) => category.id !== action.payload);
        }
        
        case EDIT_CATEGORY: {
          const newCategory = action.payload;
          return state.map((category) => {
            if(category.id === newCategory.id) {
              return {
                ...state,
                newCategory,
              };
            }else {
              return state;
            }
          });
  
        }
  
        default: {
          return state;
        }
      }
    };
  
  export const getCategory = state => state.list;
  export const getCategoryPending = state => state.pending;
  export const getCategoryError = state => state.error;
  