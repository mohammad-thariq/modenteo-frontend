import axios from "axios";
import { localStorageConst } from "../constants/localStorage";
import { LocalStorageHelper } from "../utils/localStorage";
import { BACKEND_API_URL } from "../constants/url";


// _axios(http method, api endpoint, data)
export const _axios = async (method, url, body, contentType) => {
  const token = "Bearer " + LocalStorageHelper.getItem(localStorageConst.JWTUSER);
  const res = await axios({
    headers: {
      "Content-Type": contentType || "application/json",
      "Authorization": token
    },
    method: method,
    url: BACKEND_API_URL + url,
    data: body,
  })
    .then((res) => res?.data)
    .catch((err) => err);
  return res;
};
