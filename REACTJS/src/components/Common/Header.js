import { head } from "lodash";
import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "../../asset/css/full.scss";
import "../../asset/css/header.css";
import "../../asset/bootstrap5.2/css/bootstrap.min.css";
import Searchbar from "../Common/Searchbar";
import { Button } from 'react-bootstrap';
import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OffcanvasComponent from '../Common/OffcanvasComponent';
var Diamond = require("../../asset/image/logo.png");
const Header = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isLoggedIns = user !== null;
  const userName = isLoggedIns ? user.last_name +" "+ user.first_name : "";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate("/logins");
  };
  const handleOrdersClick = () => {
    navigate(`/order`);
  };
  const navigate = useNavigate();
  return (
    <header>
      <div>
    </div>
          <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />

    <div className="container-fluid">
    
      <div className="row justify-content-end">
        <div className="col-2   logo-text">
          <img src={Diamond} alt="Shop Clothes Logo" style={{ width: '100px', height: '100px' }} />
          SHOPCLOTHES
        </div>
        <div className="col-4">
          <ul className="list-navigate-header">
            <li><Nav.Link
                      class="nav-link active  responsive_none"
                      as={NavLink}
                      to="/"
                      aria-current="page"
                    >
                      HOME
                    </Nav.Link></li>
            <li>SHOP</li>
            <li>BLOG</li>
            <li>PAGE</li>
            <li>ABOUT US</li>
          </ul>
        </div>
        <div className="col-5  btn-header-to">
          <span>
            <input type="text" />
            <i className="fa-solid fa-magnifying-glass kinhlup-header"></i>
          </span>
          
          <a variant="primary" onClick={handleShow}>
                        <i class="fa-solid fa-cart-shopping fs-4 mt-2 mx-3 nav-link iconmt responsive_none position-relative "></i>
                      </a>
          <span className="d-flex mt-1 mx-3"><i class="fa-solid fa-user mt-1 mx-2"></i>{isLoggedIns ? (
            <NavDropdown title={userName || "User"}>
                <NavDropdown.Item onClick={handleOrdersClick}>
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Setting">
                <NavDropdown.Item href="/logins">Login</NavDropdown.Item>
              </NavDropdown>
              
            )}</span>
        </div>
      </div>
    </div>
    <OffcanvasComponent show={show} onHide={handleClose} />
  </header>
  );
};

export default Header;
