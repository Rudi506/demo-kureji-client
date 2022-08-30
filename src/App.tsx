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
import { VotePage } from "./pages/VotePage";
import { Loader } from "./components/Loader";

function App() {
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

  if (loading) return <Loader />;

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!accessToken ? <Login /> : <Home />} />
        <Route
          path="/users"
          element={accessToken ? <Users /> : <Navigate to={"/"} />}
        />
        <Route
          path="/org"
          element={accessToken ? <Organization /> : <Navigate to={"/"} />}
        />
        <Route
          path="/org/:orgId"
          element={accessToken ? <OrgDetail /> : <Navigate to={"/"} />}
        />
        <Route
          path="/org/:orgId/create_event"
          element={accessToken ? <AddEvent /> : <Navigate to={"/"} />}
        />
        <Route
          path="/org/:orgId/event/:eventId"
          element={accessToken ? <EventDetail /> : <Navigate to={"/"} />}
        />
        <Route
          path="/org/:orgId/vote/:eventId"
          element={accessToken ? <VotePage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
