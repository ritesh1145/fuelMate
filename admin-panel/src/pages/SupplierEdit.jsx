import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPages.css';

const SupplierEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id: id || 1,
    name: 'FuelMate Station A',
    location: 'Downtown, City - 110001',
    address: '789 Station Road, Downtown, City - 110001',
    phone: '+91 98765 55555',
    email: 'stationa@fuelmate.com',
    fuel: 'All Types',
    stock: 5000,
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
    console.log('Updated supplier:', formData);
    alert('Supplier updated successfully!');
    navigate(`/suppliers/${id}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Edit Supplier</h1>
          <p>Update supplier information</p>
        </div>
        <button className="secondary-button" onClick={() => navigate(-1)}>← Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-grid">
          <div className="form-card">
            <h3>Supplier Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Supplier Name</label>
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
              <label htmlFor="location">Location</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                placeholder="e.g., Downtown, City"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Full Address</label>
              <textarea 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                rows="3"
                required 
              />
            </div>
          </div>

          <div className="form-card">
            <h3>Business Details</h3>
            
            <div className="form-group">
              <label htmlFor="fuel">Fuel Types Supplied</label>
              <select 
                id="fuel" 
                name="fuel" 
                value={formData.fuel} 
                onChange={handleChange}
                required>
                <option value="All Types">All Types</option>
                <option value="Petrol, Diesel">Petrol, Diesel</option>
                <option value="Petrol">Petrol Only</option>
                <option value="Diesel">Diesel Only</option>
                <option value="CNG">CNG Only</option>
                <option value="Electric">Electric Only</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="stock">Current Stock (Liters)</label>
              <input 
                type="number" 
                id="stock" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange}
                min="0"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select 
                id="status" 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
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

export default SupplierEdit;
