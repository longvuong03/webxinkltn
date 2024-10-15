import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getbyidesUser } from "../../services/UserServices"; // Dịch vụ lấy thông tin người dùng
import { deleteOrderItem } from "../../services/OrderService"; // Dịch vụ xóa đơn hàng

const OrdersTable = ({ orders }) => {
  const [userNames, setUserNames] = useState({}); // Sử dụng object để lưu tên người dùng theo userId

  const fetchUserNames = async (orders) => {
    const users = {};
    await Promise.all(
      orders.map(async (orderWithDetails) => {
        const userId = orderWithDetails.order.userId;
        if (!users[userId]) { // Kiểm tra nếu tên người dùng chưa được lấy
          const user = await getbyidesUser(userId);
          users[userId] = user ? user.first_name : "Unknown";
        }
      })
    );
    return users;
  };

  useEffect(() => {
    const getUserNames = async () => {
      const names = await fetchUserNames(orders);
      setUserNames(names);
    };

    if (orders.length > 0) {
      getUserNames();
    }
  }, [orders]);

  const groupedOrders = orders.reduce((acc, orderWithDetails) => {
    const orderId = orderWithDetails.order.id;
    if (!acc[orderId]) {
      acc[orderId] = {
        ...orderWithDetails,
        orderDetails: [],
      };
    }
    acc[orderId].orderDetails.push(...orderWithDetails.orderDetails);
    return acc;
  }, {});

  const groupedOrderItems = Object.values(groupedOrders);

  return (
    <div className="mt-4">
      <h4 className="text-center">Recent Orders</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Img</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groupedOrderItems.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No orders found.</td>
            </tr>
          ) : (
            groupedOrderItems.map((orderWithDetails) =>
              orderWithDetails.orderDetails.map((item, index) => (
                <tr key={item.orderDetail.id}>
                  {index === 0 && (
                    <>
                      <td rowSpan={orderWithDetails.orderDetails.length}>{orderWithDetails.order.id}</td>
                      <td rowSpan={orderWithDetails.orderDetails.length}>{userNames[orderWithDetails.order.userId]}</td>
                    </>
                  )}
                  <td>
                    <img src={item.products.img} style={{ width: "90px" }} alt="" />
                  </td>
                  <td>{item.products.nameProduct}</td>
                  <td>{item.orderDetail.quantity}</td>
                  <td>${item.orderDetail.totalPrice.toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteOrderItem(item.orderDetail.id)}>
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersTable;
