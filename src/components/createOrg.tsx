import React, { useState } from "react";
import { createOrg } from "../../types/types";
import { api } from "../../utils/api";
import { getAccessToken } from "../utils/accesstoken";
import { SpinnerLoader } from "./Loader";

export const CreateOrgModal: React.FC<createOrg> = ({
  isOpen,
  closeBtn,
  setData,
  setMsg,
  setAnim,
}) => {
  const [Loading, setLoading] = useState(false);
  const [form, setForm] = useState({ orgName: "", description: "" });
  const [Error, setError] = useState("");

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setForm((prev): { orgName: string; description: string } => {
      if (name === "orgName")
        return { orgName: value, description: prev.description };
      if (name === "description")
        return { orgName: prev.orgName, description: value };
      return { orgName: prev.orgName, description: prev.description };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const accessToken = getAccessToken();
    api
      .post("/create_organization", form, {
        headers: {
          "auth-token": accessToken ? `Bearer ${accessToken}` : "",
        },
      })
      .then((result) => {
        const { result: data } = result.data;
        setData(data);
        setLoading(false);
        closeBtn(false);
        setAnim(true);
        setMsg("Organisasi berhasil dibuat");
        setForm({ description: "", orgName: "" });
        setTimeout(() => {
          setAnim(false);
          setMsg("");
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data);
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
      });
  };

  return (
    <div
      className={`absolute w-[98%] left-1/2 transform -translate-x-1/2 top-10 h-fit rounded-xl p-3 pt-4 border-2 border-gray-400 bg-white z-10 flex flex-col gap-3 ${
        !isOpen ? "hidden" : ""
      }`}
    >
      <div className="flex relative">
        <h1 className="font-semibold text-xl">Create Org</h1>
        <div id="closeBt" className="absolute right-0 text-white">
          <button onClick={() => closeBtn(false)}>✖</button>
        </div>
      </div>
      <form className="flex flex-col gap-2">
        <div id="orgname" className="flex flex-col">
          <label htmlFor="orgName">Organization</label>
          <input
            value={form.orgName}
            onChange={handleChange}
            type="text"
            name="orgName"
            id="orgName"
            placeholder="organization name"
            className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
          />
        </div>
        <div id="orgname" className="flex flex-col h-32">
          <label htmlFor="orgName">Desription</label>
          <textarea
            value={form.description}
            onChange={handleChange}
            name="description"
            id="description"
            className={`border-gray-400 border-2 h-full focus:outline-none focus:border-black`}
          ></textarea>
        </div>
        <div className="relative flex justify-end w-full">
          {Error && <div className="text-red-600 my-auto px-5"> {Error}</div>}
          <button
            className={`outline-gray-300 text-white font-medium tracking-wider border-2 w-fit px-2 py-1 rounded-xl self-end my-2 bg-blue-600 ${
              Loading ? "bg-purple-600" : ""
            }`}
            onClick={handleSubmit}
          >
            {Loading ? <SpinnerLoader /> : <>Create</>}
          </button>
        </div>
      </form>
    </div>
  );
};
