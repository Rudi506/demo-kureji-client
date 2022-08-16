import React, { useState } from "react";
import { addEvent } from "../../types/types";
import { api } from "../../utils/api";

export const AddEvent: React.FC<addEvent> = ({ isOpen, closeBtn, orgId }) => {
  const [form, setForm] = useState({
    voteTitle: "",
    candidates: "",
    registeredVoters: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(
      (prev: {
        voteTitle: string;
        candidates: string;
        registeredVoters: string;
      }) => {
        if (name === "voteTitle")
          return {
            voteTitle: value,
            candidates: prev.candidates,
            registeredVoters: prev.registeredVoters,
          };
        if (name === "candidates")
          return {
            voteTitle: prev.voteTitle,
            candidates: value,
            registeredVoters: prev.registeredVoters,
          };
        if (name === "voteTitle")
          return {
            voteTitle: prev.voteTitle,
            candidates: prev.candidates,
            registeredVoters: value,
          };

        return {
          voteTitle: prev.voteTitle,
          candidates: prev.candidates,
          registeredVoters: prev.registeredVoters,
        };
      }
    );
  };
  const data = {
    voteTitle: form.voteTitle,
    candidates: form.candidates.replace(/\s/g, "").split(","),
    registeredVoters: form.registeredVoters.replace(/\s/g, "").split(","),
  };
  console.log(data);
  const handleSubmitVote = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      voteTitle: form.voteTitle,
      candidates: form.candidates.replace(/\s/g, "").split(","),
      registeredVoters: form.registeredVoters.replace(/\s/g, "").split(","),
    };

    api.post(`/org/${orgId}/add_event`);
  };

  return (
    <>
      <div
        className={`absolute w-[98%] left-1/2 transform -translate-x-1/2 top-10 h-fit rounded-xl p-3 pt-4 border-2 border-gray-400 bg-white z-10 flex flex-col gap-3 ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <div className="flex relative">
          <h1>create</h1>
          <div id="closeBt" className="absolute right-0 text-white">
            <button onClick={() => closeBtn(false)}>✖</button>
          </div>
        </div>
        <form>
          <div id="voteName" className="flex flex-col">
            <label htmlFor="name">voteName</label>
            <input
              value={form.voteTitle}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              placeholder="pemilihan ketua ..."
              className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
            />
          </div>
          <div id="voteName" className="flex flex-col">
            <label htmlFor="candidates">candidates</label>
            <textarea
              value={form.candidates}
              onChange={handleChange}
              name="candidates"
              id="candidates"
              placeholder="kandidates@mail,kandidat@mail"
              className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
};
