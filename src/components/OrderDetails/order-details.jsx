// OrderDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ManageOrderApi } from "../../service";
import { useMutation } from "react-query";
import { Loading, PageTitle } from "../../common";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrderbyID } = new ManageOrderApi();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState(null);

  const { mutate: fetchOrder } = useMutation(getOrderbyID, {
    onSuccess: (data) => {
      setOrderDetails(data?.order);
      setOrderItems(data?.orderItems);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    if (id) {
      fetchOrder(id);
    }
  }, [id, fetchOrder]);

  if (!orderDetails) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="Order Details" />
      <div className="content-wrapper">
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="backtoOrder">
                  <button
                    className="btn btn-secondary mb-3"
                    onClick={() => navigate("/orders")}
                  >
                    {" "}
                    Back to Orders{" "}
                  </button>
                </div>
                <h4 className="card-title">
                  Order Details for {orderDetails.order_id}
                </h4>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Order ID</th>
                        <td>{orderDetails.order_id}</td>
                      </tr>
                      <tr>
                        <th>Amount</th>
                        <td>{orderDetails.total_amount}</td>
                      </tr>
                      <tr>
                        <th>Order Status</th>
                        <td>{orderDetails.status}</td>
                      </tr>
                      <tr>
                        <th>Payment Status</th>
                        <td>{orderDetails.payment_status}</td>
                      </tr>
                      <tr>
                        <th>Ordered Date</th>
                        <td>
                          {new Date(orderDetails.ordered_date).toLocaleString()}
                        </td>
                      </tr>
                      {/* Add more order details as needed */}
                    </tbody>
                  </table>
                </div>

                <h4 className="card-title">Order Items</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.product_price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.product_price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
