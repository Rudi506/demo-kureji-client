import { Link } from "react-router-dom";

export const ActiveEventList = ({
  activeList,
  orgId,
}: {
  activeList: [] | never | undefined;
  orgId: string | undefined;
}) => {
  return (
    <ul className="border-b-2 border-slate-400 pb-5">
      {!activeList?.length && <p>Belum ada vote event</p>}
      {activeList?.map(
        (
          v: { voteTitle: string; _id: string; isActive: boolean },
          i: number
        ) => (
          <li
            key={i}
            className={`flex p-2 my-auto odd:bg-slate-300 justify-between items-center`}
          >
            <Link to={`/org/${orgId}/event/${v._id}`}>{v.voteTitle}</Link>
            <p
              className={`${
                v.isActive ? "bg-green-400" : "bg-red-500"
              } rounded-xl p-1 text-white`}
            >
              {v.isActive ? "aktif" : "inaktif"}
            </p>
          </li>
        )
      )}
    </ul>
  );
};
