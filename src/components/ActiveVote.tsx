import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { getAccessToken } from "../utils/accesstoken";
import { user, voteEvents } from "../../types/types";
import { CardLoader } from "./Loader";
import { ListCard } from "./ListCard";
import { MainHeading } from "./Heading";

export const VoteEvent: React.FC = () => {
  const [eventList, setEventList] = useState<voteEvents[]>();
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
        const {
          organization,
          _id: userId,
        }: { organization: user["organization"]; _id: string } =
          result.data.result;
        setLoading(false);
        setEventList(
          organization
            .map((v) => {
              return v.voteEvents;
            })
            .flat()
            .filter((v: voteEvents) => {
              const isExists = v.registeredVoters
                .map((voters) => {
                  // @ts-ignore: Unreachable code error
                  return voters.voter === userId;
                })
                .includes(true);
              if (v.isActive && isExists) return v;
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
      <div className="flex flex-col gap-5">
        <MainHeading>Active Vote</MainHeading>
        <ul className="flex flex-col gap-3">
          {Loading ? (
            <CardLoader />
          ) : !eventList?.length ? (
            <p className="text-slate-400">No active voting currently</p>
          ) : (
            eventList.map((v, i) => (
              <ListCard
                key={i}
                href={`/org/${v.holder._id}/event/${v._id}`}
                headingOne={v.voteTitle}
                subHeadingTitle={`organization`}
                subHeading={v.holder.organization}
                children={v.candidates.map((v, i) => (
                  <p key={i} className="even:before:content-['_vs_']">
                    {v.calonKetua} &amp; {v.calonWakil}
                  </p>
                ))}
                description={""}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
};
