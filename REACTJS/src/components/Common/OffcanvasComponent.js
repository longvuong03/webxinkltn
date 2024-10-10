// src/components/OffcanvasComponent.js

import React, { useEffect, useState } from "react";
import {
  deleteQuantitycart,
  addQuantitycart,
} from "../../services/CartService";
import "../../asset/css/OffcanvasComponent.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";

const OffcanvasComponent = ({ show, onHide }) => {
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
  const handleClickCart = async() =>{
    onHide();
    navigate("/cart");
    
  }
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
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const subtotal = cartItems.reduce((total, item) => total + item.cartDetail.totalPrice, 0);

  const handleDelete = (id) => {
    deleteCartItem(id);
  };
  useEffect(() => {
    fetchCartItems();
  }, [show]);
  return (
    <Offcanvas show={show} onHide={onHide} placement="end" scroll>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
          <div className="cartmini" >
                {cartItems.map((item, index) => (
              <div className="row" key={item.cartDetail.id}>
                <div className="col-4 mb-3">
                  <img
                    className="imgcart"
                    src={item.products.img}
                    style={{width:"80px"}}
                    alt="Product"
                  />
                </div>
                <div className="col-6">
                    <p className="fw-bold">{item.products.nameProduct}</p>
                    <span>{item.cartDetail.quantity} x {item.products.price}$</span>
                </div>
                <div className="col-1">
                <i class="fa-solid fa-trash text-danger fs-4" onClick={() => handleDelete(item.cartDetail.id)}></i>
                </div>
              
            </div>
            ))}
            <div className="row mt-3  justify-content-between">
                <div className="col-6 ">
                    <span className="fs-4 fw-bold">Total :</span>
                </div>
                <div className="col-4 text-end">
                <span className="fs-4"> {subtotal}$</span>
                </div>
              </div>
            </div>
            <div className="row justify-content-between mt-3">
                <div className="col-6">
            <button className="btn_shopnow"  onClick={() => handleClickCart()}>View Cart</button>

                </div>
                <div className="col-6">
            <button className="btn_shopnow">CheckOut </button>

                </div>
            </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasComponent;
