import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { candidate, candidates, ListCardTypes } from "../../types/types";

export const ListCard: React.FC<ListCardTypes> = ({
  key,
  href,
  headingOne,
  subHeadingTitle,
  subHeading,
  description,
  children,
}) => {
  return (
    <li key={key}>
      <Link to={href}>
        <div
          id="card"
          className="border-2 border-gray-300 rounded-lg shadow-md shadow-gray-500 px-2 py-2 flex flex-col gap-2"
        >
          <div className="">
            <h1 className="text-lg font-semibold">{headingOne}</h1>
            <p className="text-gray-500 text-xs">
              {`${subHeadingTitle}: ${subHeading}`}
            </p>
          </div>
          {children ? (
            <div className="text-xs flex gap-1">
              kandidat:
              {children}
            </div>
          ) : (
            <p className="text-xs">{description}</p>
          )}
        </div>
      </Link>
    </li>
  );
};

export const CandidatesCard: React.FC<{
  key: number;
  hasVoted: boolean | undefined;
  handleModal: (arg: FormEvent) => void;
  candidate: candidate;
}> = ({ key, candidate, hasVoted, handleModal }) => {
  return (
    <li
      key={key}
      className="grow md:basis-1/3 md:max-w-[30%] rounded-xl outline-1 outline outline-slate-400 px-2 pt-6 pb-4 flex flex-col gap-2 shadow-xl min-h-[300px] relative"
    >
      <p className="absolute text-xs text-slate-300 right-0 top-0 p-2 -z-10">
        candidateId: {candidate._id}
      </p>
      <div id="candidateCard" className="flex flex-col gap-2 grow">
        {candidate.image?.url && (
          <div id="imgwrapper">
            <img
              className="max-h-[150px] object-contain"
              src={candidate.image.url}
              alt={`${candidate.calonKetua}-${candidate.calonWakil}`}
            />
          </div>
        )}

        <div id="title" className="flex flex-col text-center">
          <h1>{candidate.calonKetua}</h1>
          {candidate.calonWakil && (
            <>
              &amp;<h1>{candidate.calonWakil}</h1>
            </>
          )}
        </div>
        <div id="description" className="grow">
          <h2>description:</h2>
          <p
            id="description"
            className="max-h-[200px] overflow-auto rounded-md"
          >
            {candidate.description}
          </p>
        </div>
        {!hasVoted && (
          <button
            data-ketua={candidate.calonKetua}
            data-wakil={candidate.calonWakil}
            id={candidate._id}
            className="bg-blue-600 text-white px-2 py-1 rounded-xl self-center"
            onClick={(e) => handleModal(e)}
          >
            Vote
          </button>
        )}
      </div>
    </li>
  );
};
