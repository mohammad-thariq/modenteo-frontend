import { _axios } from "../../helper/axios";

export class ManageOrderApi {
    createOrder = async (data) => {
        const res = await _axios(
            "post",
            `/orders/create`,
            { ...data }
        );
        return res;
    };

}
