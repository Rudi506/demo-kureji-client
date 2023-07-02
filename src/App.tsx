import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Organization } from "./pages/organization";
import { OrgDetail } from "./pages/orgDetail";
import { AddEvent } from "./pages/AddEvent";
import { EventDetail } from "./pages/EventDetail";
import { VotePage } from "./pages/VotePage";
<<<<<<< HEAD
import SignUp from "./pages/signup";
import PrivateRoute from "./components/privateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./pages/users";
import { Home } from "./pages/Home";
=======
import { Loader } from "./components/Loader";
import EditCandidate from "./pages/editCandidate";
<<<<<<< HEAD
>>>>>>> 9fa303d (add edit candidate page)
=======
>>>>>>> e955c2c0fc07f3138f10497b16444e1f9ff6163d

function App() {

  return (
    <BrowserRouter>
			<ToastContainer theme="light" closeButton hideProgressBar={true} />
      <Routes>
<<<<<<< HEAD
				<Route path="/login" element={<Login/>} />
				<Route path="/signup" element={<SignUp/>} />
        <Route path="/" element={<PrivateRoute />} >
					<Route 
						path="/" 
						element={<Home/>} 
					/>
					<Route
						path="/users"
						element={<Users />}
					/>
					<Route
						path="/org"
						element={<Organization />}
					/>
					<Route
						path="/org/:orgId"
						element={<OrgDetail />}
					/>
					<Route
						path="/org/:orgId/create_event"
						element={<AddEvent />}
					/>
					<Route
						path="/org/:orgId/event/:eventId"
						element={<EventDetail />}
					/>
					<Route
						path="/org/:orgId/vote/:eventId"
						element={<VotePage />}
					/>
				</Route> 
=======
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
        <Route
          path="/org/:orgId/vote/:eventId/update/:candidateId"
          element={accessToken ? <EditCandidate /> : <Navigate to={"/"} />}
        />
<<<<<<< HEAD
>>>>>>> 9fa303d (add edit candidate page)
=======
>>>>>>> e955c2c0fc07f3138f10497b16444e1f9ff6163d
      </Routes>
    </BrowserRouter>
  );
}

export default App;
