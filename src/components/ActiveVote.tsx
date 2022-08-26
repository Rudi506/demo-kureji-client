import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { getAccessToken } from "../utils/accesstoken";
import { eventDetail } from "../../types/types";
import { Link } from "react-router-dom";
import { CardLoader, Loader } from "./Loader";

export const VoteEvent: React.FC = () => {
  const [eventList, setEventList] = useState<eventDetail[]>([]);
  const [Loading, setLoading] = useState(true);
  const accessToken = getAccessToken();

  useEffect(() => {
    api
      .get("/user", {
        headers: {
          "auth-token": accessToken ? `Bearer ${accessToken}` : "",
        },
      })
      .then((result) => {
        const { organization } = result.data.result;
        setLoading(false);
        setEventList(
          organization
            .map((v: { voteEvents: { isActive: boolean } }) => {
              return v.voteEvents;
            })
            .flat()
            .filter((v: { isActive: boolean }) => {
              if (v.isActive) return v;
            })
        );
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* {Loading && <Loader />} */}
      <div className="px-5 py-3 w-screen flex flex-col gap-5">
        <h1 className="text-xl font-bold text-gray-500">Active Vote</h1>
        <ul className="flex flex-col gap-3">
          {Loading && <CardLoader />}
          {eventList.map((v, i) => (
            <li key={i}>
              <Link to={`/org/${v.holder._id}/event/${v._id}`}>
                <div
                  id="card"
                  className="border-2 border-gray-300 rounded-lg shadow-md shadow-gray-500 px-2 py-2 flex flex-col gap-2"
                >
                  <div className="">
                    <h1 className="text-lg font-semibold">{v.voteTitle}</h1>
                    <p className="text-gray-500 text-xs">
                      organization: {v.holder.organization}
                    </p>
                  </div>

                  <div className="text-xs flex gap-1">
                    kandidat:
                    {v.candidates.map((v, i) => (
                      <p key={i} className="even:before:content-['_vs_']">
                        {v.calonKetua} &amp; {v.calonWakil}
                      </p>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
