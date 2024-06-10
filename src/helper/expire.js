import { Reload } from "./base";
import { LocalStorageHelper } from "../utils/localStorage";
import { localStorageConst } from "../constants/localStorage";
export const SetExpireToken = (data) => {
    if (data?.message !== "Valid token") {
        LocalStorageHelper?.removeItem(localStorageConst.JWTUSER);
        LocalStorageHelper?.removeItem(localStorageConst.USER);
        Reload();
    } else{
        return true;
    }
};
