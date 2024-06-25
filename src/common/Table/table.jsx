import React from "react";
import "../../styles/pagination.css";
import { BsEyeFill } from "react-icons/bs";
import NoDataFound from "../NoDataFound/nodatafound";
import moment from 'moment';
import { Link } from "react-router-dom";
const OrderTable = ({ data, type }) => {
  const getOrdertype = (type) => {
    let ordertype = "";
    switch (type) {
      case "all":
        ordertype = "All Orders";
        break;
      case "today":
        ordertype = "Today Orders";
        break;
      default:
        ordertype = "Orders";
        break;
    }
    return ordertype;
  };

  const getStatus = (status) => {
    let statusClass;
    switch (status) {
      case 0:
        statusClass = "warning";
        break;
      case 1:
        statusClass = "info";
        break;
      case 2:
        statusClass = "success";
        break;
      case 3:
        statusClass = "success";
        break;
      case 4:
        statusClass = "danger";
        break;
      default:
        statusClass = "info";
    }
    return statusClass;
  };

  const getStatusName = (status) => {
    let statusName;
    switch (status) {
      case 0:
        statusName = "Pending";
        break;
      case 1:
        statusName = "In-Progress";
        break;
      case 2:
        statusName = "Dispatched";
        break;
      case 3:
        statusName = "Delivered";
        break;
      case 4:
        statusName = "Declined";
        break;
      default:
        statusName = "Pending";
    }
    return statusName;
  };

  const getPaymentStatus = (status) => {
    let statusClass;
    switch (status) {
      case 0:
        statusClass = "warning";
        break;
      case 1:
        statusClass = "success";
        break;
      default:
        statusClass = "warning";
    }
    return statusClass;
  };

  const getPaymentStatusName = (status) => {
    let statusName;
    switch (status) {
      case 0:
        statusName = "Pending";
        break;
      case 1:
        statusName = "Paid";
        break;
      default:
        statusName = "Pending";
    }
    return statusName;
  };

  return (
    <div>
      <h4 className="card-title">{getOrdertype(type)}</h4>
      {data.length > 0 ?
        <table className="table">
          <thead>
            <tr>
              <th> Order ID </th>
              <th> Amount </th>
              <th> Order Status </th>
              <th> Payment Status </th>
              <th> Ordered Date </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td><Link to={"/order-details/" + item.id}>  {item.order_id} </Link></td>
                <td>₹ {item.total_amount} </td>
                <td>
                  <label
                    className={`badge badge-gradient-${getStatus(
                      item.order_status
                    )}`}
                  >
                    {getStatusName(item.order_status)}
                  </label>
                </td>
                <td>
                  <label
                    className={`badge badge-gradient-${getPaymentStatus(
                      item.payment_status
                    )}`}
                  >
                    {getPaymentStatusName(item.payment_status)}
                  </label>
                </td>
                <td> {moment(item.ordered_date).format('MMMM Do YYYY, hh:mm a')} </td>
                <td className="actions-order">
                  <BsEyeFill />
                </td>
              </tr>
            ))}
          </tbody>
        </table> :
        <NoDataFound />}
    </div>
  );
};

export { OrderTable };
