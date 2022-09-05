import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { user } from "../../types/types";
import { api } from "../../utils/api";
import { ListComponent } from "../components/ListComponent";
import { Loader } from "../components/Loader";
import { LogoutModal } from "../components/modalBox";
import { Navbar } from "../components/navbar";
import { getAccessToken, setAccessToken } from "../utils/accesstoken";

function Users() {
  const [error, setError] = useState(null);
  const [User, setUser] = useState<user>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();
    setisLoading(true);
    api
      .get("/user", {
        headers: {
          "auth-token": accessToken ? `Bearer ${getAccessToken()}` : "",
        },
      })
      .then(({ data }) => {
        const user = data.result;
        setUser(user);
        setisLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setisLoading(false);
      });
  }, []);

  const Logout = () => {
    api
      .post(`/logout`)
      .then((result) => {
        setAccessToken("");
        location.reload();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log(User);
  }, [User]);

  return (
    <>
      <div className="flex h-screen">
        <Navbar />
        {isLoading && <Loader />}
        <div
          className={`${
            isLoading && "hidden"
          } px-5 py-3 pb-32 w-screen relative flex flex-col gap-5 min-h-screen overflow-auto`}
        >
          <LogoutModal
            isOpen={isModalOpen}
            reqCloseBtn={(reqClose) => setIsModalOpen(reqClose)}
            msg={"yakin ingin keluar?"}
            callFunction={Logout}
          />
          <button
            className=" absolute right-5 top-5 w-12 h-12 rounded-full drop-shadow-lg hover:drop-shadow-[0px_2px_2px_rgba(60,60,165,1)] outline outline-1 outline-slate-400 bg-white group"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-6 h-6 m-auto fill-slate-400 group-hover:fill-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                <path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
              </svg>
            </div>
          </button>
          <div id="head" className="py-5">
            <h1 className="text-3xl font-semibold ">{User?.name}</h1>
            <p>{User?.email}</p>
            <p className="text-xs py-2 text-slate-400">user id: {User?._id}</p>
          </div>
          <div id="voteParticipation">
            <h1 className="text-lg font-semibold">Vote Participated In</h1>
            <ul className="border-b-2 border-slate-400 pb-5">
              {!User?.voteParticipation.length ? (
                <>Anda belum pernah berpartisipasi dalam voting</>
              ) : (
                User?.voteParticipation.map((v, i) => (
                  <ListComponent key={i}>
                    <Link
                      className="w-full h-full"
                      to={`/org/${v.holder._id}/event/${v._id}`}
                    >
                      <h1 className="text-md font-semibold">{v.voteTitle}</h1>
                      <p>holder: {v.holder.organization}</p>
                    </Link>
                  </ListComponent>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
