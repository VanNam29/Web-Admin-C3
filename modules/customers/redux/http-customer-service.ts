import http from "./http-customer";

const getAll = () => {
  return http.get("/customers");
};

const getAllParams = (params) => {
  return http.get("/customers", { params });
};

const get = (id) => {
  return http.get(`customers/${id}`);
};

const add = (customer) => {
  return http.post("/customers", customer);
};

const update = (id, customer) => {
  return http.put(`/customers/${id}`, customer);
};

const remove = (id) => {
  return http.delete(`/customers/${id}`);
};

const removeAll = () => {
  return http.delete("/customers");
};

const findByName = (name) => {
  return http.get(`/customers?name=${name}`);
};

export const httpCustomerService = {
  getAll,
  getAllParams,
  get,
  add,
  update,
  remove,
  removeAll,
  findByName,
};
