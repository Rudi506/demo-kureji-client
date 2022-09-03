import { logoutBtn } from "../../types/types";
import { api } from "../../utils/api";
import { setAccessToken } from "../utils/accesstoken";

export const ModalBox: React.FC<{
  isOpen: boolean;
  reqCloseBtn: (arg: boolean) => void;
  data: { id: string; ketua: string; wakil: string };
  submitVote: (arg: string) => void;
}> = ({ isOpen, reqCloseBtn, data, submitVote }) => {
  return (
    <div
      className={`${
        !isOpen && "hidden"
      } fixed  left-0 top-0 w-full h-full  z-30 bg-blue-500/5 backdrop-blur-sm w- shadow-xl outline outline-2 outline-blue-500/30 rounded-md flex justify-items-center`}
    >
      <div className="relative p-10 w-fit m-auto my-auto bg-white">
        <button
          className="absolute top-2 right-2 text-sm"
          onClick={() => reqCloseBtn(false)}
        >
          ✖
        </button>
        <div className="flex flex-col gap-2">
          <p className="">
            Kamu akan memilih{" "}
            <strong>
              {data.ketua} {data.wakil && <>&amp; {data.wakil}</>}
            </strong>
          </p>
          <p>Sudah yakin dengan pilihanmu?</p>
          <button
            className="p-3 py-2 w-fit text-white rounded-xl bg-blue-700"
            onClick={() => {
              submitVote(data.id);
              reqCloseBtn(false);
            }}
          >
            Yakin
          </button>
        </div>
      </div>
    </div>
  );
};

export const SuccessModal: React.FC<{
  anim: boolean;
  setAnim: (arg: boolean) => void;
  msg: { msg: string };
}> = ({ anim, setAnim, msg }) => {
  return (
    <p
      className={`absolute py-3 px-5 bg-green-400 font-semibold text-white right-2 md:right-0 rounded-xl gap-x-5 flex transition-[top] ease-in-out ${
        anim ? "top-2" : "-top-20"
      }`}
    >
      {msg.msg}
      <button onClick={() => setAnim(false)}>✖</button>
    </p>
  );
};

export const LogoutModal: React.FC<logoutBtn> = ({
  reqCloseBtn,
  isOpen,
  msg,
  callFunction,
}) => {
  const Logout = () => {
    api
      .post(`/logout`)
      .then((result) => {
        setAccessToken("");
        location.reload();
      })
      .catch((err) => console.error(err));
  };
  return (
    <div
      className={`${
        !isOpen && "hidden"
      } fixed  left-0 top-0 w-full h-full  z-30 bg-blue-500/5 backdrop-blur-sm w- shadow-xl outline outline-2 outline-blue-500/30 rounded-md flex justify-items-center`}
    >
      <div className="relative w-fit m-auto my-auto bg-white pt-10 pb-3 px-20 outline-2 outline outline-blue-600/20  flex flex-col gap-5 justify-center ">
        <button
          className="absolute top-2 right-2 text-sm"
          onClick={() => reqCloseBtn(false)}
        >
          ✖
        </button>
        <p className="grow self-center">{msg}</p>
        <button
          className="p-3 py-2 w-fit text-white rounded-xl bg-red-500 self-center"
          onClick={callFunction}
        >
          keluar
        </button>
      </div>
    </div>
  );
};
