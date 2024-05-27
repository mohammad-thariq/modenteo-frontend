import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastifySuccess = (message) => {
  return toast.success(message);
};

export const ToastifyFailed = (message) => {
  return toast.error(message);
};
