import { _axios } from "../../helper/axios";

export class ManageProductsApi {

    subcategoryProducts = async (cat, subcat) => {
        const res = await _axios("get", `/products/` + cat + '/' + subcat);
        return res;
    };

    productbySlug = async (slug) => {
        const res = await _axios("get", `/products-slug/` + slug);
        return res;
    };

}
