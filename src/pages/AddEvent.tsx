import React, { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import { DialogBox } from "../components/dialogueBox";
import { Navbar } from "../components/navbar";
import { useCallbackPrompt } from "../hooks/useCallbackPrompts";
import { getAccessToken } from "../utils/accesstoken";

export const AddEvent: React.FC = () => {
  const [voteTitle, setVoteTitle] = useState("");
  const [candidate, setCandidate] = useState([
    { calonKetua: "", calonWakil: "", description: "" },
    { calonKetua: "", calonWakil: "", description: "" },
  ]);
  const [showDialogue, setShowDialogue] = useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialogue);

  const { orgId } = useParams();

  const handleChangePaslon = (
    i: number,
    e: { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    let data: any[] = [...candidate];

    data[i][name] = value;
    setCandidate(data);
    setShowDialogue(true);
  };

  const addPaslon = () => {
    let newField: {
      calonKetua: string;
      calonWakil: string;
      description: string;
    } = { calonKetua: "", calonWakil: "", description: "" };
    setCandidate([...candidate, newField]);
  };
  // handle submit bellow
  const handleSubmitVote = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      voteTitle: voteTitle,
      candidates: candidate,
    };
    const accessToken = getAccessToken();
    api
      .post(`/org/${orgId}/add_event`, data, {
        headers: {
          "auth-token": accessToken ? `Bearer ${accessToken}` : "",
        },
      })
      .then((result) => {
        toast.success("event barhasil ditambahkan");
        setVoteTitle("");
        setCandidate(
          candidate.map((v, i) => {
            return { calonKetua: "", calonWakil: "", description: "" };
          })
        );
        setShowDialogue(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="flex ">
        <Navbar />
        <DialogBox
          cancelNavigation={cancelNavigation}
          confirmNavigation={confirmNavigation}
          showDialog={showPrompt}
        />
        <div className="px-5 pb-28 py-3 w-screen flex flex-col gap-y-14 relative max-h-screen overflow-y-auto ">
          <h1 className="text-xl font-semibold">Buat Event</h1>

          <form onSubmit={handleSubmitVote} className="flex flex-col gap-4">
            <div id="voteTitle" className="flex flex-col">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="voteTitle"
                id="title"
                onChange={(e) => setVoteTitle(e.target.value)}
                value={voteTitle}
                placeholder="pemilihan ketua ..."
                className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
              />
            </div>

            <div id="paslon" className="flex flex-col gap-2">
              candidates
              {candidate.map((v, i) => (
                <div key={i} id="paslon" className="flex-col flex relative">
                  {candidate.length > 2 && (
                    <button
                      id="removeCandidate"
                      className={`absolute top-3 right-0 bg-red-100 h-fit w-10 rounded-full flex justify-center items-center m-auto hover:bg-red-300`}
                      type="button"
                      onClick={() => {
                        if (candidate.length <= 2) {
                          return;
                        }
                        setCandidate((prev) => {
                          return prev.filter((_, index) => index !== i);
                        });
                      }}
                    >
                      <p className="text-xl font-extrabold text-red-700">
                        &minus;
                      </p>
                    </button>
                  )}

                  <label htmlFor="ketua">{`paslon ${i + 1}`}</label>
                  <input
                    type="text"
                    name="calonKetua"
                    id="ketua"
                    value={v.calonKetua}
                    onChange={(e) => handleChangePaslon(i, e)}
                    placeholder="calon ketua"
                    className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    name="calonWakil"
                    id="wakil"
                    value={v.calonWakil}
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

            <button
              type="submit"
              className="px-2 py-1 bg-blue-700 text-white w-fit rounded-xl self-end"
            >
              Buat Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
