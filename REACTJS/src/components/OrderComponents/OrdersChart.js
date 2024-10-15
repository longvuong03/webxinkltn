import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const OrderChart = () => {
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderData = async () => {
    try {
      const response = await fetch("https://localhost:7233/api/Order/listallorders");
      const result = await response.json();

      // Tính toán doanh thu
      const revenueData = result.map(order => ({
        id: order.order.id,
        total: order.orderDetails.reduce((sum, item) => sum + item.orderDetail.totalPrice, 0),
      }));

      // Tính toán loại sản phẩm bán được
      const productCounts = {};
      result.forEach(order => {
        order.orderDetails.forEach(item => {
          const productName = item.products.nameProduct;
          productCounts[productName] = (productCounts[productName] || 0) + item.orderDetail.quantity;
        });
      });

      setOrderData(revenueData);
      setProductData(Object.entries(productCounts).map(([name, count]) => ({ name, count })));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError("Error fetching order data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  // Dữ liệu cho biểu đồ doanh thu (Line Chart)
  const revenueChartData = {
    labels: orderData.map(order => `Order ${order.id}`),
    datasets: [
      {
        label: "Total Revenue",
        data: orderData.map(order => order.total),
        fill: false, // Đặt fill là false để không tô màu bên dưới đường
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.3,
      },
    ],
  };

  // Dữ liệu cho biểu đồ loại sản phẩm bán được (Bar Chart)
  const productChartData = {
    labels: productData.map(product => product.name),
    datasets: [
      {
        label: "Products Sold",
        data: productData.map(product => product.count),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="row">
      <div className="col-6">
        <h4 className="text-center">Total Revenue</h4>
        <Line data={revenueChartData} />
      </div>
      <div className="col-6">
        <h4 className="text-center">Products Sold</h4>
        <Bar data={productChartData} />
      </div>
    </div>
  );
};

export default OrderChart;
