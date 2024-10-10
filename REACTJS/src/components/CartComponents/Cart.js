import React, { useEffect, useState } from "react";
import {
  deleteQuantitycart,
  addQuantitycart,
} from "../../services/CartService";
import {
  AddOrder,
} from "../../services/OrderService";

import { Routes, Route, useNavigate } from "react-router-dom";
import "../../asset/css/cart.css";
import '../../asset/css/order.css';
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  function deleteCartItem(id) {
    fetch(`https://localhost:7233/api/cart/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.cartDetail.id !== id)
          );
          console.log("Cart item deleted successfully");
        } else {
          console.error("Failed to delete cart item");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const deleteQuanity = async (ProductID) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.id) {
      try {
        await deleteQuantitycart(user.id, ProductID);
        await fetchCartItems();
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    } else {
      navigate("/login");
    }
  };
  const addQuanity = async (ProductID) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.id) {
      try {
        await addQuantitycart(user.id, ProductID);
        await fetchCartItems();
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    } else {
      navigate("/login");
    }
  };
  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const response = await fetch(
        `https://localhost:7233/api/cart/listcarrt?userId=${user.id}`
      ); // Nối UserId vào URL
      const data = await response.json();
      setCartItems(data);
      console.log(data.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleDelete = (id) => {
    deleteCartItem(id);
  };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.cartDetail.totalPrice;
    }, 0);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const AddOrders = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    await AddOrder(user.id);
    await fetchCartItems();
  };

  return (
    <>
      <section id="common_banner_cart">
        <div className="container">
          <div className="col-lg-12">
            <div className="common_banner_cart_text">
              <h1 className="text-center text-white">CART</h1>
              <p className="text-center text_bread">Home / Cart</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid mt-5 mb-5 bangorder">
          <div className="row justify-content-around">
            <div className="col-8">
              <table className="table table-borderless table_cart">
                <thead className="head_table_cart text-center">
                  <tr>
                    <th scope="col">IMAGE</th>
                    <th scope="col">PRODUCT</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col">REMOVE</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr className="row_table_cart">
                      <td>
                        <img
                          className="imgcart"
                          src={item.products.img}
                          alt="Product"
                        />
                      </td>
                      <td>{item.products.nameProduct}</td>
                      <td>{item.products.price} $</td>
                      <td>
                        <button
                          className="p-1 m-2 bg-white fw-bold"
                          onClick={() => deleteQuanity(item.products.id)}
                        >
                          -
                        </button>
                        {item.cartDetail.quantity}
                        <button
                          className="p-1 m-2 bg-white fw-bold"
                          onClick={() => addQuanity(item.products.id)}
                        >
                          +
                        </button>
                      </td>
                      <td>{item.cartDetail.totalPrice} $</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.cartDetail.id)}
                        >
                          <i class="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-3 cart_total">
              <div className="head_cart_total">CART TOTAL</div>
              <div className="cart_total_text px-3 mt-1">
                <div className="subtotal_text d-flex justify-content-between">
                  <p>Subtotal</p>
                  <p>{calculateTotal()} $</p>
                </div>
                <div className="shipping_text d-flex justify-content-between">
                  <p>Shipping</p>
                  <p>25 $</p>
                </div>
                <hr />
                <div className="shipping_text d-flex justify-content-between">
                  <p>Total:</p>
                  <p>{calculateTotal() + 25} $</p>
                </div>
                <div className="shipping_text d-flex justify-content-end">
                  <button onClick={AddOrders} className="btn_shopnow">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
