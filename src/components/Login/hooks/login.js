// import { BaseUrls } from "../../../../env";

import { ToastifyFailed, ToastifySuccess } from "../../../common/Toastify";
import { localStorageConst } from "../../../constants/localStorage";
import { Redirect } from "../../../helper/base";
import { AuthorizationApi } from "../../../service";
import { LocalStorageHelper } from "../../../utils/localStorage";

const { login } = new AuthorizationApi();

export const handleLogin = async (data) => {
  const res = await login(data);
  console.log(res, "resr");
  if (res?.code === "ERR_NETWORK") {
    ToastifyFailed(`${res?.message}`);
    return res;
  } else if (res?.response?.data?.error) {
    ToastifyFailed(`${res?.response?.data?.error}`);
    return res;
  } else {
    LocalStorageHelper?.setItem(localStorageConst?.JWTUSER, res?.token);
    const user = {
      id: res?.data?.id,
      name: `${res?.data?.first_name} ${res?.data?.last_name}`,
      email: res?.data?.email,
    };
    LocalStorageHelper?.setItem(localStorageConst?.USER, user);
    ToastifySuccess(`Welcome Back ${user.name}`);
    setTimeout(() => {
      Redirect("/");
    }, 100);
  }
};
