import axios from "axios";
import { localStorageConst } from "../constants/localStorage";
import { LocalStorageHelper } from "../utils/localStorage";
import { apiURL } from "../config";
export const _axios = async (method, url, body, contentType) => {
  const token =
    "Bearer " + LocalStorageHelper.getItem(localStorageConst.JWTUSER);
  const res = await axios({
    headers: {
      "Content-Type": contentType || "application/json",
      Authorization: token,
    },
    method: method,
    url: apiURL + url,
    data: body,
  })
    .then((res) => res?.data)
    .catch((err) => err);
  return res;
};
