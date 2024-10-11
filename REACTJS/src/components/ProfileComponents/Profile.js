import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getbyidesUser, putUpdateUser } from '../../services/UserServices';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
    address: '',
    password: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user) {
        throw new Error('User not found in session storage');
      }

      const response = await getbyidesUser(user.id);
      setUserData(response.data ? response.data : response);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch user data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putUpdateUser(userData.id, userData.email, userData.first_name, userData.last_name, userData.avatar, userData.password, userData.address);
      alert('Profile updated successfully');
      navigate('/profile');
    } catch (error) {
      alert('Error updating profile.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <section id="common_banner_cart">
        <div className="container">
          <div className="col-lg-12">
            <div className="common_banner_cart_text">
              <h1 className="text-center text-white">Profile</h1>
              <p className="text-center text_bread">Home / Profile</p>
            </div>
          </div>
        </div>
      </section>
    <div className="container mt-5 mb-5">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Email:</label>
          <input type="email" name="email" className="form-control" value={userData.email || ''} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">First Name:</label>
          <input type="text" name="first_name" className="form-control" value={userData.first_name || ''} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last Name:</label>
          <input type="text" name="last_name" className="form-control" value={userData.last_name || ''} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Address:</label>
          <input type="text" name="address" className="form-control" value={userData.address || ''} onChange={handleChange} />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Profile;
