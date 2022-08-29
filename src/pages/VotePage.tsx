import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { eventDetail } from "../../types/types";
import { api } from "../../utils/api";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/navbar";
import { getAccessToken } from "../utils/accesstoken";

export const VotePage = () => {
  const { orgId, eventId } = useParams();

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
    createdAt: new Date(),
  });
  const [IsAdmin, setIsAdmin] = useState(false);
  const [CreatedAt, setCreatedAt] = useState<Date>();
  const [Loading, setLoading] = useState(true);
  const [NumberHasVote, setNumberHasVote] = useState<number>(0);
  const [HasVoted, setHasVoted] = useState<boolean>();

  const accessToken = getAccessToken();
  useEffect(() => {
    api
      .get(`/org/${orgId}/event/${eventId}`, {
        headers: {
          "auth-token": accessToken ? `Bearer ${accessToken}` : "",
        },
      })
      .then(
        (result: {
          data: { result: eventDetail; isAdmin: boolean; hasVoted: boolean };
        }) => {
          console.log({ name: "first fetch", result });
          const { result: data, isAdmin, hasVoted } = result.data;
          setHasVoted(hasVoted);
          setIsAdmin(isAdmin);
          setData(data);
          setCreatedAt(data.createdAt);
          setLoading(false);
          setNumberHasVote(
            data.registeredVoters.filter((v) =>
              v.hasVoted ? v.hasVoted : null
            ).length
          );
        }
      )
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const voteHandler = (candidateId: string) => {
    api
      .put(
        `/vote/${eventId}`,
        { candidateId },
        {
          headers: {
            "auth-token": accessToken ? `Bearer ${accessToken}` : "",
          },
        }
      )
      .then((result) => {
        console.log({ name: "VoteHandler", result });
        const {
          result: data,
          hasVoted,
        }: { result: eventDetail; hasVoted: boolean } = result.data;
        setData(data);
        setCreatedAt(data.createdAt);
        setLoading(false);
        setHasVoted(hasVoted);
        setNumberHasVote(
          data.registeredVoters.filter((v) => (v.hasVoted ? v.hasVoted : null))
            .length
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const voteColectedPercent = Number(
    ((NumberHasVote / Data.registeredVoters.length) * 100).toFixed(1)
  );

  return (
    <>
      <div className="flex">
        <Navbar />
        {Loading && <Loader />}
        <div
          className={`${
            Loading && "hidden"
          } max-h-screen min-h-screen px-5 py-3 pb-32 overflow-auto w-screen flex flex-col gap-10 relative`}
        >
          <p className="absolute right-0 top-0 px-2 text-xs -z-10 text-slate-300">
            EventId: {Data?._id}
          </p>

          <div id="header" className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{Data?.voteTitle}</h1>
            <div id="info_wraper">
              <h3>Organization: {Data?.holder.organization}</h3>
              <p>Participants: {Data?.registeredVoters.length}</p>
              {HasVoted ? (
                <p className="text-green-500 font-semibold">You have voted</p>
              ) : (
                <p className="text-blue-500 font-semibold">
                  You can now vote, please use your vote.
                </p>
              )}
            </div>
          </div>

          <div id="candidateCards" className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold">Candidates:</h2>
            <ul className="flex flex-col md:flex-row flex-wrap gap-10 justify-center">
              {Data?.candidates.map((v, i) => (
                <li
                  key={i}
                  className="grow md:basis-1/3 md:max-w-[30%] rounded-xl outline-1 outline outline-slate-400 px-2 pt-6 pb-4 flex flex-col gap-2 shadow-xl min-h-[300px] relative"
                >
                  <p className="absolute text-xs text-slate-300 right-0 top-0 p-2 -z-10">
                    candidateId: {v._id}
                  </p>
                  <div id="candidateCard" className="flex flex-col gap-2 grow">
                    <div id="title" className="flex flex-col text-center">
                      <h1>{v.calonKetua}</h1>
                      &amp;
                      <h1>{v.calonWakil}</h1>
                    </div>
                    <div id="description" className="grow">
                      <h2>description:</h2>
                      <p
                        id="description"
                        className="max-h-[200px] overflow-auto rounded-md"
                      >
                        {v.description}
                      </p>
                    </div>
                    {!HasVoted && (
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded-xl self-center"
                        onClick={() => voteHandler(v._id)}
                      >
                        Vote
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div id="voters">
            <h2 className="text-xl font-semibold">Result</h2>
            <p>
              vote Collected: {NumberHasVote}/{Data.registeredVoters.length} ({" "}
              {voteColectedPercent}% )
            </p>
            {HasVoted && voteColectedPercent >= 30 && (
              <div className="w-full">
                hehehhe
                {Data.candidates.map((v, i) => (
                  <li key={i}>
                    {v.calonKetua} {v.numOfVotes}
                  </li>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
