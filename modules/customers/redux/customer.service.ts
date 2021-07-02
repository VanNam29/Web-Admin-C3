import {
  addCustomer,
  editCustomer,
  fetchCustomerPending,
  fetchCustomerSuccess,
} from "./customer.action";
import http from "./http-customer";
import { Customer } from "../../../types/type";

export const fetchCustomers = (params) => async (dispatch) => {
  try {
    const res = await http.get("/customers", { params });

    dispatch(fetchCustomerSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCustomerAll = () => async (dispatch) => {
  try {
    const res = await http.get("/customers");

    dispatch(fetchCustomerSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const createCustomers = (customer: Customer) => async (dispatch) => {
  try {
    const res = await http.post("/customers", customer);

    dispatch(addCustomer(res.data));
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeCustomer = (id: string | number) => async (dispatch) => {
  try {
    await http.delete(`/customers/${id}`);
    dispatch(removeCustomer(id));
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomer =
  (id: string | number, customer: Customer) => async (dispatch) => {
    try {
      const res = await http.put(`/customers/${id}`, customer);
      dispatch(editCustomer(customer));

      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const findCustomersByName = (name: string) => async (dispatch) => {
  try {
    const res = await http.get(`customers/?name=${name}`);
    dispatch(fetchCustomerSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
