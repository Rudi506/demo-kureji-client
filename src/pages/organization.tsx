import { SetStateAction, useCallback, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Navbar } from "../components/navbar";
import { getAccessToken } from "../utils/accesstoken";
import { Link } from "react-router-dom";
import { DataMapped } from "../../types/types";
import { CreateOrgModal } from "../components/createOrg";

export const Organization: React.FC = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsOpen] = useState(false);
  const callback = useCallback((handle: SetStateAction<boolean>) => {
    setIsOpen(handle);
  }, []);

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

  const Loading = () => (
    <>
      <li>
        <div
          id="card"
          className="border-2 border-gray-300 rounded-lg shadow-md shadow-gray-500 px-2 py-2 flex flex-col gap-2"
        >
          <div className="w-full flex flex-col gap-1">
            <h1
              className={`text-lg font-semibold bg-gray-200 w-[53%] text-transparent`}
            >
              Oganization name
            </h1>
            <p className="text-gray-500 text-xs bg-gray-200 w-fit text-transparent">
              admin
            </p>
          </div>

          <p className="text-xs  bg-gray-200 leading-relaxed w-full text-transparent">
            lorem
          </p>
          <p className="text-xs  bg-gray-200 leading-relaxed w-[65%] text-transparent">
            lorem
          </p>
        </div>
      </li>
    </>
  );

  return (
    <>
      <div className="flex grow-1 ">
        <Navbar />
        <div className="px-5 py-3 w-screen flex flex-col gap-5 relative h-screen">
          <CreateOrgModal isOpen={isModalOpen} closeBtn={callback} />
          <button
            onClick={() => setIsOpen(true)}
            id="addBtn"
            className={`absolute md:bottom-7 bottom-24 right-0 mr-4 rounded-full shadow-lg shadow-blue-300 text-5xl font-extrabold bg-white justify-center items-center w-16 h-16 cursor-pointer ${
              isModalOpen ? "hidden" : "flex"
            }`}
          >
            <svg
              className="w-10 h-10 fill-blue-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
              <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-500">My Organization</h1>
          <ul className="flex flex-col gap-3">
            {loading && Loading()}
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
