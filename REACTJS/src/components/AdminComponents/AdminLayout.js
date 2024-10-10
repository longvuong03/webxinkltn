import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
