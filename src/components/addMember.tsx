import React, { useState } from "react";

export const AddMemberModal: React.FC<{ isOpen: Boolean }> = ({ isOpen }) => {
  const [form, setForm] = useState({ email: "" });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (name === "email") return { email: value };
      return { email: prev.email };
    });
  };

  return (
    <>
      <div
        className={` w-[98%] h-fit rounded-xl p-3 pt-4 border-2 border-gray-400 bg-white flex flex-col gap-3 ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <div className="flex relative justify-between">
          <input
            className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-black h-10 mr-2"
            type="email"
            placeholder="email@mail"
            value={form.email}
            onChange={handleChange}
          />

          <div id="closeBtn" className="self-end">
            <button onClick={() => ""}>🔍</button>
          </div>
        </div>
        <form></form>
      </div>
    </>
  );
};
