import { _axios } from "../../helper/axios";

export class ManageWishlistApi {
    getWishlist = async (id) => {
        const res = await _axios("get", `/wishlist/${id}`);
        return res;
    };


    addWishlist = async (data) => {
        const res = await _axios(
            "post",
            `/wishlist/create`,
            { ...data }
        );
        return res;
    };


    updateWishlist = async (data) => {
        const res = await _axios(
            "patch",
            `/wishlist/update/${data.id}`,
            { ...data },
            "multipart/form-data"
        );
        return res;
    };

    deleteWishlist = async (id) => {
        const res = await _axios("delete", `/wishlist/delete/${id}`);
        return res;
    };
    

}
