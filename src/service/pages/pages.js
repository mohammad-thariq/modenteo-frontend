import { _axios } from "../../helper/axios";
export class PagesAPI {
  getPages = async () => {
    const res = await _axios('get', `/list/pages`)
    return res
  }
  getPagebySlug = async (slug) => {
    const res = await _axios("get", `/page/${slug}`);
    return res;
  };
}
