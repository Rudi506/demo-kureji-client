
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { api } from "../../utils/api";

function SignUp() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>();

	const redirect = () => {
		navigate("/login");
	};

	const handleSubmit = async(values: {email: string, name: string, password: string, confirmPw: string}) => {
		console.log(values)
    return api
      .post("/register_user", values)
      .then(() => {
				toast.success('Berhasil membuat akun');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
	};

  return (
    <>
      <div className="min-h-screen mx-auto md:flex justify-center font-inter bg-gradient-to-tr from-sky-900 via-sky-700 to-fuchsia-600">
				<div className="container self-center flex justify-center">
					<div className="flex w-3/4 rounded-xl overflow-hidden drop-shadow-2xl " >
						<div id="left" className="w-full bg-white flex flex-col gap-10 items-center py-10 justify-center">
							<h1 className="text-2xl font-medium">Sign Up</h1>
							<div className="w-1/2">
								<Form onFinish={handleSubmit} layout="vertical" className="flex flex-col">
									<Form.Item name="email" label="user email" required>
										<Input placeholder="User Email" />
									</Form.Item>
									<Form.Item name="name" label="Nama Lengkap" required>
										<Input placeholder="nama lengkap" />
									</Form.Item>
									<Form.Item name="password" label="password" required>
										<Input.Password autoComplete="new-password" placeholder="password" required />
									</Form.Item>
									<Form.Item name="confirmPw" label="confirm password" required>
										<Input.Password autoComplete="new-password" placeholder="confirm password" required />
									</Form.Item>
									<Button type="primary" className="bg-blue-400 mt-4 font-medium" loading={loading} size="large" htmlType="submit" shape="round">Sign Up</Button>
								</Form>
							</div>
						</div>
						<div id="right" className="w-full bg-blue-500 flex flex-col justify-center items-center gap-3">
							<div className="text-white font-medium text-center flex flex-col gap-3">
								<h1 className="text-2xl">Sign In</h1>
								<p className="text-sm">Sign In here if you already have an account</p>
							</div>
							<Button shape="round" htmlType="button" type="default" className="bg-white text-blue-500 font-bold" size="large" onClick={redirect}>Sign In</Button>
						</div>
					</div>
				</div>
      </div>
    </>
  );
}

export default SignUp;
