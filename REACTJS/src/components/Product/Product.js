import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.json";
import _ from "lodash";
import "./full.css";
import { addCart } from "../../services/CartService";
import { fetchAllProduct, getbyidProduct } from "../../services/ProductService";
import Bannerone from "../Common/Bannerone";

import Blogandsocial from "../Common/Blogandsocial";
import ProductVariation from "../Common/ProductVariation";
import Scrolltotop from "../Common/Scrolltotop";
import { Toast, ToastContainer } from "react-bootstrap"; // Nhập khẩu ToastContainer
import { useNavigate } from "react-router-dom";


const Product = () => {
  const [showToast, setShowToast] = useState(false); // State cho Toast
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [isShow, setShow] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now(); // Generate a unique ID for each toast
    setToasts([...toasts, { id, message }]);
  };
  const [isShowedit, setShowedit] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial products when component mounts
    getUsers(1); // Assuming page 1 initially
  }, []);

  const getUsers = async (page) => {
    try {
      let res = await fetchAllProduct(page);
      if (res && res.length > 0) {
        setListProduct(res); // Update state with fetched products array
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.error("Error fetching products:", error); // Log and possibly display error to user
    }
  };

  const handleProductClick = (idproduct) => {
    navigate(`/productdetail/${idproduct}`);
  };
  const handleAddToCart = async (id) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const UserId = user.id;
    const ProductId = id;
    const quantity = 1;
    console.log(UserId, ProductId);
    const response = await addCart(UserId, ProductId, quantity);
    console.log("Response from server:", response);
    addToast("Add to cart success"); // Hiển thị Toast khi thêm sản phẩm vào giỏ hàng thành công
  };
  return (
    <div className="container-fluid">
      <Bannerone />

      <ProductVariation />
      <div className="container mb-5">
        <div className="row text-center">
          <span className="color-primary fs-3">Special Offer</span>
          <p className="fs-1 fw-bold">TOP COLLECTION</p>
          <div className="col-12">
            <div className="hr-special-offer mb-4"></div>
          </div>
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </div>
        </div>
      </div>

      <div className="container">
        <div className="product-list">
          <div className="row">
            {listProduct.map((product) => (
              <div className="col-lg-3 col-sm-6 my-2" key={product.id}>
                <div className="products">
                  <div className="product-item">
                    <div className="card">
                      <img
                        src={product.img}
                        className="card-img-top imghover"
                        alt=""
                      />

                      <div className="card-hover-icon">
                        <a onClick={() => handleAddToCart(product.id)}>
                          <i className="fa-solid fa-cart-shopping fs-3 mt3 "></i>
                        </a>
                        <a href="#">
                          <i className="fa-regular fa-heart fs-3 mt-3 "></i>
                        </a>
                        <a onClick={() => handleProductClick(product.id)}>
                          <i className="fa-solid iconmt fa-magnifying-glass fs-3 mt-3"></i>
                        </a>
                        <a href="#">
                          <i className="fa-solid fa-link fs-3  mt-3"></i>
                        </a>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-warning fs-6">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </h5>
                        <p className="card-text">{product.nameProduct}</p>
                        <span>
                          <strong>$ {product.price} &emsp;</strong>
                          <span className="text-secondary text-decoration-line-through">
                            $205.3
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-cart">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Cart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container container-cart">
                <div className="row fw-bold text-center product-header">
                  <hr />
                  <div className="col-2">
                    <p>Products</p>
                  </div>
                  <div className="col-2">
                    <p>Name</p>
                  </div>
                  <div className="col-2">
                    <p>Price</p>
                  </div>
                  <div className="col-2">
                    <p>Quantity</p>
                  </div>
                </div>
                <div className="row product text-center">
                  <div className="col-2">
                    <img
                      src="./images/pro1.jpg"
                      alt=""
                      className="img-fluid h-50"
                    />
                  </div>
                  <div className="col-2 fw-bold color-primary mt-4">
                    <p className="name-product">Black Dress</p>
                  </div>
                  <div className="col-2 fw-bold color-primary mt-4">
                    <p className="price-product">12$</p>
                  </div>
                  <div className="col-2 fw-bold color-primary mt-4">
                    <p className="quantity-product">1</p>
                  </div>
                  <div className="col-2 fw-bold color-primary mt-4">
                    <p className="total-product">12$</p>
                  </div>
                  <div className="col-2 mt-3 fs-3 text-start">
                    <span>
                      <i className="fa-solid fa-circle-xmark"></i>
                    </span>
                  </div>
                </div>
                <p className="position-absolute bottom-0 end-0 mx-5 totalplus">
                  Total: <span className="">0$</span>{" "}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn bg-color-primary text-white">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="paralax mt-4 mb-5">
        <div class="paralax-content">
          <h1 class="color-primary">2024</h1>
          <h2>FASHION TRENDS</h2>
          <h3 class="text-secondary">SPECIAL OFFER</h3>
        </div>
      </div>
      <div class="container">
        <hr />
        <div class="row">
          <div class="col-lg-4 col-sm-12 fs-4 border border-start-0 border-top-0 border-bottom-0 border-2">
            <div class="row mt-1">
              <div class="col-2 offset-1 text-end">
                <i class="fa-solid fa-truck color-primary fs-1 mt-2"></i>
              </div>
              <div class="col-8">
                <span class="color-primary fw-bold">FREE SHIPPING</span>
                <p class="fs-6 text-secondary">Free Shipping World Wide</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-12 fs-4 border border-start-0 border-top-0 border-bottom-0 border-2">
            <div class="row mt-1">
              <div class="col-2 offset-1 text-end">
                <i class="fa-solid fa-clock-rotate-left color-primary fs-1 mt-2"></i>
              </div>
              <div class="col-8">
                <span class=" color-primary fw-bold">24/7 SERVICE</span>
                <p class="fs-6 text-secondary">
                  Online Service For New Customer
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-12 fs-4">
            <div class="row mt-1">
              <div class="col-2 offset-1 text-end">
                <i class="fa-solid fa-bullhorn color-primary fs-1 mt-2"></i>
              </div>
              <div class="col-8">
                <span class=" color-primary fw-bold">FESTIVAL OFFER</span>
                <p class="fs-6 ">New Online Special Festival Offer</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <Blogandsocial/>
      <Scrolltotop />
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
    </div>
  );
};

export default Product;
