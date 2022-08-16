import { api } from "../../utils/api";
import { VoteEvent } from "../components/ActiveVote";
import { Navbar } from "../components/navbar";

export const Home = () => {
  const Logout = () => {
    api.post("/logout").catch((err) => console.log(err));
    location.reload();
  };

  return (
    <>
      <div className="flex h-screen">
        <Navbar />
        <VoteEvent />
        {/* <button onClick={Logout}>Logout</button> */}
      </div>
    </>
  );
};
