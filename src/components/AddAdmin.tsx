import { members } from "../../types/types";

export const SetAdmin: React.FC<{
  memberData: members;
  openModal: (arg: boolean) => void;
  AddedAdmin: (id: string | null, name: string | null) => void;
}> = ({ memberData, openModal, AddedAdmin }) => {
  return (
    <div
      className={` absolute right-10 bg-white px-2 py-3 rounded-md outline outline-1 outline-slate-400 drop-shadow-md border-black h-fit w-fit z-10`}
    >
      <ul className="flex flex-col gap-2">
        {memberData.isAdmin ? (
          <li className="border-b-2 border-slate-400">
            <button
              data-admin-id={memberData._id}
              data-admin-name={memberData.name}
              className="w-full h-full text-left hover:bg-slate-200 pr-1"
              onClick={(e) => {
                const newAdminId =
                  e.currentTarget.getAttribute("data-admin-id");
                const newAdminName =
                  e.currentTarget.getAttribute("data-admin-name");
                openModal(true);
                AddedAdmin(newAdminId, newAdminName);
              }}
            >
              Remove {memberData.name} from admin
            </button>
          </li>
        ) : (
          <li className="border-b-2 border-slate-400">
            <button
              data-admin-id={memberData._id}
              data-admin-name={memberData.name}
              className="w-full h-full text-left hover:hover:hover:bg-slate-200 pr-1"
              onClick={(e) => {
                const newAdminId =
                  e.currentTarget.getAttribute("data-admin-id");
                const newAdminName =
                  e.currentTarget.getAttribute("data-admin-name");
                openModal(true);
                AddedAdmin(newAdminId, newAdminName);
              }}
            >
              Set {memberData.name} as admin
            </button>
          </li>
        )}
        {!memberData.isAdmin && (
          <li className="border-b-2 border-slate-400">
            <button className="w-full h-full text-left hover:bg-red-500 hover:text-white pr-1">
              Remove {memberData.name}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
