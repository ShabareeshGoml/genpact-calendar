import axios from "axios";
axios.defaults.withCredentials = true;
const axiosBase = axios.create({
  // Set your base URL here (optional)
  baseURL: process.env.NEXT_PUBLIC_END_POINT,

  // Add other default configurations if needed (e.g., headers)
});

export default axiosBase;
