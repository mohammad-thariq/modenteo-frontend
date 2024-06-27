import { _axios } from "../../helper/axios";

export class ManageProductsApi {
  subcategoryProducts = async ({ queryKey }) => {
    const res = await _axios(
      "post",
      `/products/${queryKey[1]}/${queryKey[2]}`,
      queryKey[3]
    );
    return res;
  };

  productbySlug = async (slug) => {
    const res = await _axios("get", `/products-slug/` + slug);
    return res;
  };

  productsbyMainCategory = async ({ queryKey }) => {
    const res = await _axios(
      "post",
      `/category-products/${queryKey[1]}`,
      queryKey[2]
    );
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
