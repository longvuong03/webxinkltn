import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import '../../asset/css/sb.css'; // Chứa CSS của em
var Diamond = require('../../asset/image/logo.png');

const Sidebar = ({ isLoggedIn, userInfo, handleLogout }) => {
    return (
        <div className="bg-white">
            <div className="row">
                <img src={Diamond} alt="" style={{ width: '60%', margin: '0 auto' }} />
            </div>
            <div className="px-3 mt-4 d-flex flex-column">
                <NavLink
                    to="/admin/home"
                    className={({ isActive }) =>
                        isActive ? 'active-link list-group-item py-2 d-flex' : 'list-group-item py-2 d-flex'
                    }
                >
                    <i class="bi bi-house-door-fill fs-5 me-3"></i>
                    <span className="fs-5">DashBoard</span>
                </NavLink>
                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        isActive ? 'active-link list-group-item py-2 d-flex' : 'list-group-item py-2 d-flex'
                    }
                >
                    <i className="bi bi-table fs-5 me-3"></i>
                    <span className="fs-5">Product</span>
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive ? 'active-link list-group-item py-2 d-flex' : 'list-group-item py-2 d-flex'
                    }
                >
                    <i className="bi bi-person fs-5 me-3"></i>
                    <span className="fs-5">User</span>
                </NavLink>
                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        isActive ? 'active-link list-group-item py-2 d-flex' : 'list-group-item py-2 d-flex'
                    }
                >
                    <i className="bi bi-person fs-5 me-3"></i>
                    <span className="fs-5">Order</span>
                </NavLink>
                <a className="list-group-item py-2 d-flex">
                    <i className="bi bi-lock fs-5 me-3"></i>
                    <span className="fs-5">
                        {isLoggedIn ? (
                            <NavDropdown title={userInfo?.first_name || 'User'}>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavDropdown title="Setting">
                                <NavDropdown.Item href="/logins">Login</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </span>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
