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


    productsbyMainCategory = async (cat) => {
        const res = await _axios("get", `/category-products/` + cat);
        return res;
    };
    productsByCollection = async (id) => {
        const res = await _axios("get", `/collection-products/` + id);
        return res;
    };
    productsByBrand = async (id) => {
        const res = await _axios("get", `/brand-products/` + id);
        return res;
    };
    productsByCategory = async (id) => {
        const res = await _axios("get", `/maincategory-products/` + id);
        return res;
    };
    
    productsbySlug = async (slug) => {
        const res = await _axios("get", `/collection-product/` + slug);
        return res;
    };
    similarProducts = async (subcat) => {
        const res = await _axios("get", `/similar-products/` + subcat);
        return res;
    };
}
