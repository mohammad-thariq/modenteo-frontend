// HomePage.js
import React, { useState, useEffect } from "react";
import { OrderTable } from "../../common";
import { getPaginatedData } from "../../utils/paginateddata";
import { AuthorizationApi } from "../../service";
import { useMutation } from "react-query";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
const Dashboard = () => {
  const { dashboard } = new AuthorizationApi();
  let userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
  const [orderItems, setorderItems] = useState([]);
  const [order_count, setorderCount] = useState(0);
  const [cart_count, setcartCount] = useState(0);
  const [wishlist_count, setwishlistcount] = useState(0);
  const { mutate: getDashboard } = useMutation(dashboard, {
    onSuccess: (data) => {
      setorderItems(data?.orders);
      setcartCount(data?.cart_count);
      setorderCount(data?.order_count);
      setwishlistcount(data?.wishlist_count);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });
  useEffect(() => {
    getDashboard(userDetails?.id);
  }, [getDashboard, userDetails?.id]);

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <img
                src={
                  process.env.PUBLIC_URL + "assets/images/dashboard/circle.svg"
                }
                className="card-img-absolute"
                alt="All Orders"
              />
              <h4 className="font-weight-normal mb-2">
                Toal Orders{" "}
                <i className="fa fa-shopping-basket mdi-24px float-end"></i>
              </h4>
              <h2 className="mb-1">{order_count}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <img
                src={
                  process.env.PUBLIC_URL + "assets/images/dashboard/circle.svg"
                }
                className="card-img-absolute"
                alt="Wishlist"
              />
              <h4 className="font-weight-normal mb-2">
                Wislist <i className="fa fa-heart mdi-24px float-end"></i>
              </h4>
              <h2 className="mb-1">{wishlist_count}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body">
              <img
                src={
                  process.env.PUBLIC_URL + "assets/images/dashboard/circle.svg"
                }
                className="card-img-absolute"
                alt="Cart"
              />
              <h4 className="font-weight-normal mb-2">
                Cart<i className="fa fa-shopping-cart mdi-24px float-end"></i>
              </h4>
              <h2 className="mb-1">{cart_count}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                  <OrderTable type="today" data={getPaginatedData(orderItems, 1, orderItems.length)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
