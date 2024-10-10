import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useScript from "./hook/useScript";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TableUser from "./components/UserComponents/TableUser";
import TableProduct from "./components/Product/TableProduct";
import Order from "./components/OrderComponents/Order";
import Register from "./components/Home/Register";
import TableOrder from "./components/OrderComponents/TableOrder"
import Home from "./components/AdminComponents/Home";
import LoginForm from "./components/Home/Login";
import Product from "./components/Product/Product";
import Productdetail from "./components/Product/Productdetail";
import MainLayout from "./components/AdminComponents/MainLayout";
import AdminLayout from "./components/AdminComponents/AdminLayout";
import Sidebar from "./components/AdminComponents/Sidebar";
import Cart from "./components/CartComponents/Cart";
import './asset/css/dashboard-home.css'; // Chứa CSS của em

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    if (user.first_name === 'Long') {
      navigate('/admin/home');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate("/logins");
  };

  useEffect(() => {
    const session = sessionStorage.getItem('user');
    const currentPath = window.location.pathname;
  
    if (session) {
      const user = JSON.parse(session);
      setIsLoggedIn(true);
      setUserInfo(user);
    } else if (currentPath !== '/logins' && currentPath !== '/register') {
      navigate('/logins');
    }
  }, [navigate]);

  const AdminRoute = ({ children }) => {
    if (userInfo?.first_name !== 'Long') {
      return <LoginForm handleLogin={handleLogin} />;
    }
    return children;
  };
  

  useScript();

  return (
    <>

      <Routes>
        {/* Trang chủ không yêu cầu đăng nhập */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Product />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />
        <Route
          path="/Cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/Order"
          element={
            <MainLayout>
              <Order />
            </MainLayout>
          }
        />
        <Route
          path="/productdetail/:idproduct"
          element={
            <MainLayout
            >
              <Productdetail />
            </MainLayout>
          }
        />
        <Route
          path="/logins"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout
                isLoggedIn={isLoggedIn}
                userInfo={userInfo}
                handleLogout={handleLogout}
              >
                <div className="container-fluid bg-dashboard min-vh-100">
                  <div className="row">
                    <div className="col-2 vh-100 bg-white">
                      <Sidebar
                        isLoggedIn={isLoggedIn}
                        userInfo={userInfo}
                        handleLogout={handleLogout}
                      />
                    </div>
                    <div className="col-10">
                      <Routes>
                        <Route path="home" element={<Home />} />
                        <Route path="users" element={<TableUser />} />
                        <Route path="products" element={<TableProduct />} />
                        <Route path="orders" element={<TableOrder />} />
                        {/* Add other admin routes here */}
                      </Routes>
                    </div>
                  </div>
                </div>
              </AdminLayout>
            </AdminRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
    </>
  );
}

export default App;
