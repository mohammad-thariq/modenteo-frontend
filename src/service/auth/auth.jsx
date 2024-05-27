import { _axios } from "../../helper/axios";

export class AuthorizationApi {
  login = async (data) => {
    const res = await _axios("post", "/login", data);
    return res;
  };
  register = async (data) => {
    const res = await _axios("post", "/register", data);
    return res;
  };
}
