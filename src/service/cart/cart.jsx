import { _axios } from "../../helper/axios";

export class ManageCartApi {

    addCart = async ({ product_id, user_id }) => {
        let data = { product_id: product_id, user_id: user_id };

        const res = await _axios(
            "post",
            `/cart/create`,
            data
        );
        return res;
    };


}
