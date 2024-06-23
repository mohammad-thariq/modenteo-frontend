import { _axios } from "../../helper/axios";

export class AuthorizationApi {
  login = async (data) => {
    const res = await _axios("post", "/login", data);
    return res;
  };
  forgotpassword = async (data) => {
    const res = await _axios("post", "/forgot-password", data);
    return res;
  };
  register = async (data) => {
    const res = await _axios("post", "/register", data);
    return res;
  };
  validateToken = async () => {
    const res = await _axios('get', `/validate-token`)
    return res
  }
  dashboard = async(id)=>{
    const res = await _axios("get", `/user/dashboard/${id}`);
    return res
  }
}
