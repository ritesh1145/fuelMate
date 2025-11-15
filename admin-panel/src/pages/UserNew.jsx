import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditPages.css';

const UserNew = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
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
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    const newUserId = Math.floor(Math.random() * 1000);
    console.log('Created new user:', { id: newUserId, ...formData });
    alert('User created successfully!');
    navigate('/users');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Add New User</h1>
          <p>Register a new customer</p>
        </div>
        <button className="secondary-button" onClick={() => navigate(-1)}>← Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-grid">
          <div className="form-card">
            <h3>Personal Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Enter full name"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="user@example.com"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                rows="3"
                placeholder="Enter complete address"
                required 
              />
            </div>
          </div>

          <div className="form-card">
            <h3>Account Settings</h3>
            
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange}
                placeholder="Enter password"
                minLength="6"
                required 
              />
              <small style={{ color: '#6b7280', fontSize: '12px' }}>
                Minimum 6 characters
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange}
                placeholder="Re-enter password"
                minLength="6"
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
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserNew;
