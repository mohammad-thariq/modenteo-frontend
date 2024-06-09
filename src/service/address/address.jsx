import { _axios } from "../../helper/axios";

export class AddressApi {
 
  address = async (data) => {
    const res = await _axios("post", "/user_address/create", data);
    return res;
  };
}
