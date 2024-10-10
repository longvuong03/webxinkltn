import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateProduct ,addProducts} from '../../services/ProductService'; // Import the product service
import { toast } from 'react-toastify';

const ModalAddProduct = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [imgFile, setImgFile] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Tạo FormData để gửi dữ liệu
        const formData = new FormData();
        formData.append('nameProduct', nameProduct);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('imgFile', imgFile);  // File ảnh đại diện
    
        try {
          const response = await addProducts(formData);
          alert('Product added successfully');
          console.log('Response from server:', response);
          handleClose();
          handleUpdateTable(); // Cập nhật bảng từ component cha
        } catch (error) {
          console.error('Failed to add product:', error);
        }
      };
      const handleFileChange = (event) => {
        setImgFile(event.target.files[0]);

    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form>
                           
                            <div className="form-group">
                                <label className="form-label">Image URL</label>
                                <input
                                        type="file"
                                        id="imgFile"
                                        className="form-control"
                                        onChange={handleFileChange}
                                        required
                                    />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Quantity</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Product Name"
                                    value={nameProduct}
                                    onChange={(e) => setNameProduct(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Product Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Price</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)} 
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddProduct;
