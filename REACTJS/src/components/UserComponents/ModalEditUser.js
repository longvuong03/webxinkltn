import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../../services/UserServices';
import { toast } from 'react-toastify';
import { set } from 'lodash';
import { Toast, ToastContainer } from "react-bootstrap"; // Nhập khẩu ToastContainer

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFrommodal } = props;
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [password, setpassword] = useState('');
    const [address, setaddress] = useState('');
    const [toasts, setToasts] = useState([]);
    const addToast = (message) => {
        const id = Date.now(); // Generate a unique ID for each toast
        setToasts([...toasts, { id, message }]);
      };

    const handleUpdateUser = async () => {
        try {
            console.log("Updating user:", dataUserEdit.id, email, first_name, last_name, avatar);
            let res = await putUpdateUser(dataUserEdit.id, email, first_name, last_name, avatar, password,address);
            console.log("Update user response:", res);
            if (res) {
                console.log("User update successful. Data:", res);
                handleEditUserFrommodal({
                    id: dataUserEdit.id,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    avatar: avatar,
                    password: password,
                    address:address
                });
                handleClose();
            addToast("Update success");

            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user");
        }
    };
    useEffect(() => {
        if (show && dataUserEdit) {
            setEmail(dataUserEdit.email);
            setFirstName(dataUserEdit.first_name);
            setLastName(dataUserEdit.last_name);
            setAvatar(dataUserEdit.avatar);
            setaddress(dataUserEdit.address);
            setpassword(dataUserEdit.password);
        }
    }, [show, dataUserEdit]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input type="text" className="form-control" placeholder="First Name"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input type="text" className="form-control" placeholder="Last Name"
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Role</label>
                                <input type="text" className="form-control" placeholder="Role"
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-control" placeholder="Address"
                                    value={address}
                                    onChange={(e) => setaddress(e.target.value)} />
                            </div>
                            <div class="form-group">
                                    <label className="form-label">Password</label>
                                    <input type="text" class="form-control" placeholder="Password"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)} />
                                </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateUser}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1050,
        }}
        className="p-3"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            delay={1000}
            autohide
            onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
            className="mb-2"
            style={{ maxWidth: "300px" }}
          >
            <Toast.Header>
              <strong className="me-auto text-success fw-bold fs-5">
                Success
                <i className="bi bi-check2-circle text-success"></i>
              </strong>
            </Toast.Header>
            <Toast.Body className="bg-white">
              <h6>{toast.message}</h6>
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
        </>
    );
};

export default ModalEditUser;