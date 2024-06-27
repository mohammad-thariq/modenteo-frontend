import { _axios } from "../../helper/axios";

export class ManageBrandsApi {
  getBrands = async () => {
    const res = await _axios("get", `/filter/brands`);
    return res;
  };
}
