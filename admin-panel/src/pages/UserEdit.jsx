import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPages.css';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id: id || 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Downtown, City - 110001',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated user:', formData);
    alert('User updated successfully!');
    navigate(`/users/${id}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Edit User</h1>
          <p>Update user information</p>
        </div>
        <button className="secondary-button" onClick={() => navigate(-1)}>← Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-grid">
          <div className="form-card">
            <h3>Personal Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                rows="3"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Account Status</label>
              <select 
                id="status" 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
