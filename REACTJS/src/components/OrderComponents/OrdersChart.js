import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const OrdersChart = ({ orders }) => {
  // Tạo dữ liệu cho biểu đồ số lượng sản phẩm đã bán
  const quantityData = orders.reduce((acc, item) => {
    const productName = item.products.nameProduct;
    const existing = acc.find((entry) => entry.name === productName);

    if (existing) {
      existing.value += item.orderDetail.quantity;
    } else {
      acc.push({ name: productName, value: item.orderDetail.quantity });
    }
    return acc;
  }, []);

  // Tạo dữ liệu cho biểu đồ doanh thu theo từng đơn hàng
  const revenueData = orders.map((item) => ({
    orderId: item.id,
    totalRevenue: item.orderDetail.totalPrice,
  }));

  // Tính tổng doanh thu tích lũy
  const accumulatedRevenue = revenueData.reduce((acc, curr) => {
    if (acc.length === 0) {
      acc.push({ orderId: curr.orderId, cumulativeRevenue: curr.totalRevenue });
    } else {
      const lastCumulativeRevenue = acc[acc.length - 1].cumulativeRevenue;
      acc.push({ orderId: curr.orderId, cumulativeRevenue: lastCumulativeRevenue + curr.totalRevenue });
    }
    return acc;
  }, []);

  return (
    <div className="row">
      <div className="col-6">
        <BarChart width={500} height={300} data={quantityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
        <small className="chart-description">Number of products sold.</small>
      </div>

      <div className="col-6">
        <LineChart width={500} height={300} data={accumulatedRevenue}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="orderId" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cumulativeRevenue" stroke="#82ca9d" />
        </LineChart>
        <small className="chart-description">Cumulative revenue by order.</small>
      </div>
    </div>
  );
};

export default OrdersChart;
