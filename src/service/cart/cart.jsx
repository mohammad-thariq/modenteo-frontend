import { _axios } from "../../helper/axios";

export class ManageCartApi {
    getCart = async (id) => {
        const res = await _axios("get", `/cart/${id}`);
        return res;
    };


    addCart = async (data) => {
        const res = await _axios(
            "post",
            `/cart/create`,
            { ...data }
        );
        return res;
    };


    updateCart = async (data) => {
        const res = await _axios(
            "patch",
            `/cart/update/${data.id}`,
            data
        );
        return res;
    };

    deleteCart = async (id) => {
        const res = await _axios("delete", `/cart/delete/${id}`);
        return res;
    };


}
