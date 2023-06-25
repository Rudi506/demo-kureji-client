import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Organization } from "./pages/organization";
import { OrgDetail } from "./pages/orgDetail";
import { AddEvent } from "./pages/AddEvent";
import { EventDetail } from "./pages/EventDetail";
import { VotePage } from "./pages/VotePage";
import SignUp from "./pages/signup";
import PrivateRoute from "./components/privateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./pages/users";
import { Home } from "./pages/Home";

function App() {

  return (
    <BrowserRouter>
			<ToastContainer theme="light" closeButton hideProgressBar={true} />
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
