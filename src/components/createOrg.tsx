import React, { useState } from "react";
import { CloseBtn } from "../../types/types";
import { api } from "../../utils/api";
import { getAccessToken } from "../utils/accesstoken";

export const CreateOrgModal: React.FC<CloseBtn> = ({ isOpen, closeBtn }) => {
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
        console.log("ini" + result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
            {Loading && (
              <svg
                className="w-5 h-5 animate-spin fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                <path d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z" />
              </svg>
            )}
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
