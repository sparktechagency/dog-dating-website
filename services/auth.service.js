import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ woof_spot_accessToken }) => {
  return setToLocalStorage("woof_spot_accessToken", woof_spot_accessToken);
};
export const removeUserInfo = () => {
  return removeFromLocalStorage("woof_spot_accessToken");
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage("woof_spot_accessToken");
  if (authToken) {
    const userInfo = decodedToken(authToken);
    return userInfo;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("woof_spot_accessToken");
  return !!authToken;
};
