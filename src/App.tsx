import { useEffect, useState } from "react";
import Login from "./pages/login";
import { getAccessToken, setAccessToken } from "./utils/accesstoken";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/users";
import { api } from "../utils/api";
import { Home } from "./pages/Home";
import { Organization } from "./pages/organization";

function App() {
  const [loading, setLoading] = useState(true);

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

  if (loading) return <>Loading...</>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!getAccessToken() ? <Login /> : <Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/org" element={<Organization />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
