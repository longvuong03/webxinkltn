import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateProduct } from '../../services/ProductService'; // Import the product service
import { toast } from 'react-toastify';

const ModalEditProduct = (props) => {
    const { show, handleClose, dataProductEdit, handleEditProductFromModal } = props;
    const [nameProduct, setNameProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [imgFile, setImgFile] = useState(null); // Đổi từ chuỗi thành null
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('id', dataProductEdit.id);
        formData.append('nameProduct', nameProduct);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        
        // Chỉ thêm imgFile nếu có tập tin mới
        if (imgFile) {
            formData.append('imgFile', imgFile);
        }

        try {
            await updateProduct(formData);
            handleEditProductFromModal(); // Cập nhật bảng từ component cha
            handleClose(); // Đóng modal
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    useEffect(() => {
        if (show && dataProductEdit) {
            setNameProduct(dataProductEdit.nameProduct);
            setQuantity(dataProductEdit.quantity);
            setPrice(dataProductEdit.price);
            setDescription(dataProductEdit.description);
            // Không cần thiết lập imgFile nếu không cập nhật ảnh
            // Set imgFile to null when the modal is opened
            setImgFile(null);
        }
    }, [show, dataProductEdit]);

    const handleFileChange = (event) => {
        setImgFile(event.target.files[0]);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form>
                            <div className="form-group">
                                <label className="form-label">Image</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    onChange={handleFileChange} 
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
                                    placeholder="Product description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} 
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
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalEditProduct;
