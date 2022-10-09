import { useState } from "react";
import LoginForm from "../components/loginForm";
import Register from "../components/regisForm";

function Login() {
  const [inOrup, setInOrUp] = useState("login");

  const renderForm = () => {
    if (inOrup === "login") {
      return <LoginForm />;
    }
    if (inOrup === "signup") {
      return <Register />;
    }
  };

  return (
    <div className="bg-gradient-to-t to-blue-700 from-blue-300">
      <div className="container min-h-screen mx-auto md:flex justify-between font-inter ">
        <div className="hidden lg:grow md:flex md:flex-col lg:flex align-middle w-3/4 lg:my-auto pr-3 lg:w-auto">
          <h1 className="text-center text-white m-auto h-fit w-fit font-semibold text-3xl -mt-20 pb-4">
            E-Voting SMK N 1 Kaligondang
          </h1>
          <img
            className=" lg:h-[60vh] w-full object-cover"
            src="http://smkn1kaligondang.sch.id/wp-content/uploads/IMG-20200710-WA0018-2.jpg"
            alt="Vote Img"
          />
        </div>
        <div className="relative max-w-md sm:self-end md:w-3/4 align h-screen flex items-center flex-col justify-center">
          <div
            id="form-wrapper"
            className="w-full grow flex flex-col justify-center"
          >
            <div id="wrap">
              <div className="text-center text-white md:hidden m-auto h-fit w-fit font-semibold text-3xl -mt-20 pb-4">
                <h1>E-Voting</h1>
                <h1>SMK N 1 Kaligondang</h1>
              </div>
              <div id="loginregis" className="flex justify-around">
                <button
                  onClick={() => setInOrUp("login")}
                  className={`font-semibold w-full rounded-t-xl  py-2 bg-gray-200 text-gray-400 ${
                    inOrup === "login" && "  bg-gray-500 text-white/100"
                  }`}
                >
                  <h2 className="text-2xl">Login</h2>
                </button>
                <button
                  onClick={() => setInOrUp("signup")}
                  className={`font-semibold w-full rounded-t-xl  py-2 bg-gray-200 text-gray-400 ${
                    inOrup === "signup" && "  bg-gray-500 text-white/100"
                  }`}
                >
                  <h2 className="text-2xl">Sign Up</h2>
                </button>
              </div>
              {renderForm()}
            </div>
          </div>
          <p className="text-white self-center p-5">
            &copy; copyright SMK N 1 Purbalingga
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
