import { _axios } from "../../helper/axios";
export class SettingsAPI {
  getSettings = async (data) => {
    const res = await _axios('get', `/settings`)
    return res
  }
  getHomeSettings = async (data) => {
    const res = await _axios('get', `/settings-frontend`)
    return res
  }
  createSettings = async (data) => {
    const res = await _axios(
      "post",
      `/settings/create`,
      data,
    );
    return res;
  };
}
