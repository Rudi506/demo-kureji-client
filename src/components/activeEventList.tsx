import { useContext } from "react";
import { Link } from "react-router-dom";
import { organization } from "../../types/types";
import { dataContext } from "../pages/orgDetail";
import { ListComponent } from "./ListComponent";

export const ActiveEventList: React.FC<{
  orgId: organization["_id"] | undefined;
}> = ({ orgId }) => {
  const activeList = useContext(dataContext)?.voteEvents;

  return (
    <ul className="border-b-2 border-slate-400 pb-5">
      {!activeList?.length && <p>Belum ada vote event</p>}
      {activeList?.map(
        (
          v: { voteTitle: string; _id: string; isActive: boolean },
          i: number
        ) => (
          <ListComponent index={i}>
            <div className="flex grow py-1.5 items-center justify-between">
              <Link to={`/org/${orgId}/event/${v._id}`}>{v.voteTitle}</Link>
              <p
                className={`${
                  v.isActive ? "bg-green-400" : "bg-red-500"
                } rounded-xl p-1 text-white`}
              >
                {v.isActive ? "aktif" : "inaktif"}
              </p>
            </div>
          </ListComponent>
        )
      )}
    </ul>
  );
};
