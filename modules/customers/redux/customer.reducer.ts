// import { produce } from "immer";
import {
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  FETCH_CUSTOMER_ERROR,
  FETCH_CUSTOMER_PENDING,
  FETCH_CUSTOMER_SUCCESS,
  REMOVE_CUSTOMER,
} from "../../../constants/constants";
import { toast } from "react-toastify";

const initialState = [];

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER_PENDING: {
      return state;
    }

    case FETCH_CUSTOMER_SUCCESS: {
      return action.payload;
    }

    case FETCH_CUSTOMER_ERROR: {
      return state;
    }

    case ADD_CUSTOMER: {
      toast.success("Add customer successfully!");
      return [action.payload, ...state];
    }

    case REMOVE_CUSTOMER: {
      toast.error("Delete customer successfully!");
      return state.filter((customer) => customer.id !== action.payload);
    }

    case EDIT_CUSTOMER: {
      toast.warn("Edit customer successfully!");
      const newCustomer = action.payload;
      return state.map((customer) => {
        if (customer.id === newCustomer.id) {
          return {
            ...state,
            newCustomer,
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

export const getCustomers = (state) => state.list;
export const getCustomersPending = (state) => state.pending;
export const getCustomersError = (state) => state.error;
