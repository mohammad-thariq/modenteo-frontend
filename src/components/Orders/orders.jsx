// HomePage.js
import React, { useState } from 'react';
import { OrderTable, CustomPagination } from '../../common';
import { getPaginatedData, itemsPerPage } from '../../utils/paginateddata';
const Orders = () => {

    const orderData = [
        {
            user: "User 1",
            img: "assets/images/faces/face1.jpg",
            orderNumber: "#ORD123",
            status: "DONE",
            statusClass: "success",
            paymentStatus: "DONE",
            amount: '100',
            orderedDate: "Dec 5, 2017"
        },
        {
            user: "User 2",
            img: "assets/images/faces/face3.jpg",
            orderNumber: "#ORD123",
            status: "ON-HOLD",
            amount: '200',
            statusClass: "info",
            paymentStatus: "DONE",
            orderedDate: "Dec 5, 2017"
        },
        {
            user: "User 3",
            img: "assets/images/faces/face3.jpg",
            orderNumber: "#ORD123",
            amount: '1000',
            status: "REJECTED",
            statusClass: "danger",
            paymentStatus: "DONE",
            orderedDate: "Dec 5, 2017"
        },
        {
            user: "User 4",
            img: "assets/images/faces/face4.jpg",
            amount: '4800',
            orderNumber: "#ORD123",
            status: "PROCESS",
            statusClass: "warning",
            paymentStatus: "DONE",
            orderedDate: "Dec 5, 2017"
        },
        // Add more data items as needed
    ];
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(orderData.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <OrderTable type="all" data={getPaginatedData(orderData, currentPage)} />
                                <CustomPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
