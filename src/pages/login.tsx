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
      </div>
    </>
  );
}

export default Login;
