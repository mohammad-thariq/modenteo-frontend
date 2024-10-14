import { _axios } from "../../helper/axios";

export class SearchProductsAPI {
  getSearchProduct = async (data) => {
    const res = await _axios('get', `/search-products/${data}`)
    return res
  };
}
