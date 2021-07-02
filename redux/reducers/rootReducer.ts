import { combineReducers } from "redux";
import { categoryReducer } from "../../modules/categories/redux/category.reducer";
import { customerReducer } from "../../modules/customers/redux/customer.reducer";
import { userReducer } from "../../modules/login/redux/login.reducer";
import { projectReducer } from "../../modules/projects/redux/project.reducer";

const rootReducer = combineReducers({
  customers: customerReducer,
  categorys: categoryReducer,
  projects: projectReducer,
  users: userReducer,
});

export default rootReducer;
