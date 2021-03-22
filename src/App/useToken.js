import { useState } from "react";

// can replace sessionStorage with localStorage so login is persistent
export default function useToken() {
  // .getItem(key), returns string value of the key
  // convert string to object
  // return object value if valid
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  // to save key: token, value: {"token":"test123"} to browser sessionStorage
  // .setItem(key, string)
  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
