import axios from "./customize-axios";
const fetchAllUser = (page) => {
    return axios.get(`api/user?page=${page}`);
}
const deleteUser = (id) => {
    return axios.delete(`api/user/${id}`);
}
const postCreateUser = (email, first_name, last_name, password, avatar,address) => {
    console.log(email, first_name, last_name, password, avatar);
    return axios.post("/api/user", { email: email, first_name: first_name, last_name: last_name, password: password, avatar: avatar,address:address });
}
const getbyideUser = (id) => {
    return axios.get(`/api/user/getbyiduser/${id}`);
}
const putUpdateUser = (id, email, first_name, last_name, avatar, password,address) => {
    return axios.post(`/api/user/edituser`, { id: id, email: email, first_name: first_name, last_name: last_name, avatar: avatar, password: password ,address:address});
}
const logins = (email, password) => {
    return axios.post('/api/user/login', { email, password });
}
const registerUser = (email, first_name, last_name, password) => {
    return axios.post('/api/user/register', { email, first_name, last_name, password });
}
 const getbyidesUser = async (id) => {
    const response = await axios.get(`/api/user/getbyiduser/${id}`);
    return response; // Trả về chỉ data
  };
export { fetchAllUser, postCreateUser, deleteUser, getbyideUser, putUpdateUser, logins,registerUser,getbyidesUser  };