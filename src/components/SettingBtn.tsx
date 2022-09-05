import { useState } from "react";

export const SettingBtn: React.FC<{
  showModal: (arg: boolean) => void;
  showDeleteModal: (arg: boolean) => void;
  type: string;
}> = ({ showModal, type, showDeleteModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div
        id="menu"
        className={`${
          !isMenuOpen && "scale-0"
        } transition-all absolute right-11 top-0 w-32 h-fit outline outline-1 outline-slate-400 bg-white rounded-md drop-shadow-md px-3 py-4`}
      >
        <ul className="w-full">
          {type === "userpage" ? (
            <ul className="w-full">
              <li className="text-sm border-b-2 border-slate-500 ">
                <button
                  className="flex justify-between items-center gap-2  p-1"
                  onClick={() => showModal(true)}
                >
                  <p>logout</p>
                  <svg
                    className="w-4 h-4 fill-slate-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                    <path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
                  </svg>
                </button>
              </li>
              <li className="text-sm border-b-2 border-slate-500 ">
                <button
                  className="flex justify-between items-center gap-2 text-red-700 p-1"
                  onClick={() => showDeleteModal(true)}
                >
                  <p>delete account</p>
                </button>
              </li>
            </ul>
          ) : (
            <ul className="w-full">
              <li className="text-sm">
                <button
                  onClick={() => showModal(true)}
                  className="text-red-800 bg-red-100 outline outline-1 outline-red-600 p-1"
                >
                  Delete this Organization
                </button>
              </li>
            </ul>
          )}
        </ul>
      </div>
      <button
        onClick={() =>
          isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
        }
        id="settingbtn"
        className="absolute outline outline-1 outline-slate-400 right-0 top-0 w-10 h-10 flex justify-center items-center rounded-full "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 512"
          className="h-6 w-3 fill-gray-600"
        >
          {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
          <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z" />
        </svg>
      </button>
    </>
  );
};
