import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { eventDetail } from "../../types/types";
import { api } from "../../utils/api";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/navbar";
import { getAccessToken } from "../utils/accesstoken";
import { VoteResult } from "../components/VoteResult";

export const EventDetail = () => {
  const { eventId, orgId } = useParams();
  const [Data, setData] = useState<eventDetail>({
    _id: "",
    voteTitle: "",
    holder: { _id: "", organization: "" },
    isActive: false,
    candidates: [
      {
        _id: "",
        calonKetua: "",
        calonWakil: "",
        description: "",
        numOfVotes: 0,
      },
    ],
    registeredVoters: [{ voter: { name: "" }, hasVoted: false }],
    createdAt: "",
  });
  const [Loading, setLoading] = useState(true);
  const [activateLoading, setActivateLoading] = useState(false);
  const [CreatedAt, setCreatedAt] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [NumberHasVote, setNumberHasVote] = useState<number>(0);
  const milis = Date.parse(CreatedAt);
  const date = new Date(milis).toUTCString();

  const accessToken = getAccessToken();

  useEffect(() => {
    api
      .get(`/org/${orgId}/event/${eventId}`, {
        headers: {
          "auth-token": accessToken ? `Bearer ${accessToken}` : "",
        },
      })
      .then((result) => {
        const {
          result: data,
          isAdmin,
          isUserRegistered,
        }: {
          result: eventDetail;
          isAdmin: boolean;
          isUserRegistered: boolean;
        } = result.data;
        setIsUserRegistered(isUserRegistered);
        setIsAdmin(isAdmin);
        setData(data);
        setCreatedAt(data.createdAt);
        setLoading(false);
        setNumberHasVote(
          data.registeredVoters.filter((v) => (v.hasVoted ? v.hasVoted : null))
            .length
        );
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const toggleActiveEvent = (e: FormEvent) => {
    e.preventDefault();
    const toggleActive = Data?.isActive ? false : true;
    setActivateLoading(true);
    api
      .put(
        `/org/${orgId}/event/${eventId}/start`,
        { isActive: toggleActive },
        {
          headers: {
            "auth-token": accessToken ? `Bearer ${accessToken}` : "",
          },
        }
      )
      .then((result) => {
        const { result: data } = result.data;
        setActivateLoading(false);
        setData(data);
      })
      .catch((err) => {
        setActivateLoading(false);
        console.error(err.response.data);
      });
  };

  return (
    <>
      <div className="flex">
        <Navbar />
        {Loading && <Loader />}
        <div
          className={`${
            Loading && "hidden"
          } max-h-screen px-5 py-3 w-screen flex flex-col gap-6 overflow-auto pb-32`}
        >
          <div id="header" className="relative flex flex-col md:flex-row">
            <div id="kiri" className="grow">
              <h1 className="text-2xl font-bold text-gray-600">
                {Data?.voteTitle}
              </h1>
              <p>Created at: {date}</p>
              <h3>Organization: {Data?.holder?.organization}</h3>
              <div className="flex gap-1">
                <p>status:</p>
                <p
                  className={`${
                    Data?.isActive ? "text-green-500" : "text-red-600"
                  } font-semibold`}
                >
                  {" "}
                  {Data?.isActive ? "aktif" : "inaktif"}
                </p>
              </div>
              <h3 className="text-gray-400 md:absolute md:right-0 md:top-0 text-xs -z-10">
                eventId: {Data?._id}
              </h3>
            </div>
            <div id="kanan" className="pt-5 md:pt-0 flex self-end gap-2">
              {!isUserRegistered
                ? null
                : Data?.isActive && (
                    <Link
                      to={`/org/${orgId}/vote/${eventId}`}
                      className={`bg-blue-600 rounded-xl px-5 p-2 text-white text-center`}
                    >
                      Vote
                    </Link>
                  )}
              {isAdmin && (
                <button
                  onClick={toggleActiveEvent}
                  className={`${
                    Data?.isActive
                      ? "bg-red-600 hover:bg-red-700"
                      : `bg-blue-700 hover:bg-blue-800`
                  } rounded-xl text-white  p-2 h-fit self-end`}
                >
                  {activateLoading ? (
                    <svg
                      className="w-5 h-5 animate-spin fill-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                      <path d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z" />
                    </svg>
                  ) : Data?.isActive ? (
                    "Akhiri Voting"
                  ) : (
                    "Mulai Voting"
                  )}
                </button>
              )}
            </div>
          </div>
          <div id="candidates">
            <h2 className="text-lg font-semibold pb-1">Candidates</h2>
            <ul className="border-b-2 border-slate-400">
              {Data?.candidates.map((v, i) => (
                <li key={i} className={`odd:bg-slate-200  p-2`}>
                  <div id="candidate" className="flex gap-2">
                    <p>Kandidat:</p>
                    <h2 className="flex gap-1">
                      {v.calonKetua} {v.calonWakil && <p>&amp;</p>}{" "}
                      {v.calonWakil}
                    </h2>
                  </div>
                  <div id="description" className="flex gap-2">
                    <p>description: </p>
                    <p>{v.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div id="voters">
            <h2 className="text-lg font-semibold pb-1">Participants</h2>
            <ul className="border-b-2 border-slate-400">
              {Data?.registeredVoters.map((v, i) => (
                <li key={i} className={`odd:bg-slate-300 p-2`}>
                  {v.voter.name}
                </li>
              ))}
            </ul>
          </div>
          <VoteResult eventData={Data} sumVoted={NumberHasVote} />
        </div>
      </div>
    </>
  );
};
