import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { user } from "../../types/types";
import { api } from "../../utils/api";
import { ListComponent } from "../components/ListComponent";
import { Loader } from "../components/Loader";
import { DeleteModal, LogoutModal } from "../components/modalBox";
import { Navbar } from "../components/navbar";
import { SettingBtn } from "../components/SettingBtn";
import { getAccessToken, setAccessToken } from "../utils/accesstoken";

function Users() {
  const [error, setError] = useState(null);
  const [User, setUser] = useState<user>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [showDeleteModa, setShowDeleteModal] = useState(false);

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

          <div id="head" className="py-5 relative">
            <DeleteModal
              type="user"
              URI={`/user/${User?._id}`}
              deletedItem={User?.name || ""}
              showDeleteModal={showDeleteModa}
              reqCloseBtn={(arg) => setShowDeleteModal(arg)}
            >
              <p>
                Yakin ingin menghapus akun? <br /> tindakan ini akan menghapus
                akun dan kemungkinan menghapus organisasi yang anda kelola.
              </p>
            </DeleteModal>
            <SettingBtn
              showDeleteModal={(arg) => setShowDeleteModal(arg)}
              type="userpage"
              showModal={(arg) => setIsModalOpen(arg)}
            />
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
                  <ListComponent index={i}>
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
