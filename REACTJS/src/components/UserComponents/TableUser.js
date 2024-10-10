import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Table from "react-bootstrap/Table";
import {
  getbyideUser,
  deleteUser,
  fetchAllUser,
} from "../../services/UserServices";
import ModalAddUser from "./ModalAddUser";
import Button from "react-bootstrap/Button";
import ModalEditUser from "./ModalEditUser";
import { useNavigate } from "react-router-dom";
import Nav from "../AdminComponents/Navs";
import _ from "lodash";
const TableUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  const [listUsers, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [showPasswordColumn, setShowPasswordColumn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [isShow, setShow] = useState(false);
  const [isShowedit, setShowedit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const handleClose = () => {
    setShow(false);
    setShowedit(false);
  };
  const handleShow = () => setShow(true);

  const checkAuth = () => {
    const session = sessionStorage.getItem("user");
    console.log("Session storage:", session); // Kiểm tra dữ liệu session
    const userIsAuthenticated = session ? true : false;
    setIsLoggedIn(userIsAuthenticated);
    setIsCheckingAuth(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    if (!isCheckingAuth) {
      if (!isLoggedIn) {
        navigate("/logins");
      } else {
        getUsers(1);
      }
    }
  }, [isLoggedIn, isCheckingAuth, navigate]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }
  const handleUpdateTable = (user) => {
    setListUser([user, ...listUsers]);
  };

  const handleEditUserFrommodal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    cloneListUser[index].last_name = user.last_name;
    cloneListUser[index].email = user.email;
    cloneListUser[index].avatar = user.avatar;
    cloneListUser[index].address = user.address;
    cloneListUser[index].password = user.password;
    setListUser(cloneListUser);
  };
  // useEffect(() => {
  //     getUsers(1);
  // }, [])

  const getUsers = async (page) => {
    try {
      let res = await fetchAllUser(page);
      if (res && res.length > 0) {
        setTotalUser(res.total);
        setListUser(res);
        setTotalPage(Math.ceil(res.total_page));
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.error("Error fetching users:", error); // Log any errors
    }
  };
  const handleSearch = () => {
    return _.sortBy(
      listUsers.filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      ["id"]
    );
  };

  const handlePageClick = (event) => {
    getUsers(event.selected + 1);
  };
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      getUsers(1);
    } catch (error) {
      console.error("Error delete user:", error);
      getUsers(1);
    }
  };
  const handleShowGetbyideUser = async (id) => {
    try {
      let res = await getbyideUser(id);
      if (res && res.id) {
        setDataUserEdit(res);
        setShowedit(true);
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.error("Error fetching users:", error); // Log any errors
    }
  };
  return (
    <>
      <div className="container-fluid">
      <div>
      <p className="mt-3 text-secondary">Pages/Dashboard/User</p>
      <p className="fs-3 fw-bold">Main User</p>
          </div>
        <div className="row d-flex justify-content-between">
          <div className="col-4">
            <div className="search-product-bar my-2">
              <input
                type="text"
                placeholder="Search.."
                className="px-1 py-1 input_product_search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
              />

              <i className="bi bi-search btn btn-success"></i>
            </div>
          </div>
          <div className="col-4 text-end">
            <button className="btn btn-success" onClick={handleShow}>
              Add new user
            </button>
            <button
              className="btn btn-primary"
              style={{ width: "190px" }} // Đặt chiều rộng cố định
              onClick={() => setShowPasswordColumn(!showPasswordColumn)}
            >
              {showPasswordColumn ? (
                <>
                  <i className="bi bi-eye-slash"></i> Hide Password
                </>
              ) : (
                <>
                  <i className="bi bi-eye"></i> Show Password
                </>
              )}
            </button>
          </div>
        </div>
        <Table className="bg-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Password</th>
              <th>Role</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
  {handleSearch().map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td> {/* Số thứ tự */}
      <td>{user.email}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.address}</td>
      <td>{showPasswordColumn ? user.password : "*".repeat(8)}</td>
      <td>
        <span
          className={`badge ${
            user.avatar === "1" ? "bg-success" : user.avatar === "2" ? "bg-danger" : ""
          }`}
        >
          {user.avatar === "1" ? "Admin" : user.avatar === "2" ? "User" : "Unknown"}
        </span>
      </td>
      <td>
        <Button onClick={() => handleShowGetbyideUser(user.id)} variant="warning">
        <i class="bi bi-sliders"></i>
        </Button>{" "}
        <Button onClick={() => handleDeleteUser(user.id)} variant="danger">
        <i class="bi bi-trash-fill"></i>
        </Button>{" "}
      </td>
    </tr>
  ))}
</tbody>
        </Table>
       
        <ModalAddUser
          show={isShow}
          handleClose={handleClose}
          handleUpdateTable={handleUpdateTable}
        />
        <ModalAddUser
          show={isShow}
          handleClose={handleClose}
          handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUser
          show={isShowedit}
          handleClose={handleClose}
          dataUserEdit={dataUserEdit}
          handleEditUserFrommodal={handleEditUserFrommodal}
        />
      </div>
    </>
  );
};

export default TableUser;
