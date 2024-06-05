import { _axios } from "../../helper/axios";

export class ManageCartApi {

    addCart = async ({ data }) => {

        const res = await _axios(
            "post",
            `/cart/create`,
            { ...data }
        );
        return res;
    };


}
