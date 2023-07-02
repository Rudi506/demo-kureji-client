import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import { setAccessToken } from "../utils/accesstoken";

function Login() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>();

	const redirect = () => {
		navigate('/signup');
	};

	const handleSubmit = async(values: {email: string, password: string}) => {

    return api
      .post("/login", values)
      .then((result) => {
        if (result && result.data) setAccessToken(result.data.token);
        navigate("/");
				toast.success('Berhasil login');
        setLoading(false);
      })
      .catch((err) => {
				console.log(err);
        setLoading(false);
      });
	};

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <>
      <div className="min-h-screen mx-auto md:flex justify-center font-inter bg-gradient-to-tr from-sky-900 via-sky-700 to-fuchsia-600">
				<div className="container self-center flex justify-center">
					<div className="flex w-3/4 rounded-xl overflow-hidden drop-shadow-2xl " >
						<div id="left" className="w-full bg-white flex flex-col items-center py-10 justify-center">
							<h1 className="text-2xl font-medium">Sign In</h1>
							<div className="w-1/2">
								<Form onFinish={handleSubmit} layout="vertical" className="flex flex-col">
									<Form.Item name="email" label="email" required>
										<Input placeholder="User Email" />
									</Form.Item>
									<Form.Item name="password" label="password" required>
										<Input.Password autoComplete="new-password" placeholder="User Email" />
									</Form.Item>
									<Button type="primary" loading={loading} className="bg-blue-400 mt-4 font-medium" size="large" htmlType="submit" shape="round">Sign In</Button>
								</Form>
							</div>
						</div>
						<div id="right" className="w-full bg-blue-500 flex flex-col justify-center items-center gap-3">
							<div className="text-white font-medium text-center flex flex-col gap-3">
								<h1 className="text-2xl">Sign Up</h1>
								<p className="text-sm">Sign Up here if you don't have an account</p>
							</div>
							<Button shape="round" type="default" className="bg-white text-blue-500 font-bold" size="large" onClick={redirect}>Sign Up</Button>
						</div>
					</div>
				</div>
=======
=======
>>>>>>> e955c2c0fc07f3138f10497b16444e1f9ff6163d
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
>>>>>>> 8bb40b2 (change login interface)
      </div>
    </div>
  );
}

export default Login;
