import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { orgDetail } from "../../types/types";
import { api } from "../../utils/api";
import { ActiveEventList } from "../components/activeEventList";
import { AddMemberModal } from "../components/addMember";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/navbar";

export const OrgDetail: React.FC = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [Data, setData] = useState<orgDetail>();
  const [Loading, setLoading] = useState<boolean>(true);
  const [isMemberModalOpen, setMemberModalOpen] = useState<boolean>(false);

  useEffect(() => {
    api
      .get(`/org/${orgId}`)
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
        {Loading && <Loader />}
        <div
          className={`${
            Loading && "hidden"
          } px-5 py-3 w-screen flex flex-col gap-y-14 relative max-h-screen overflow-auto pb-24`}
        >
          <div id="head">
            <h1 className="text-xl">{Data?.organization}</h1>
            <p className="leading-loose">{Data?.description}</p>
          </div>

          <div id="activeEvents" className="flex flex-col gap-6">
            <div id="header2" className="flex justify-between">
              <h2 className="text-lg underline-offset-1 underline text-gray-700">
                Events
              </h2>
              <Link
                to={`/org/${orgId}/create_event`}
                className="px-2 py-1 bg-blue-700 text-white rounded-xl text-md font-semibold"
              >
                &#43; Event
              </Link>
            </div>
            <ActiveEventList orgId={orgId} activeList={Data?.voteEvents} />
          </div>

          <div id="members" className="flex flex-col gap-6">
            <div id="header2" className="flex justify-between">
              <div className="wrap flex items-center gap-3">
                <h2 className="text-lg underline-offset-1 underline text-gray-700">
                  members
                </h2>
                &#40;{Data?.members.length} anggota &#41;
              </div>
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
            <AddMemberModal isOpen={isMemberModalOpen} orgId={orgId} />
            <ul className="border-b-2 border-slate-400 pb-5">
              {Data?.members.map((v: { name: String }, i) => (
                <li
                  className="flex p-2 my-auto odd:bg-slate-300 justify-between items-center"
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
