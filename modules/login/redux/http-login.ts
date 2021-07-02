import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3400/",
  headers: {
    "Content-type": "application/json",
  },
});
