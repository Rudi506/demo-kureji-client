import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { getAccessToken } from "../utils/accesstoken";

function Users() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const accessToken = getAccessToken();

    api
      .get("/users", {
        headers: {
          "auth-token": accessToken ? `Bearer ${getAccessToken()}` : "",
        },
      })
      .then((result) => {
        return setData(result.data.msg);
        // setData(result);
      })
      .catch((err) => setError(err.response.data));
  }, []);

  return (
    <>
      <div className="users">
        <h1>Users</h1>
        {data &&
          data.map((v: { name: String }) => (
            <>
              {" "}
              <p>{v.name}</p>
            </>
          ))}
        {error && <p>{error}</p>}
      </div>
    </>
  );
}

export default Users;
