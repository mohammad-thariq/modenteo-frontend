import React from "react";
import ProductDetailsFooter from "./product-footer";
import { IonIcon } from "@ionic/react";
import { heartOutline, star, starOutline, cartOutline } from "ionicons/icons";
const ProductDetails = () => {
  return (
    <div className="col-md-6">
      <div className="product-details">
        <h1 className="product-title">Dark yellow lace cut out swing dress</h1>

        <div className="ratings-container">
          <div className="ratings">
            <IonIcon icon={star} />
            <IonIcon icon={star} />
            <IonIcon icon={star} />
            <IonIcon icon={star} />
            <IonIcon icon={starOutline} />
          </div>
          <a
            className="ratings-text"
            href="#product-review-link"
            id="review-link"
          >
            ( 2 Reviews )
          </a>
        </div>

        <div className="product-price">$84.00</div>

        <div className="product-content">
          <p>
            Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae
            luctus metus libero eu augue. Morbi purus libero, faucibus
            adipiscing. Sed lectus.
          </p>
        </div>
        <div className="details-filter-row details-row-size">
          <label htmlFor="size">Size:</label>
          <div className="select-custom">
            <select
              name="size"
              id="size"
              className="form-control"
              defaultValue=""
            >
              <option value="">Select a size</option>
              <option value="s">Small</option>
              <option value="m">Medium</option>
              <option value="l">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>
        </div>

        <div className="details-filter-row details-row-size">
          <label htmlFor="qty">Qty:</label>
          <div className="product-details-quantity">
            <input
              type="text"
              style={{ textAlign: "center" }}
              className="form-control "
              required=""
              placeholder=""
            />
          </div>
        </div>
        <div className="details-filter-row details-row-size">
          <div className="product-cat">
            <span>Category:</span>
            <a href="/">Women</a>,<a href="/">Dresses</a>,<a href="/">Yellow</a>
          </div>
        </div>

        <div className="product-details-action">
          <a href="/" className="btn-product btn-cart">
            <IonIcon icon={cartOutline} />
            <span>add to cart</span>
          </a>
          <a href="/" className="btn-product btn-cart" title="Wishlist">
            <IonIcon icon={heartOutline} />
            <span>Add to Wishlist</span>
          </a>

          <div className="details-action-wrapper"></div>
        </div>
      </div>
      <ProductDetailsFooter />
    </div>
  );
};
export default ProductDetails;
