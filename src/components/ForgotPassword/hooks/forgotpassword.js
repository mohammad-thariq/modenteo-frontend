import { ToastifyFailed, ToastifySuccess } from "../../../common/Toastify";
import { Redirect } from "../../../helper/base";
import { AuthorizationApi } from "../../../service";

const { forgotpassword } = new AuthorizationApi();

export const handleForgotPassword = async (data) => {
  const res = await forgotpassword(data);
  if (res?.code === "ERR_NETWORK") {
    ToastifyFailed(`${res?.message}`);
    return res;
  } else if (res?.response?.data?.error) {
    ToastifyFailed(`${res?.response?.data?.error}`);
    return res;
  } else {
    ToastifySuccess(res?.message);
    Redirect("/login");
  }
};
