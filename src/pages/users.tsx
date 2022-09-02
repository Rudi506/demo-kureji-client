import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Navbar } from "../components/navbar";
import { getAccessToken, setAccessToken } from "../utils/accesstoken";

function Users() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [Count, setCount] = useState(0);
  const [isLogedOut, setIsLogedOut] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();

    api
      .get("/users", {
        headers: {
          "auth-token": accessToken ? `Bearer ${getAccessToken()}` : "",
        },
      })
      .then((result) => {
        return setData(result.data.msg);
        // setData(result);
      })
      .catch((err) => {
        setError(err.response.data);
        // err.response.status === 401 && <Navigate to={"/"} />;
      });
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      setCount(Count + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [Count]);

  const Logout = () => {
    api
      .post(`/logout`)
      .then((result) => {
        setAccessToken("");
        location.reload();
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="flex h-screen">
        <Navbar />
        <div className="px-5 py-3 w-full relative border-black border-2">
          <button className=" absolute right-10 top-5 w-12 h-12 rounded-full drop-shadow-lg hover:drop-shadow-[0px_2px_2px_rgba(60,60,165,1)] outline outline-1 outline-slate-400 bg-white group">
            <div className="w-6 h-6 m-auto fill-slate-400 group-hover:fill-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                <path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
              </svg>
            </div>
          </button>
          <p>{Count}</p>
          <button onClick={Logout}>LOGOUT</button>
          <h1>Users</h1>
          {data &&
            data.map((v: { name: String }, i) => <p key={i}>{v.name}</p>)}
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Users;
