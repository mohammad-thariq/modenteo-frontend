import React from 'react';
import '../../styles/pagination.css';
import { BsEyeFill } from 'react-icons/bs';
const OrderTable = ({ data, type }) => {
    const getOrdertype = (type) => {
        let ordertype = '';
        switch (type) {
            case 'all':
                ordertype = 'All Orders';
                break;
            case 'recent':
                ordertype = 'Recent Orders';
                break;
            default:
                ordertype = 'Orders';
                break

        }
        return ordertype;
    }
    const getStatus = (status) => {
        let statusClass;
        switch (status) {
            case 0:
                statusClass = 'warning';
                break;
            case 1:
                statusClass = 'info';
                break;
            case 2:
                statusClass = 'success';
                break;
            default:
                statusClass = 'info';
        }
        return statusClass;
    }
    const getStatusName = (status) => {
        let statusName;
        switch (status) {
            case 0:
                statusName = 'Pending';
                break;
            case 1:
                statusName = 'In-Progress';
                break;
            case 2:
                statusName = 'Success';
                break;
            default:
                statusName = 'Pending';
        }
        return statusName;
    }


    return (
        <div>
            <h4 className="card-title">{getOrdertype(type)}</h4>
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
                            <td> {item.order_id} </td>
                            <td>₹ {item.total_amount} </td>
                            <td>
                                <label className={`badge badge-gradient-${getStatus(item.order_status)}`}>{getStatusName(item.order_status)}</label>
                            </td>
                            <td>
                                <label className="badge badge-gradient-success">{item.payment_status}</label>
                            </td>
                            <td> {item.ordered_date} </td>
                            <td className='actions-order'>
                                <BsEyeFill />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { OrderTable };
