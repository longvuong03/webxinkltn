import React from "react";
import Nav from "./Navs";
import { useState, useEffect } from "react";
import axios from "axios";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import OrdersChart from "../OrderComponents/OrdersChart"; // Import component biểu đồ
import "../../asset/css/orderchart.css";
import Table from "react-bootstrap/Table";

function Home() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [avgEarnings, setAvgEarnings] = useState(0);

  useEffect(() => {
    // Gọi API để lấy danh sách tất cả các đơn hàng
    axios.get("https://localhost:7233/api/order/listallorders")
      .then((response) => {
        const fetchedOrders = response.data;
        setOrders(fetchedOrders);
        
        // Tính toán các thông số
        const earnings = fetchedOrders.reduce((sum, order) => {
          const orderTotal = order.orderDetails.reduce((total, item) => total + item.orderDetail.totalPrice, 0);
          return sum + orderTotal;
        }, 0);
        
        const productsCount = fetchedOrders.reduce((count, order) => {
          return count + order.orderDetails.reduce((total, item) => total + item.orderDetail.quantity, 0);
        }, 0);

        setTotalOrders(fetchedOrders.length);
        setTotalEarnings(earnings);
        setTotalProducts(productsCount);
        setAvgEarnings(fetchedOrders.length > 0 ? (earnings / fetchedOrders.length).toFixed(2) : 0);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div>
      <p className="mt-2 text-secondary">Pages/Dashboard</p>
      <p className="fs-3 fw-bold">Main Dashboard</p>
      <div>
        <div className="row g-3 my-2">
          {/* Các ô Earnings */}
          <div className="col-md-3">
            <div className="p-1 bg-white shadow-sm d-flex justify-content-center align-items-center rounded">
              <i className="bi bi-basket display-6 color-primary-icon-dashboard"></i>
              <div className="d-flex flex-column mx-4 mt-1">
                <span className="fs-6 text-secondary my-1">Total Orders</span>
                <p className="fs-3 fw-bold">{totalOrders}</p> {/* Hiển thị tổng số đơn hàng */}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-1 bg-white shadow-sm d-flex justify-content-center align-items-center rounded">
              <i className="bi bi-cash display-6 color-primary-icon-dashboard"></i>
              <div className="d-flex flex-column mx-4 mt-1">
                <span className="fs-6 text-secondary my-1">Total Earnings</span>
                <p className="fs-3 fw-bold">${totalEarnings.toFixed(2)}</p> {/* Hiển thị tổng doanh thu */}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-1 bg-white shadow-sm d-flex justify-content-center align-items-center rounded">
              <i className="bi bi-box display-6 color-primary-icon-dashboard"></i>
              <div className="d-flex flex-column mx-4 mt-1">
                <span className="fs-6 text-secondary my-1">Total Products</span>
                <p className="fs-3 fw-bold">{totalProducts}</p> {/* Hiển thị tổng số sản phẩm */}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-1 bg-white shadow-sm d-flex justify-content-center align-items-center rounded">
              <i className="bi bi-graph-up display-6 color-primary-icon-dashboard"></i>
              <div className="d-flex flex-column mx-4 mt-1">
                <span className="fs-6 text-secondary my-1">Avg Earnings</span>
                <p className="fs-3 fw-bold">${avgEarnings}</p> {/* Hiển thị doanh thu trung bình */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrdersChart />

      
    </div>
  );
}

export default Home;
