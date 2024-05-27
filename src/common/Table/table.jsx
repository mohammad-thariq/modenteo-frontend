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
                            <td> {item.orderNumber} </td>
                            <td>₹ {item.amount} </td>
                            <td>
                                <label className={`badge badge-gradient-${item.statusClass}`}>{item.status}</label>
                            </td>
                            <td>
                                <label className="badge badge-gradient-success">{item.paymentStatus}</label>
                            </td>
                            <td> {item.orderedDate} </td>
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

export  { OrderTable };
