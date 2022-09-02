import { SetStateAction, useCallback, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Navbar } from "../components/navbar";
import { getAccessToken } from "../utils/accesstoken";
import { Link } from "react-router-dom";
import { DataMapped } from "../../types/types";
import { CreateOrgModal } from "../components/createOrg";
import { CardLoader } from "../components/Loader";
import { SuccessModal } from "../components/modalBox";

export const Organization: React.FC = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsOpen] = useState(false);
  const callback = useCallback((handle: SetStateAction<boolean>) => {
    setIsOpen(handle);
  }, []);
  const [anim, setAnim] = useState(false);
  const [Msg, setMsg] = useState({ msg: "" });

  useEffect(() => {
    api
      .get("/org", {
        headers: { "auth-token": accessToken ? `Bearer ${accessToken}` : "" },
      })
      .then((result) => {
        const { data } = result.data;
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex grow-1 ">
        <Navbar />
        <div className="px-5 pb-32 py-3 w-screen flex flex-col gap-5 relative min-h-screen max-h-screen overflow-auto">
          <SuccessModal
            anim={anim}
            setAnim={(param) => setAnim(param)}
            msg={Msg}
          />
          <CreateOrgModal
            isOpen={isModalOpen}
            closeBtn={callback}
            setData={(data) => setData(data)}
            setMsg={(data) => setMsg({ msg: data })}
            setAnim={(bool) => setAnim(bool)}
          />
          <div id="header" className="flex justify-between">
            <h1 className="text-xl font-bold text-gray-500">My Organization</h1>
            <button
              onClick={() => setIsOpen(true)}
              id="addBtn"
              className={` rounded-xl bg-blue-500 text-white p-2 font-semibold hover:bg-blue-700 ${
                isModalOpen ? "hidden" : "flex"
              }`}
            >
              Create Organization
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            {loading && <CardLoader />}
            {!loading &&
              data.map((v: DataMapped, i) => (
                <li key={i}>
                  <Link to={`/org/${v._id}`}>
                    <div
                      id="card"
                      className="border-2 border-gray-300 rounded-lg shadow-md shadow-gray-500 px-2 py-2 flex flex-col gap-2"
                    >
                      <div className="">
                        <h1 className="text-lg font-semibold">
                          {v.organization}
                        </h1>
                        <p className="text-gray-500 text-xs">
                          admin: {v.admin.name}
                        </p>
                      </div>

                      <p className="text-xs">{v.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
