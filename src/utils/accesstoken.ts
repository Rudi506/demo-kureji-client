export let accessToken: String = "";

export let setAccessToken = (s: String) => {
  accessToken = s;
};

export let getAccessToken = () => {
  return accessToken;
};
