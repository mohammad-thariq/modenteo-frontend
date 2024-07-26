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
  getSettingsCat = async ({ queryKey }) => {
    const res = await _axios('get', `/settings/${queryKey[1]}`)
    return res
  }
  getCatSettings = async ({ queryKey }) => {
    const res = await _axios('get', `/settings/${queryKey[1]}/frontend`)
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
