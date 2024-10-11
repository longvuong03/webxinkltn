import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../asset/css/full.scss";
import "../../asset/css/header.css";
import "../../asset/bootstrap5.2/css/bootstrap.min.css";
import { Nav, NavDropdown } from "react-bootstrap";
import OffcanvasComponent from '../Common/OffcanvasComponent';
import { fetchAllProduct } from "../../services/ProductService";
import Product from "../Product/Product";
var Diamond = require("../../asset/image/logo.png");

const Header = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isLoggedIns = user !== null;
  const userName = isLoggedIns ? user.last_name + " " + user.first_name : "";
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false); // Trạng thái cho ô input

  const fetchAllProducts = async (page = 1) => {
    try {
      const response = await fetchAllProduct(page); // Gọi API
      console.log("Full response:", response); // Kiểm tra phản hồi đầy đủ
      setAllProducts(response); // Trực tiếp thiết lập allProducts thành mảng nhận được
      setFilteredProducts(response); // Cũng thiết lập filteredProducts
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = allProducts.filter((product) =>
        product.nameProduct.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 3)); // Chỉ lấy 2-3 sản phẩm gợi ý
    } else {
      setFilteredProducts([]); // Ẩn tất cả sản phẩm khi không có từ khóa
    }
  };

  useEffect(() => {
    fetchAllProducts(); // Gọi lần đầu khi component mount
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/logins");
  };
  const goToProduct = (productId) => {
    navigate(`/productdetail/${productId}`);
  };
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="container-fluid">
          <div className="row justify-content-end">
            <div className="col-2 logo-text">
              <img src={Diamond} alt="Shop Clothes Logo" style={{ width: '100px', height: '100px' }} />
              SHOPCLOTHES
            </div>
            <div className="col-4">
              <ul className="list-navigate-header">
                <li><Nav.Link as={NavLink} to="/" aria-current="page">HOME</Nav.Link></li>
                <li>SHOP</li>
                <li>BLOG</li>
                <li>PAGE</li>
                <li>ABOUT US</li>
              </ul>
            </div>
            <div className="col-5 btn-header-to">
            <span className="search-container">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search products..."
                  className="form-control"
                  onFocus={() => setIsInputActive(true)}
                  onBlur={() => setIsInputActive(false)}
                />
                <span className="search-icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                {isInputActive && searchTerm && filteredProducts.length > 0 && (
                  <ul className="search-results">
                    {filteredProducts.map((product) => (
                      <li 
                        key={product.id} 
                        className="search-result-item" 
                        onClick={() => goToProduct(product.id)}
                      >
                        {product.nameProduct}
                      </li>
                    ))}
                  </ul>
                )}
              </span>

              <a variant="primary" onClick={handleShow}>
                <i className="fa-solid fa-cart-shopping fs-4 mt-2 mx-3 nav-link iconmt responsive_none position-relative "></i>
              </a>
              <span className="d-flex mt-1 mx-3">
                <i className="fa-solid fa-user mt-1 mx-2"></i>
                {isLoggedIns ? (
                  <NavDropdown title={userName || "User"}>
                    <NavDropdown.Item onClick={() => navigate(`/order`)}>Orders</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate(`/profile`)}>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavDropdown title="Setting">
                    <NavDropdown.Item href="/logins">Login</NavDropdown.Item>
                  </NavDropdown>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <OffcanvasComponent show={show} onHide={handleClose} />
    </header>
  );
};

export default Header;
