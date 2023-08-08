import axios from "axios";

export const api = axios.create({
  // baseURL: ``demo-kureji-server-production.up.railway.app`,
  baseURL: `http://localhost:3000`,
  withCredentials: true,
});
// this file is curently ignored in gitignore
