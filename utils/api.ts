import axios from "axios";

export const api = axios.create({
  // baseURL: ``demo-kureji-server-production.up.railway.app`,
  baseURL: `https://demo-kureji-server-production.up.railway.app`,
  withCredentials: true,
});
// this file is curently ignored in gitignore
