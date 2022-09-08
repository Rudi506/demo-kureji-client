import React, { FormEvent, ReactNode, useState } from "react";
import { DeleteModalTypes, logoutBtn } from "../../types/types";
import { api } from "../../utils/api";
import { getAccessToken, setAccessToken } from "../utils/accesstoken";

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

export const DeleteModal: React.FC<DeleteModalTypes> = ({
  showDeleteModal,
  reqCloseBtn,
  children,
  deletedItem,
  URI,
  type,
}) => {
  const itemlowercase = deletedItem.toLocaleLowerCase().split(" ").join("");
  const accessToken = getAccessToken();
  const [orgInput, setOrgInput] = useState("");

  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;

    setOrgInput(value);
  };
  const isMatched = orgInput === itemlowercase;
  const submitDelete = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .delete(URI, {
        headers: {
          "auth-token": accessToken ? `Bearer ${accessToken}` : "",
        },
      })
      .then(async (result) => {
        console.log(result);
        if (type === "user") {
          await api.post("/logout");
          location.replace("/");
        }
        if (type === "org") {
          location.replace("/org");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div
      className={`${
        !showDeleteModal && "hidden"
      } fixed  left-0 top-0 w-full h-full  z-30 bg-blue-500/5 backdrop-blur-sm w- shadow-xl outline outline-2 outline-blue-500/30 rounded-md flex justify-items-center`}
    >
      <div className="relative w-fit m-auto my-auto bg-white pt-10 pb-3 px-20 outline-2 outline outline-blue-600/20  flex flex-col gap-5 justify-center ">
        <button
          className="absolute top-2 right-2 text-sm"
          onClick={() => reqCloseBtn(false)}
        >
          ✖
        </button>
        {children}

        <form className="flex flex-col gap-2">
          <label htmlFor="deleteinput">
            Silahkan ketikan <strong>{itemlowercase}</strong> untuk konfirmasi.
          </label>
          <input
            onChange={handleChange}
            value={orgInput}
            type="text"
            name="deleteinput"
            id="deleteinput"
            className="rounded-lg border-black border-1 border px-0.5 py-1"
          />
          <button
            disabled={!isMatched}
            className="p-3 py-2 w-fit text-white rounded-xl bg-red-500 disabled:bg-red-200 self-center"
            onClick={submitDelete}
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export const SetAdminModalsBox: React.FC<{
  showModal: boolean;
  children: ReactNode;
  reqCloseBtn: (arg: boolean) => void;
  URI: string;
  memberData: { name: string | null; id: string | null };
  updateData: (arg: any) => void;
  setMsg: (arg: any) => void;
  setAnim: (arg: any) => void;
}> = ({
  showModal,
  children,
  reqCloseBtn,
  URI,
  memberData,
  updateData,
  setAnim,
  setMsg,
}) => {
  const accessToken = getAccessToken();

  const editMemberHanler = async (id: string | null, name: string | null) => {
    api
      .put(
        URI,
        { id },
        {
          headers: {
            "auth-token": accessToken ? `Bearer ${accessToken}` : "",
          },
        }
      )
      .then((result) => {
        const { result: data } = result.data;
        updateData(() => data);
        setMsg(() => "berhasil ditambahkan");
        setAnim(() => true);
        setTimeout(() => {
          setMsg(() => "");
          setAnim(() => false);
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div
      className={`${
        !showModal && "hidden"
      } fixed  left-0 top-0 w-full h-full  z-30 bg-blue-500/5 backdrop-blur-sm w- shadow-xl outline outline-2 outline-blue-500/30 rounded-md flex justify-items-center`}
    >
      <div className="relative w-fit m-auto my-auto bg-white pt-10 pb-3 px-20 outline-2 outline outline-blue-600/20  flex flex-col gap-5 justify-center ">
        <button
          className="absolute top-2 right-2 text-sm"
          onClick={() => reqCloseBtn(true)}
        >
          ✖
        </button>
        {children}
        <button
          type="submit"
          className="px-2 py-3 bg-yellow-400 font-semibold"
          onClick={() => {
            editMemberHanler(memberData.id, memberData.name);
            reqCloseBtn(true);
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};
