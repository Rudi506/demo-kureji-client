import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { eventDetail } from "../../types/types";
import { api } from "../../utils/api";
import { SubHeading } from "../components/Heading";
import { CandidatesCard } from "../components/ListCard";
import { Loader } from "../components/Loader";
import { ModalBox } from "../components/modalBox";
import { Navbar } from "../components/navbar";
import { getAccessToken } from "../utils/accesstoken";

export const VotePage: React.FC = () => {
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
    createdAt: "",
  });
  const [IsAdmin, setIsAdmin] = useState(false);
  const [CreatedAt, setCreatedAt] = useState<string>();
  const [Loading, setLoading] = useState(true);
  const [HasVoted, setHasVoted] = useState<boolean>();
  const [IsModalBoxOpen, setIsModalBoxOpen] = useState<boolean>(false);
  const [candidate, setCandidate] = useState<{
    id: string;
    ketua: string;
    wakil: string;
  }>({ id: "", ketua: "", wakil: "" });

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
          const { result: data, isAdmin, hasVoted } = result.data;
          setHasVoted(hasVoted);
          setIsAdmin(isAdmin);
          setData(data);
          setCreatedAt(data.createdAt);
          setLoading(false);
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
        const {
          result: data,
          hasVoted,
        }: { result: eventDetail; hasVoted: boolean } = result.data;
        setData(data);
        setCreatedAt(data.createdAt);
        setLoading(false);
        setHasVoted(hasVoted);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleModal = (e: React.ChangeEvent & any) => {
    const ketua = e.currentTarget.getAttribute("data-ketua");
    const wakil = e.currentTarget.getAttribute("data-wakil");
    setCandidate({ id: e.target.id, ketua, wakil });

    setIsModalBoxOpen(true);
  };

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
          <ModalBox
            isOpen={IsModalBoxOpen}
            reqCloseBtn={(close) => setIsModalBoxOpen(close)}
            data={candidate}
            submitVote={(id) => voteHandler(id)}
          />
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
            <SubHeading>Candidates:</SubHeading>
            <ul className="flex flex-col md:flex-row flex-wrap gap-10 justify-center">
              {Data?.candidates.map((v, i) => (
                <CandidatesCard
                  key={i}
                  candidate={v}
                  hasVoted={HasVoted}
                  handleModal={() => handleModal}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
