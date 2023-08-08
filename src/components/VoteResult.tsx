import { useEffect } from "react";
import { eventDetail } from "../../types/types";
import { ChartVote } from "./ChartVote";
import { SubHeading } from "./Heading";

export const VoteResult: React.FC<{
  eventData: eventDetail;
  sumVoted: number;
}> = ({ eventData, sumVoted }) => {
  const minPercent = 30;
  const percentVoted = Number(
    ((sumVoted / eventData?.registeredVoters.length) * 100).toFixed(1)
  );
  const isThirty = percentVoted >= minPercent ? true : false;

  useEffect(() => {
    console.log(percentVoted);
  }, []);

  return (
    <div id="result">
      <SubHeading>Result</SubHeading>
      <p>
        vote Collected: {sumVoted}/{eventData.registeredVoters.length} ({" "}
        {percentVoted}% )
      </p>
      {!isThirty && (
        <p>Grafik akan muncul setelah jumlah vote mencapai {minPercent}%</p>
      )}
      <div
        className={`${!isThirty && "hidden"} w-full p-5 flex justify-center`}
      >
        <div
          id="char-wrapper"
          className="w-full h-full md:w-1/4 md:h-1/4 border-black border-1"
        >
          <ChartVote
            data={{
              candidates: eventData.candidates,
              voter: eventData.registeredVoters,
            }}
          />
        </div>
      </div>
    </div>
  );
};
