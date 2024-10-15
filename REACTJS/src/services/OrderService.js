import axios from "./customize-axios";

const AddOrder = async (UserId) => {
    try {
        const response = await axios.get(`/api/Order/AddOrder`, {
            params: {
                UserId,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};
// src/services/OrderService.js
const fetchAllOrders = async () => {
  try {
    const response = await fetch(`https://localhost:7233/api/Order/listallorders`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order items:", error);
    throw error; // Ném lỗi ra ngoài để xử lý ở component
  }
};

export const deleteOrderItem = async (id) => {
    try {
      await axios.delete(`/api/Order/${id}`);
      console.log('Item deleted successfully');
    } catch (error) {
      if (error.response) {
        // Nếu có phản hồi lỗi từ server
        console.error('Error deleting item:', error.response.data);
      } else {
        // Nếu không có phản hồi lỗi từ server
        console.error('Error deleting item:', error.message);
      }
    }
  };
export { AddOrder,fetchAllOrders};
