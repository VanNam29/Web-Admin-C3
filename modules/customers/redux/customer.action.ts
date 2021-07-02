import {
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  FETCH_CUSTOMER_ERROR,
  FETCH_CUSTOMER_PENDING,
  FETCH_CUSTOMER_SUCCESS,
  REMOVE_CUSTOMER,
} from "../../../constants/constants";
import { Customer } from "../../../types/type";

export const fetchCustomerPending = () => {
  return {
    type: FETCH_CUSTOMER_PENDING,
  }
} 

export const fetchCustomerSuccess = (customers:Customer) => {
  return {
    type: FETCH_CUSTOMER_SUCCESS,
    payload: customers,
  }
}

export const fetchCustomerError = (error) => {
  return {
    type: FETCH_CUSTOMER_ERROR,
    error: error,
  }
}

export const addCustomer = (customer:Customer) => {
  return {
    type: ADD_CUSTOMER,
    payload: customer,
  };
};

export const removeCustomer = (id:string | number) => {
  return {
    type: REMOVE_CUSTOMER,
    payload: id,
  };
};

export const editCustomer = (customer:Customer) => {
  return {
    type: EDIT_CUSTOMER,
    payload: customer,
  };
};
