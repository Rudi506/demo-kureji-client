import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { candidate, eventDetail } from "../../types/types";
import { api } from "../../utils/api";
import { Loader, SpinnerLoader } from "../components/Loader";
import { Navbar } from "../components/navbar";
import { getAccessToken } from "../utils/accesstoken";

export default function EditCandidate() {
  const { candidateId, orgId, eventId } = useParams();
  const [Loading, setLoading] = useState<boolean>(true);
  const [submitProgress, setSubmitProgress] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [Data, setData] = useState<candidate>({
    calonKetua: "",
    calonWakil: "",
    description: "",
    image: { url: "" },
    _id: "",
    numOfVotes: 0,
  });
  const [image, setImage] = useState<any>();

  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    api
      .get(`/org/${orgId}/event/${eventId}/${candidateId}`, {
        headers: {
          "auth-token": accessToken ? `Bearer ${accessToken}` : "",
        },
      })
      .then((result) => {
        const { data } = result;
        setIsAdmin(isAdmin);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: {
    target: { value: string; name: string; files?: any };
  }) => {
    const { name, value, files } = e.target;

    if (files) {
      setImage(files[0]);
    }

    setData((prev) => {
      if (files) {
        const url = URL.createObjectURL(files[0]);
        if (name === "avatar") return { ...prev, image: { url } };
      }
      if (name === "calonKetua") return { ...prev, calonKetua: value };
      if (name === "calonWakil") return { ...prev, calonWakil: value };
      if (name === "description") return { ...prev, description: value };

      return prev;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    setSubmitProgress(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", image);
    formData.append("calonKetua", Data.calonKetua);
    formData.append("calonWakil", Data.calonWakil);
    formData.append("description", Data.description);

    api
      .put(`/org/${orgId}/event/${eventId}/update/${candidateId}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          "auth-token": accessToken ? `Bearer ${accessToken}` : "",
        },
      })
      .then((res) => {
        setSubmitProgress(false);
        navigate(-1);
      })
      .catch((err) => {
        setSubmitProgress(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex">
        <Navbar />
        {Loading && <Loader />}
        <div
          className={`${
            Loading && "hidden"
          } max-h-screen px-5 py-3 w-screen flex flex-col gap-6 overflow-auto mb-28`}
        >
          <h1 className="text-xl font-semibold">Edit paslon</h1>
          <div className="flex flex-col md:flex-row gap-5 md:justify-around h-full">
            <div className="md:w-[40%] h-full">
              <div className="h-[300px] w-[300px] m-auto flex justify-center items-center rounded-full  outline outline-1 outline-slate-400 overflow-hidden">
                {Data?.image?.url ? (
                  <img
                    src={Data.image.url}
                    alt="img"
                    className="object-cover"
                  />
                ) : (
                  <img
                    src="http://fpoimg.com/500x500?text=placeholder"
                    alt="img"
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 md:w-[60%]"
            >
              <input
                accept="image/png, image/jpg"
                type="file"
                name="avatar"
                id="avatar"
                className="w-fit"
                onChange={handleChange}
              />

              <div id="" className="flex flex-col relative">
                {/* {error.form === "email" && (
            <p className="text-rose-700 p-1 absolute right-0 top-0">
              {error.msg}
            </p>
          )} */}
                <label htmlFor="calonKetua">calonKetua:</label>
                <input
                  type="text"
                  name="calonKetua"
                  value={Data?.calonKetua}
                  id="calonKetua"
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
                />
              </div>
              <div id="" className="flex flex-col relative">
                {/* {error.form === "email" && (
            <p className="text-rose-700 p-1 absolute right-0 top-0">
              {error.msg}
            </p>
          )} */}
                <label htmlFor="calonWakil">calon wakil:</label>
                <input
                  type="text"
                  name="calonWakil"
                  value={Data?.calonWakil}
                  id="calonWakil"
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className="border-b-2 border-gray-400 p-2 focus:outline-none focus:border-black"
                />
              </div>
              <textarea
                placeholder="description atau visi and misi"
                name="description"
                id="description"
                value={Data?.description}
                onChange={handleChange}
                className="focus:outline-none focus:border-b-black border-b-2 border-gray-400 p-2"
              ></textarea>
              <button
                type="submit"
                className={`${
                  !submitProgress
                    ? "bg-blue-500"
                    : "bg-purple-600 cursor-not-allowed"
                } self-end px-3 py-2 text-white font-semibold rounded-md mt-5`}
              >
                {submitProgress ? <SpinnerLoader /> : <>submit</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
