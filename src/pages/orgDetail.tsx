import { SetStateAction, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { orgDetail } from "../../types/types";
import { api } from "../../utils/api";
import { AddMemberModal } from "../components/addMember";
import { Navbar } from "../components/navbar";

export const OrgDetail: React.FC = () => {
  const { id } = useParams();
  const [Data, setData] = useState<orgDetail>();
  const [Loading, setLoading] = useState<boolean>(true);
  const [isMemberModalOpen, setMemberModalOpen] = useState<boolean>(false);

  useEffect(() => {
    api
      .get(`/org/${id}`)
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  Loading && <p>Loading...</p>;

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="px-5 py-3 w-screen flex flex-col gap-y-14 relative min-h-screen">
          <div id="head">
            <h1 className="text-xl">{Data?.organization}</h1>
            <p className="leading-loose">{Data?.description}</p>
          </div>

          <div id="activeEvents" className="flex flex-col gap-6">
            <div id="header2" className="flex justify-between">
              <h2 className="text-lg underline-offset-1 underline text-gray-700">
                Active Event
              </h2>
              <Link
                to={`/org/${id}/create_event`}
                className="px-2 py-1 bg-blue-700 text-white rounded-xl text-md font-semibold"
              >
                &#43; Event
              </Link>
            </div>
            <ul>
              {!Data?.voteEvents.length && <p>Belum ada vote event</p>}
              {Data?.voteEvents.map((v, i) => (
                <li key={i}>vote event</li>
              ))}
            </ul>
          </div>

          <div id="members" className="flex flex-col gap-6">
            <div id="header2" className="flex justify-between">
              <h2 className="text-lg underline-offset-1 underline text-gray-700">
                members
              </h2>
              <button
                className="px-2 py-1 bg-blue-700 text-white rounded-xl text-md font-semibold"
                onClick={() =>
                  isMemberModalOpen
                    ? setMemberModalOpen(false)
                    : setMemberModalOpen(true)
                }
              >
                {isMemberModalOpen ? "✖ close" : <p>&#43; member</p>}
              </button>
            </div>
            <AddMemberModal isOpen={isMemberModalOpen} />

            <ul>
              {Data?.members.map((v: { name: String }, i) => (
                <li
                  className="flex my-auto justify-between items-center"
                  key={i}
                >
                  <p>{v.name} </p>
                  {v.name === Data.admin.name && (
                    <p className="p-1 px-2 bg-yellow-500 rounded-xl text-gray-700">
                      {" "}
                      admin
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
