import {
  addCategory,
  editCategory,
  fetchCategorySuccess,
} from "./category.action";
import http from "./http-category";
import { Category } from "../../../types/type";

export const fetchCategory = (params) => async (dispatch) => {
  try {
    const res = await http.get("/categories", { params });

    dispatch(fetchCategorySuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = (category: Category) => async (dispatch) => {
  try {
    const res = await http.post("/categories", category);

    dispatch(addCategory(res.data));
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeCategory = (id: string | number) => async (dispatch) => {
  try {
    await http.delete(`/categories/${id}`);
    dispatch(removeCategory(id));
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory =
  (id: string | number, category: Category) => async (dispatch) => {
    try {
      const res = await http.put(`/categories/${id}`, category);
      dispatch(editCategory(category));

      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const findCategoryByName = (name: string) => async (dispatch) => {
  try {
    const res = await http.get(`categories/?name=${name}`);
    dispatch(fetchCategorySuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
