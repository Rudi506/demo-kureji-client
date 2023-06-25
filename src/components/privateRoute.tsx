import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken, setAccessToken } from "../utils/accesstoken";
import { api } from "../../utils/api";
import { Loader } from "./Loader";

const PrivateRoute: React.FC<any> = () => {
  const [loading, setLoading] = useState(true);
  const accessToken = getAccessToken();

  useEffect(() => {
    api
      .post("/refresh_token")
      .then((result) => {
        const { token } = result.data;
        setAccessToken(token);
        setLoading(false);
      })
      .catch((err) => err && setLoading(false));
  }, []);

  setInterval(() => {
    if (accessToken) {
      api
        .post("/refresh_token")
        .then((result) => {
          const { token } = result.data;
          setAccessToken(token);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, 1000 * 60 * 9.9);

  if (loading) return <Loader />;

	return accessToken ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute;

