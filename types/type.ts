export interface Customer {
  id?: string;
  name?: string;
  description?: string;
  priority?: string;
  status?: number;
}

export interface Category {
  id?: string;
  name?: string;
  description?: string;
}
export interface Project {
  id?: string;
  name?: string;
  description?: string;
  kind?: string;
}

export interface User {
  id?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  gender?: string;
  emailForgotPassword?: string;
}

export interface Admin {}

export interface Project {}

export interface AppProps {
  customers?: Customer;
}

export interface ConfigRouter {
  path: string;
  name: string;
  icon: any;
}
