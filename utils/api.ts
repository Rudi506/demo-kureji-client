import axios from "axios";

export const api = axios.create({
<<<<<<< HEAD
<<<<<<< HEAD
  // baseURL: ``demo-kureji-server-production.up.railway.app`,
  baseURL: `https://demo-kureji-server-production.up.railway.app`,
=======
  baseURL: `http://localhost:3000`,
>>>>>>> 8bb40b2 (change login interface)
=======
  baseURL: `https://pilketosserver.herokuapp.com`,
>>>>>>> e955c2c0fc07f3138f10497b16444e1f9ff6163d
  withCredentials: true,
});
// this file is curently ignored in gitignore
