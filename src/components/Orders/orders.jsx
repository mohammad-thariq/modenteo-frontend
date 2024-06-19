// HomePage.js
import React, { useState, useEffect } from "react";
import { OrderTable } from "../../common";
import { getPaginatedData, itemsPerPage } from "../../utils/paginateddata";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { ManageOrderApi } from "../../service";
import { useMutation } from "react-query";
const Orders = () => {
  const { getOrder } = new ManageOrderApi();
  let userDetails = LocalStorageHelper.getItem(localStorageConst.USER);

  const [orderItems, setorderItems] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [limit, setLimit] = useState(1);
  
  const limit = 10;

  const { mutate: getOrders } = useMutation(getOrder, {
    onSuccess: (data) => {
      console.log(data, "datat");
      setorderItems(data?.order);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });
  useEffect(() => {
    let data = { page: 1, limit: 100, user_id: userDetails?.id };
    getOrders(data);
  }, [ getOrders, userDetails?.id]);

  // const totalPages = Math.ceil(orderItems.length / itemsPerPage);

  // const handlePageChange = (page) => {
    // setCurrentPage(page);
  // };

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <OrderTable
                  type="all"
                  data={getPaginatedData(orderItems, 1, orderItems.length)}
                />
{/*                 <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
