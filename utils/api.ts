import axios from "axios";

export const api = axios.create({
<<<<<<< HEAD
  // baseURL: ``demo-kureji-server-production.up.railway.app`,
  baseURL: `https://demo-kureji-server-production.up.railway.app`,
=======
  baseURL: `http://localhost:3000`,
>>>>>>> 8bb40b2 (change login interface)
  withCredentials: true,
});
// this file is curently ignored in gitignore
