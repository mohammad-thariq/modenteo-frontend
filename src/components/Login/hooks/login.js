import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { ToastifyFailed, ToastifySuccess } from "../../../common/Toastify";
import { localStorageConst } from "../../../constants/localStorage";
import { AuthorizationApi, ManageCartApi, ManageWishlistApi } from "../../../service";
import { LocalStorageHelper } from "../../../utils/localStorage";

const { login } = new AuthorizationApi();
const manageCartApi = new ManageCartApi();
const addCart = manageCartApi.addCart;
const { addWishlist } = new ManageWishlistApi();

export const useHandleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: createWishlist } = useMutation(addWishlist, {
    onSuccess: () => {
      ToastifySuccess("Product Added to Wishlist");
    },
    onError: (error) => {
      ToastifyFailed(error?.message);
    },
  });

  const handleLogin = async (data) => {
    try {
      // Perform login
      const res = await login(data);

      if (res?.code === "ERR_NETWORK") {
        ToastifyFailed(`${res?.message}`);
        return res;
      } else if (res?.response?.data?.error) {
        ToastifyFailed(`${res?.response?.data?.error}`);
        return res;
      } else {
        // Handle successful login
        LocalStorageHelper?.setItem(localStorageConst?.JWTUSER, res?.token);
        const user = {
          id: res?.data?.id,
          name: `${res?.data?.first_name} ${res?.data?.last_name}`,
          email: res?.data?.email,
        };
        LocalStorageHelper?.setItem(localStorageConst?.USER, user);

        // Transfer guest cart to server
        const guestCart = LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
        if (guestCart.length > 0) {
          for (const item of guestCart) {
            try {
              await addCart({
                product_id: item.product_id,
                user_id: user.id,
                quantity: item.quantity,
                image_slug: item.image_slug,
                name: item.name,
              });
            } catch (error) {
              console.error("Failed to add item to cart:", error);
              ToastifyFailed(`Failed to add item to cart: ${error.message}`);
            }
          }
          // Clear guest cart data
          LocalStorageHelper.removeItem(localStorageConst.GUEST_CART);
        }
        // Handle redirect to add to wishlist
        const { redirect, product_id } = queryString.parse(location.search);

        if (redirect === "add_to_wishlist" && product_id) {
          let wishlistData = { product_id, user_id: user.id };
          createWishlist(wishlistData);
        }

        ToastifySuccess(`Welcome Back ${user.name}`);

        // Redirect after successful cart transfer
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (error) {
      ToastifyFailed(`Login failed: ${error.message}`);
      console.error("Login failed:", error);
    }
  };

  return { handleLogin };
};
