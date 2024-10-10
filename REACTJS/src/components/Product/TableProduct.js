import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Table from "react-bootstrap/Table";
import {
  getbyidProduct,
  deleteProduct,
  fetchAllProduct,
} from "../../services/ProductService";
import ModalAddProduct from "./ModalAddProduct";
import Button from "react-bootstrap/Button";
import ModalEditProduct from "./ModalEditProduct";
import { useNavigate } from "react-router-dom";
import Nav from "../AdminComponents/Navs";
import _ from "lodash";
import "../../asset/css/table-product.css";
import { format } from "date-fns";
import * as XLSX from "xlsx"; // Import thư viện xlsx
const MAX_DESCRIPTION_LENGTH = 30;

const FormattedDate = ({ createdAt }) => {
  const date = new Date(createdAt);
  return <span>{format(date, "dd MMM yyyy, HH:mm")}</span>;
};

const truncateDescription = (description, maxLength) => {
  return description.length > maxLength
    ? description.substring(0, maxLength) + "..."
    : description;
};

const TableProduct = () => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [listProducts, setListProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShow, setShow] = useState(false);
  const [isShowEdit, setShowedit] = useState(false);
  const [dataProductEdit, setDataProductEdit] = useState({});
  const navigate = useNavigate();

  const checkAuth = () => {
    const session = sessionStorage.getItem("user");
    setIsLoggedIn(!!session);
    setIsCheckingAuth(false);
  };
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = _.orderBy(filteredProducts, [key], [direction]);
    setFilteredProducts(sortedData);
    setSortConfig({ key, direction });
  };
  
  const exportToExcels = () => {
    const dataToExport = filteredProducts.map((product, index) => ({
      ID: index + 1,
      Name: product.nameProduct,
      Description: truncateDescription(
        product.description,
        MAX_DESCRIPTION_LENGTH
      ),
      Quantity: product.quantity,
      Price: "$"+ product.price  ,
      CreatedAt: format(new Date(product.createdAt), "dd MMM yyyy, HH:mm"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    XLSX.writeFile(workbook, "products.xlsx");
  };
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (isLoggedIn) {
        getProducts(1);
      } else {
        navigate("/logins");
      }
    }
  }, [isLoggedIn, isCheckingAuth, navigate]);

  const getProducts = async (page) => {
    try {
      const res = await fetchAllProduct(page);
      if (res && res.length > 0) {
        const sortedProducts = _.sortBy(res, "id");
        setTotalProducts(res.total);
        setListProducts(sortedProducts);
        setFilteredProducts(sortedProducts); // Set filteredProducts to the full list
        setTotalPage(Math.ceil(res.total_page));
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const filtered = listProducts.filter((product) =>
      product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, listProducts]);

  const handlePageClick = (event) => {
    getProducts(event.selected + 1);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      getProducts(1);
    } catch (error) {
      console.error("Error deleting product:", error);
      getProducts(1);
    }
  };
  
  const handleShowGetByIdProduct = async (id) => {
    try {
      const res = await getbyidProduct(id);
      if (res && res.id) {
        setDataProductEdit(res);
        setShowedit(true);
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <>

      <div className="container-fluid">
        <div className=" d-flex justify-content-between">
        <div>
      <p className="mt-3 text-secondary">Pages/Dashboard/Product</p>
      <p className="fs-3 fw-bold">Main Dashboard</p>
          </div>
        </div>
        
        <div className="row d-flex justify-content-between">
          <div className="col-4">
          <div className="search-product-bar my-2">
          <input
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-1 py-1 input_product_search"
          />
          <i className="bi bi-search btn btn-success"></i>
        </div>
          </div>
          <div className="col-3 text-end">
            <Button
              variant="success"
              className=""
              onClick={() => setShow(true)}>
              <i class="bi bi-plus-circle"></i> Add New
            </Button>
            <Button variant="primary" onClick={exportToExcels}>
            <i class="bi bi-file-earmark-excel"></i> Export Excel
            </Button>
          </div>
        </div>
        <div id="collapse1" className="">
          <Table className="bg-white table-responsive">
          <thead>
              <tr>
                <th onClick={() => handleSort("id")}>
                  ID{" "}
                  {sortConfig.key === "id" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("nameProduct")}>
                  Name{" "}
                  {sortConfig.key === "nameProduct" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                </th>
                <th>Image</th>
                <th onClick={() => handleSort("description")}>
                  Description{" "}
                  {sortConfig.key === "description" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("quantity")}>
                  Quantity{" "}
                  {sortConfig.key === "quantity" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("price")}>
                  Price{" "}
                  {sortConfig.key === "price" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("createdAt")}>
                  Create At{" "}
                  {sortConfig.key === "createdAt" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                </th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody className="fs-6">
              {filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.nameProduct}</td>
                  <td>
                    <img
                      style={{ width: 80 }}
                      src={product.img}
                      alt={product.nameProduct}
                    />
                  </td>
                  <td>
                    {truncateDescription(
                      product.description,
                      MAX_DESCRIPTION_LENGTH
                    )}
                  </td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>
                    <FormattedDate createdAt={product.createdAt} />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShowGetByIdProduct(product.id)}>
                      <i class="bi bi-sliders"></i>
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteProduct(product.id)}>
                      <i class="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <ModalAddProduct
          show={isShow}
          handleClose={() => setShow(false)}
          handleUpdateTable={() => getProducts(1)}
        />
        <ModalEditProduct
          show={isShowEdit}
          handleClose={() => setShowedit(false)}
          dataProductEdit={dataProductEdit}
          handleEditProductFromModal={() => getProducts(1)}
        />
      </div>
    </>
  );
};

export default TableProduct;
