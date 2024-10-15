import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Nav from "../AdminComponents/Navs";
import { Toast, ToastContainer } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { deleteOrderItem } from "../../services/OrderService";
import "../../asset/css/order.css";
import { Card } from "react-bootstrap"; // Nhập Card từ react-bootstrap
import axios from 'axios'
function Order() {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [toasts, setToasts] = useState([]);

    const addToast = (message) => {
      const id = Date.now(); // Generate a unique ID for each toast
      setToasts([...toasts, { id, message }]);
    };
  const fetchOrderItems = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const response = await fetch(
        `https://localhost:7233/api/order/listorder?userId=${user.id}`
      );
      const data = await response.json();
      setOrderItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order items:", error);
      setError("Error fetching order items");
      setLoading(false);
    }
  };
  const handleDeletes = async (id) => {
    await deleteOrderItem(id);
    fetchOrderItems();
  };
  
  const handleDelete = async (orderId) => {
    try {
      // Gọi API để xóa tất cả các chi tiết đơn hàng theo orderId
      await axios.delete(`https://localhost:7233/api/order/deleteOrder/${orderId}`);
      addToast("Order canceled successfully.");
      fetchOrderItems(); // Cập nhật lại danh sách đơn hàng
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order: " + error.message);
    }
  };
  
  const handlePayment = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const email = user.email; // Giả định rằng email có trong thông tin người dùng

      // Kiểm tra xem selectedOrderId có phải là null không
      if (!selectedOrderId) {
        toast.error("Please select an order before proceeding with payment.");
        return;
      }

      const response = await axios.post(
        `https://localhost:7233/api/order/payment`,
        { orderId: selectedOrderId, email: email } // Gửi cả orderId và email
      );
      toast.success(response.data); // Hiển thị thông báo thành công
    } catch (error) {
      console.error("Error sending payment:", error);
      alert("Error sending payment: " + error.response?.data?.data?.title || error.message);
    }
  };



  useEffect(() => {
    fetchOrderItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Kiểm tra nếu tất cả các đơn hàng đều không có chi tiết
  const allOrdersEmpty = orderItems.every(
    (orderWithDetails) =>
      !orderWithDetails.orderDetails || orderWithDetails.orderDetails.length === 0
  );

  return (
    <>

      <section id="common_banner_cart">
        <div className="container">
          <div className="col-lg-12">
            <div className="common_banner_cart_text">
              <h1 className="text-center text-white">Order</h1>
              <p className="text-center text_bread">Home / Order</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container bangorder">
        <div className="my-3 d-flex justify-content-between">
          <span className="fs-3 text-white">List Orders:</span>
        </div>
        {orderItems.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          orderItems.map((orderWithDetails) => (
            <Card key={orderWithDetails.order.id} className="mb-4">
              <Card.Body>
                <Card.Title className="text-black">
                  Order ID: {orderWithDetails.order.id}
                </Card.Title>
                {orderWithDetails.orderDetails && orderWithDetails.orderDetails.length > 0 ? (
                  <Table className="bg-white">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Img</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderWithDetails.orderDetails.map((item) => (
                        <tr key={item.orderDetail.id}>
                          <td>{item.orderDetail.id}</td> {/* Hiển thị ID của chi tiết đơn hàng */}
                          <td>
                            <img
                              src={item.products.img}
                              style={{ width: "90px" }}
                              alt=""
                            />
                          </td>
                          <td>{item.products.nameProduct}</td>
                          <td>{item.orderDetail.quantity}</td>
                          <td>{item.orderDetail.totalPrice} $</td>
                          <td>
                          <Button
                              variant="danger"
                              onClick={() => handleDeletes(item.orderDetail.id)}
                            >
                              Cancel
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-0">
                      <tr>
                        <td colSpan={7} className="text-center border-0"> {/* Thay đổi colspan theo số cột của bảng */}
                        <Button
                              variant="danger"
                              onClick={() => handleDelete(orderWithDetails.order.id)}
                            >
                              Cancel
                            </Button>
                        </td>
                      </tr>
                    </tfoot>
                    
                  </Table>
                ) : (
                  <div>No order detail found.</div>
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </div>
      <ToastContainer
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1050,
        }}
        className="p-3"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            delay={1000}
            autohide
            onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
            className="mb-2"
            style={{ maxWidth: "300px" }}
          >
            <Toast.Header>
              <strong className="me-auto text-success fw-bold fs-5">
                Success
                <i className="bi bi-check2-circle text-success"></i>
              </strong>
            </Toast.Header>
            <Toast.Body className="bg-white">
              <h6>{toast.message}</h6>
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
}

export default Order;
