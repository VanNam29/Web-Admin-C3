import {
  ADD_PROJECT,
  EDIT_PROJECT,
  FETCH_PROJECT_ERROR,
  FETCH_PROJECT_PENDING,
  FETCH_PROJECT_SUCCESS,
  REMOVE_PROJECT,
} from "../../../constants/constants";

const initialState = [];

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_PENDING: {
      return state;
    }

    case FETCH_PROJECT_SUCCESS: {
      return action.payload;
    }

    case FETCH_PROJECT_ERROR: {
      return state;
    }

    case ADD_PROJECT: {
      return [...state, action.payload];
    }

    case REMOVE_PROJECT: {
      return state.filter((project) => project.id !== action.payload);
    }

    case EDIT_PROJECT: {
      const newProject = action.payload;
      return state.map((project) => {
        if (project.id === newProject.id) {
          return {
            ...state,
            newProject,
          };
        } else {
          return state;
        }
      });
    }

    default: {
      return state;
    }
  }
};
