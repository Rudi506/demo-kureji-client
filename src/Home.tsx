import { api } from "../utils/api";

export const Home = () => {
  const Logout = () => {
    api.post("/logout").catch((err) => console.log(err));
    location.reload();
  };

  return (
    <>
      <p> LogedIn</p>
      <button onClick={Logout}>Logout</button>
    </>
  );
};
