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
    getOrder = async (data) => {
        console.log(data)
        const res = await _axios("get", `/orders/user/${data?.user_id}?page=${data?.page}&limit=${data?.limit}`);

        return res;
    };

}
