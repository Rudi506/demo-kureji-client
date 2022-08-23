import { useEffect, useState } from "react";
import Login from "./pages/login";
import { getAccessToken, setAccessToken } from "./utils/accesstoken";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./pages/users";
import { api } from "../utils/api";
import { Home } from "./pages/Home";
import { Organization } from "./pages/organization";
import { OrgDetail } from "./pages/orgDetail";
import { AddEvent } from "./pages/AddEvent";
import { EventDetail } from "./pages/EventDetail";

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

  setTimeout(() => location.reload(), 1000 * 60 * 8);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!getAccessToken() ? <Login /> : <Home />} />
        <Route
          path="/users"
          element={getAccessToken() ? <Users /> : <Navigate to={"/"} />}
        />
        <Route
          path="/org"
          element={getAccessToken() ? <Organization /> : <Navigate to={"/"} />}
        />
        <Route
          path="/org/:orgId"
          element={getAccessToken() ? <OrgDetail /> : <Navigate to={"/"} />}
        />
        <Route
          path="/org/:orgId/create_event"
          element={getAccessToken() ? <AddEvent /> : <Navigate to={"/"} />}
        />
        <Route
          path="/org/:orgId/event/:eventId"
          element={getAccessToken() ? <EventDetail /> : <Navigate to={"/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
