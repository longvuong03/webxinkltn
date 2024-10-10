import axios from "./customize-axios";
const fetchAllProduct = (page) => {
    return axios.get(`api/Product?page=${page}`);
}
const getbyidProduct = (id) => {
    return axios.get(`api/Product/getbyidProduct/${id}`);
}
const addProducts = async (formData) => {
    console.log('User data to be sent:', formData);
    try {
        const response = await axios.post('/api/Product/addProducts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};
const postCreateProduct = (img, nameProduct,quantity, price) => {
    console.log(img, nameProduct, price,quantity);
    return axios.post("/api/product", { img : img, nameProduct :nameProduct,quantity : quantity, price : price });
};
const updateProduct = async (formData) => {
    try {
        const response = await axios.put('/api/product/updateProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update product');
    }
};
const putUpdateProduct = (id, img, nameProduct,quantity, price) => {
    return axios.post(`/api/product/editproduct`, {id:id, img : img, nameProduct :nameProduct,quantity : quantity, price : price });
};

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`/api/product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export { fetchAllProduct,getbyidProduct,postCreateProduct,putUpdateProduct,deleteProduct,addProducts,updateProduct };