import axios from "./customize-axios";


const addCart = async (UserId, ProductId,quantity) => {
    try {
        const response = await axios.get(`api/Cart/addccart`, {
            params: {

                UserId,
                ProductId,
                quantity
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};
const deleteQuantitycart = async (UserId, ProductId) => {
    try {
        const response = await axios.get(`api/Cart/deleteQuantityCart`, {
            params: {

                UserId,
                ProductId,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
}
const addQuantitycart = async (UserId, ProductId) => {
    try {
        const response = await axios.get(`api/Cart/addQuantitycart`, {
            params: {

                UserId,
                ProductId,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
}


export { addCart,addQuantitycart,deleteQuantitycart };
