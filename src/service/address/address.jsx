import { _axios } from "../../helper/axios";

export class AddressApi {

  addressCreate = async (data) => {
    const res = await _axios("post", "/user_address/create", data);
    return res;
  };
  updateAddress = async (data) => {
    const res = await _axios(
      "patch",
      `/user_address/update/${data.id}`,
      data
    );
    return res;
  };

  deleteAddress = async (id) => {
    const res = await _axios("delete", `/user_address/delete/${id}`);
    return res;
  };
  address = async (data) => {
    const res = await _axios("get", "/user_address?user_id=" + data?.user_id);
    return res;
  };
}
