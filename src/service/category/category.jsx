import { _axios } from "../../helper/axios";

export class ManageCategoriesApi {

    productCategory = async () => {
        const res = await _axios("get", `/list/categories`);
        return res;
    };

    productMenuCategory = async () => {
        const res = await _axios("get", `/menu/categories/sub-categories`);
        return res;
    };

    productMenuSubCategory = async () => {
        const res = await _axios("get", `/menu/sub-categories/child-categories`);
        return res;
    };

    productMenuSeasons = async () => {
        const res = await _axios("get", `/menu/seasons`);
        return res;
    };
    productMenuNew = async () => {
        const res = await _axios("get", `/menu/new-collections`);
        return res;
    };
    categorySubcategory = async (id) => {
        const res = await _axios("get", `/category/subcategory/` + id);
        return res;
    };


    productSubCategory = async () => {
        const res = await _axios(
            "get",
            `/list/sub_categories`
        );
        return res;
    };

    productChildCategory = async () => {
        const res = await _axios(
            "get",
            `/list/child_categories`
        );
        return res;
    };

}
