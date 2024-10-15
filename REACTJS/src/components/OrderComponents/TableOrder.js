import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getbyidesUser } from "../../services/UserServices"; // Dịch vụ lấy thông tin người dùng
import { deleteOrderItem } from "../../services/OrderService"; // Dịch vụ xóa đơn hàng

const OrdersTable = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [userNames, setUserNames] = useState({}); // Sử dụng object để lưu tên người dùng theo userId

  const fetchOrderItems = async () => {
    try {
      const response = await fetch(`https://localhost:7233/api/Order/listallorders`);
      const data = await response.json();
      setOrderItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order items:", error);
      setError("Error fetching order items");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteOrderItem(id);
    fetchOrderItems(); // Cập nhật lại danh sách sau khi xóa
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const fetchUserNames = async (orderItems) => {
    const users = {};
    await Promise.all(
      orderItems.map(async (orderWithDetails) => {
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
      const names = await fetchUserNames(orderItems);
      setUserNames(names);
    };

    if (orderItems.length > 0) {
      getUserNames();
    }
  }, [orderItems]);

  const groupedOrders = (orderItems || []).reduce((acc, orderWithDetails) => {
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

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = groupedOrderItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(groupedOrderItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className=" d-flex justify-content-between">
          <div>
            <p className="mt-3 text-secondary">Pages/Dashboard/Order</p>
            <p className="fs-3 fw-bold">Main Dashboard</p>
          </div>
        </div>
      <div className="container">
        {currentItems.length === 0 ? (
          <div>No orders found.</div>
        ) : (
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
              {currentItems.map((orderWithDetails) => (
                orderWithDetails.orderDetails.map((item, index) => (
                  <tr key={item.orderDetail.id}>
                    {index === 0 && (
                      <>
                        <td rowSpan={orderWithDetails.orderDetails.length}>{orderWithDetails.order.id}</td>
                        <td rowSpan={orderWithDetails.orderDetails.length}>{userNames[orderWithDetails.order.userId]}</td> {/* Hiển thị tên người dùng */}
                      </>
                    )}
                    <td>
                      <img src={item.products.img} style={{ width: "90px" }} alt="" />
                    </td>
                    <td>{item.products.nameProduct}</td>
                    <td>{item.orderDetail.quantity}</td>
                    <td>{item.orderDetail.totalPrice} $</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(item.orderDetail.id)}>
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button 
            key={index + 1} 
            onClick={() => handlePageChange(index + 1)} 
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;
