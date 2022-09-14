import { api } from "../../utils/api";
import { VoteEvent } from "../components/ActiveVote";
import { Navbar } from "../components/navbar";

export const Home = () => {
  return (
    <>
      <div className="flex grow-1">
        <Navbar />
        <div className=" w-screen px-5 py-3 max-h-screen min-h-screen overflow-auto pb-32">
          <h2>Welcome</h2>
          <VoteEvent />
        </div>
      </div>
    </>
  );
};
