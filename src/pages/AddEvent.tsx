import React, { useState } from "react";
import { DialogBox } from "../components/dialogueBox";
import { Navbar } from "../components/navbar";
import { useCallbackPrompt } from "../hooks/useCallbackPropmpts";

export const AddEvent: React.FC = () => {
  const [voteTitle, setVoteTitle] = useState("");
  const [candidate, setCandidate] = useState([
    { ketua: "", wakil: "", description: "" },
    { ketua: "", wakil: "", description: "" },
  ]);
  const [showDialogue, setShowDialogue] = useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialogue);

  const handleChangePaslon = (
    i: number,
    e: { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;

    console.log(`name ${name}, value ${value}`);
    if (name === "voteTitle") {
      setVoteTitle(value);
      setShowDialogue(true);
    }
    let data = [...candidate];
    data[i][name] = value;
    setCandidate(data);
    setShowDialogue(true);
  };

  const addPaslon = () => {
    let newField = { ketua: "", wakil: "", description: "" };
    setCandidate([...candidate, newField]);
  };
  // handle submit bellow
  /**
  const handleSubmitVote = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      voteTitle: form.voteTitle,
      candidates: form.candidates.replace(/\s/g, "").split(","),
      registeredVoters: form.registeredVoters.replace(/\s/g, "").split(","),
    };

    api.post(`/org/${orgId}/add_event`);
  }; */
  return (
    <>
      <div className="flex ">
        <Navbar />
        <DialogBox
          cancelNavigation={cancelNavigation}
          confirmNavigation={confirmNavigation}
          showDialog={showPrompt}
        />
        <div className="px-5 py-3 w-screen flex flex-col gap-y-14 relative max-h-screen overflow-y-auto pb-16">
          <h1 className="text-xl font-semibold">Buat Event</h1>

          <form className="flex flex-col gap-4">
            <div id="voteTitle" className="flex flex-col">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="voteTitle"
                id="title"
                onChange={(e) => handleChangePaslon(0, e)}
                value={voteTitle}
                placeholder="pemilihan ketua ..."
                className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
              />
            </div>

            <div id="paslon" className="flex flex-col gap-2">
              candidates
              {candidate.map((v, i) => (
                <div key={i} id="paslon" className="flex-col flex">
                  <label htmlFor="ketua">{`paslon ${i + 1}`}</label>
                  <input
                    type="text"
                    name="ketua"
                    id="ketua"
                    value={v.ketua}
                    onChange={(e) => handleChangePaslon(i, e)}
                    placeholder="calon ketua"
                    className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    name="wakil"
                    id="wakil"
                    value={v.wakil}
                    onChange={(e) => handleChangePaslon(i, e)}
                    placeholder="calon wakil"
                    className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
                  />
                  <textarea
                    placeholder="description atau visi and misi"
                    name="description"
                    id="description"
                    value={v.description}
                    onChange={(e) => handleChangePaslon(i, e)}
                    className="focus:outline-none focus:border-b-black border-b-2 border-gray-400 p-2"
                  ></textarea>
                </div>
              ))}
              <button
                type="button"
                onClick={addPaslon}
                className="self-end px-3 py-1 bg-blue-700 text-white rounded-xl my-5"
              >
                &#43; paslon
              </button>
            </div>

            <button className="px-2 py-1 bg-blue-700 text-white w-fit rounded-xl self-end">
              Buat Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
