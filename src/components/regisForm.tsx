import React, { HTMLInputTypeAttribute, useState } from "react";
import { api } from "../../utils/api";

function Register() {
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [form, setForm] = useState<{
    email: HTMLInputTypeAttribute;
    name: HTMLInputTypeAttribute;
    password: HTMLInputTypeAttribute;
    confirmPw: HTMLInputTypeAttribute;
  }>({
    email: "",
    name: "",
    password: "",
    confirmPw: "",
  });
  const [msg, setMsg] = useState({ form: "", msg: "" });
  const [anim, setAnim] = useState(false);

  const handleChange = (e: {
    target: { value: HTMLInputTypeAttribute; name: HTMLInputTypeAttribute };
  }) => {
    const { value, name } = e.target;
    setForm((prevState) => {
      if (name === "email")
        return {
          email: value,
          name: prevState.name,
          password: prevState.password,
          confirmPw: prevState.confirmPw,
        };
      if (name === "name")
        return {
          email: prevState.email,
          name: value,
          password: prevState.password,
          confirmPw: prevState.confirmPw,
        };
      if (name === "password")
        return {
          email: prevState.email,
          name: prevState.name,
          password: value,
          confirmPw: prevState.confirmPw,
        };
      if (name === "confirmPw")
        return {
          email: prevState.email,
          name: prevState.name,
          password: prevState.password,
          confirmPw: value,
        };
      return { email: value, name: value, password: value, confirmPw: value };
    });
  };

  const showPwTwo = () => {
    return showPw2 ? (
      <>
        <p onClick={() => setShowPw2(false)}>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z" />
          </svg>
        </p>
      </>
    ) : (
      <>
        <p onClick={() => setShowPw2(true)}>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
          </svg>
        </p>
      </>
    );
  };
  const showPwOne = () => {
    return showPw1 ? (
      <>
        <p onClick={() => setShowPw1(false)}>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z" />
          </svg>
        </p>
      </>
    ) : (
      <>
        <p onClick={() => setShowPw1(true)}>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
          </svg>
        </p>
      </>
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnim(true);
    return api
      .post("/register_user", form)
      .then(() => {
        setMsg({ form: "form", msg: "register berhasil" });
      })
      .catch((err) => {
        console.log(err);
        setMsg({ form: err.response.data.form, msg: err.response.data.msg });
        setTimeout(() => {
          setMsg({ form: "", msg: "" });
        }, 3000);
      });
  };

  return (
    <>
      {msg.form === "form" && (
        <p
          className={`absolute py-3 px-5 bg-green-400 font-semibold text-white right-2 md:right-0 rounded-xl gap-x-5 flex transition-[top] ease-in-out ${
            anim ? "top-2" : "-top-20"
          }`}
        >
          {msg.msg}
          <button onClick={() => setAnim(false)}>✖</button>
        </p>
      )}

      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        id="registerForm"
        className="p-5 flex flex-col gap-4 border-b-2 border-x-2 relative"
      >
        <div id="emailInput" className="flex flex-col relative">
          {msg.form === "email" && (
            <p className="text-rose-700 p-1 absolute right-0 top-0">
              {msg.msg}
            </p>
          )}
          <label htmlFor="email">email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
          />
        </div>
        <div id="emailInput" className="flex flex-col">
          <label htmlFor="name">name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Firstname Lasname"
            className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
          />
        </div>
        <div id="passwordInput" className="flex flex-col relative">
          {msg.form === "password" && (
            <p className="text-rose-700 p-1 absolute right-0 top-0">
              {msg.msg}
            </p>
          )}
          <label htmlFor="password">password:</label>
          <input
            minLength={6}
            type={showPw1 ? "text" : "password"}
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="******"
            className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
          />
          <div className="absolute right-1 bottom-2 fill-gray-400 cursor-pointer">
            {showPwOne()}
          </div>
        </div>
        <div id="confirmPwInput" className="flex flex-col relative">
          <label htmlFor="confirmPw">confirm password:</label>
          <input
            minLength={6}
            type={showPw2 ? "text" : "password"}
            name="confirmPw"
            id="confirmPw"
            value={form.confirmPw}
            onChange={handleChange}
            placeholder="******"
            className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
          />
          <div className="absolute right-1 bottom-2 fill-gray-400 cursor-pointer">
            {showPwTwo()}
          </div>
        </div>

        <button
          className="bg-sky-500 text-white drop-shadow-md rounded-xl w-fit p-2 px-5 my-2 self-end font-bold hover:bg-sky-600"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
}

export default Register;