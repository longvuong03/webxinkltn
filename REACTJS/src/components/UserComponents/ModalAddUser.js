import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../../services/UserServices';
import { toast } from 'react-toastify';
import MD5 from 'crypto-js/md5'; // Import MD5 từ crypto-js
import { Toast, ToastContainer } from "react-bootstrap"; // Nhập khẩu ToastContainer
const ModalAddUser = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [email, setEmail] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [avatar, setavatar] = useState('');
    const [password, setpassword] = useState('');
    const [address, setaddress] = useState('');
    const [toasts, setToasts] = useState([]);

    const addToast = (message) => {
        const id = Date.now(); // Generate a unique ID for each toast
        setToasts([...toasts, { id, message }]);
    };

    const handleSave = async () => {
        // Mã hóa mật khẩu bằng MD5
        const hashedPassword = MD5(password).toString(); // Chuyển đổi MD5 thành chuỗi
        console.log(email, first_name, last_name, hashedPassword, avatar);

        let res = await postCreateUser(email, first_name, last_name, hashedPassword, avatar);
        console.log(res);
        if (res && res.id) {
            handleClose();
            setEmail("");
            setfirst_name("");
            setlast_name("");
            setavatar("");
            setpassword("");
            setaddress("");
            addToast("Add success");
            handleUpdateTable({
                id: res.id,
                email: res.email,
                first_name: res.first_name,
                last_name: res.last_name,
                avatar: res.avatar,
                address: res.address,
                password: hashedPassword // Lưu mật khẩu đã mã hóa nếu cần
            });
        } else {
            toast.error("Create user failed");
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div>
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
                                        onChange={(e) => setfirst_name(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" placeholder="Last Name"
                                        value={last_name}
                                        onChange={(e) => setlast_name(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Role</label>
                                    <input type="text" className="form-control" placeholder="Role"
                                        value={avatar}
                                        onChange={(e) => setavatar(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" placeholder="Address"
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" placeholder="Password"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)} />
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
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
    )
}

export default ModalAddUser;
