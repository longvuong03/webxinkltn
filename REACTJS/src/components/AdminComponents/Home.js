import React from "react";
import Nav from "./Navs";
import { useState, useEffect } from "react";
import axios from "axios";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import OrdersChart from "../OrderComponents/OrdersChart"; // Import component biểu đồ
import  "../../asset/css/orderchart.css"
import Table from "react-bootstrap/Table";

function Home() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách tất cả các đơn hàng
    axios.get("https://localhost:7233/api/order/listallorders")
      .then((response) => {
        setOrders(response.data);
        console.log(response.data); // Thêm dòng này để kiểm tra dữ liệu
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  // Tính toán các thông số cần thiết
  const totalOrders = orders.length; // Tổng số đơn hàng
  const totalEarnings = orders.reduce((acc, order) => acc + order.orderDetail.totalPrice, 0); // Tổng doanh thu
  const totalProducts = orders.reduce((acc, order) => acc + order.orderDetail.quantity, 0); // Tổng số sản phẩm
  const averageEarnings = totalOrders ? (totalEarnings / totalOrders).toFixed(2) : 0; // Doanh thu trung bình

  return (
    <div>
      <p className="mt-2 text-secondary">Pages/Dashboard</p>
      <p className="fs-3 fw-bold">Main Dashboard</p>
      <div className="">
        <div className="row g-3 my-2">
          {/* Các ô Earnings */}
          <div className="col-md-3">
            <div className="p-1 bg-white shadow-sm d-flex justify-content-center align-items-center rounded">
              <i className="bi bi-basket display-6 color-primary-icon-dashboard"></i>
              <div className="d-flex flex-column mx-4 mt-1">
                <span className="fs-6 text-secondary my-1">Total Orders</span>
                <p className="fs-3 fw-bold">{totalOrders}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-1 bg-white shadow-sm d-flex justify-content-center align-items-center rounded">
              <i className="bi bi-cash display-6 color-primary-icon-dashboard"></i>
              <div className="d-flex flex-column mx-4 mt-1">
                <span className="fs-6 text-secondary my-1">Total Earnings</span>
                <p className="fs-3 fw-bold">${totalEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-1 bg-white shadow-sm d-flex justify-content-center align-items-center rounded">
              <i className="bi bi-box display-6 color-primary-icon-dashboard"></i>
              <div className="d-flex flex-column mx-4 mt-1">
                <span className="fs-6 text-secondary my-1">Total Products</span>
                <p className="fs-3 fw-bold">{totalProducts}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-1 bg-white shadow-sm d-flex justify-content-center align-items-center rounded">
              <i className="bi bi-graph-up display-6 color-primary-icon-dashboard"></i>
              <div className="d-flex flex-column mx-4 mt-1">
                <span className="fs-6 text-secondary my-1">Avg Earnings</span>
                <p className="fs-3 fw-bold">${averageEarnings}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrdersChart orders={orders} />

      {/* Bảng hiển thị danh sách đơn hàng */}
      <div className="mt-4">
        <h4 className="text-center">Recent Orders</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Customer</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order, index) => (
              <tr key={index}>
                <td>{order.orderDetail.id}</td>
                <td>{order.products.nameProduct}</td>
                <td>{order.orderDetail.quantity}</td>
                <td>${order.orderDetail.totalPrice.toFixed(2)}</td>
                <td>{order.userName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Home;
