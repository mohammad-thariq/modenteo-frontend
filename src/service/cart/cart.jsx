import { _axios } from "../../helper/axios";

export class ManageCartApi {

    addCart = async (data) => {
        console.log(data,'datadata')

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
            { ...data },
            "multipart/form-data"
        );
        return res;
    };

    deleteCart = async (data) => {
        const res = await _axios("delete", `/cart/delete/${data.id}`);
        return res;
    };



}
