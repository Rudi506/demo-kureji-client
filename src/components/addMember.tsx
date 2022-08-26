import React, { FormEvent, useContext, useState } from "react";
import { api } from "../../utils/api";
import { getAccessToken } from "../utils/accesstoken";

export const AddMemberModal: React.FC<{
  isOpen: Boolean;
  orgId: String | undefined;
  isAdmin: boolean;
  updateData: (arg: any) => void;
}> = ({ isOpen, orgId, isAdmin, updateData }) => {
  const [form, setForm] = useState({ email: "" });
  const [emailList, setMailList] = useState([]);
  const [msg, setMsg] = useState({ msg: "" });
  const [anim, setAnim] = useState(false);
  const accessToken = getAccessToken();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (name === "email") return { email: value };
      return { email: prev.email };
    });
  };

  const searchSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const accessToken = getAccessToken();
    if (!form.email) {
      setMailList([]);
    }
    if (form.email) {
      api
        .post("/search_user", form, {
          headers: {
            "auth-token": accessToken ? `Bearer ${accessToken}` : "",
          },
        })
        .then((result) => {
          setMailList(result.data.result);
        })
        .catch((err) => console.error(err));
    }
  };

  const submitAddMember = (id: string) => {
    api
      .put(
        `/org/${orgId}`,
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
        setMsg({ msg: "berhasil ditambahkan" });
        setAnim(true);
        setTimeout(() => {
          setMsg({ msg: "" });
          setAnim(false);
        }, 1500);
      })
      .catch((err) => console.log(err));
  };
  return !isAdmin ? (
    <></>
  ) : (
    <>
      <p
        className={`fixed py-3 px-5 mr-10 bg-green-400 font-semibold text-white right-2 md:right-0 rounded-xl gap-x-5 flex transition-[top] ease-in-out ${
          anim ? "top-2" : "-top-20"
        }`}
      >
        {msg.msg}
        <button onClick={() => setAnim(false)}>✖</button>
      </p>
      <form onSubmit={searchSubmit} className={`relative`}>
        <div
          className={` w-[98%] md:w-[50%] h-fit rounded-xl p-3 pt-4 border-2 border-gray-400 bg-white flex gap-3 ${
            !isOpen ? "hidden" : ""
          }`}
        >
          <div className="flex flex-col grow relative justify-between">
            <input
              list="mailList"
              className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-black h-10 mr-2"
              type="email"
              name="email"
              placeholder="email@mail"
              value={form.email}
              onChange={handleChange}
            />
            <ul className="py-3">
              {emailList.map(
                (v: { name: string; email: string; _id: string }, i) => (
                  <li
                    key={i}
                    className={`odd:bg-slate-200 p-1 flex justify-between`}
                  >
                    <div className="flex gap-5 items-center">
                      <p className="text-semibold">{v.name}</p>
                      <p className="text-gray-500 text-xs">
                        {" "}
                        &lt;{v.email}&gt;
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => submitAddMember(v._id)}
                      className="w-4 h-4 self-center align-middle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                        <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" />
                      </svg>
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
          <div id="closeBtn" className="">
            <button type="submit">🔍</button>
          </div>
        </div>
      </form>
    </>
  );
};
