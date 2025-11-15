import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditPages.css';

const SupplierNew = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    phone: '',
    email: '',
    fuel: 'All Types',
    stock: '',
    capacity: '',
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
    const newSupplierId = Math.floor(Math.random() * 1000);
    console.log('Created new supplier:', { id: newSupplierId, ...formData });
    alert('Supplier registered successfully!');
    navigate('/suppliers');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Add New Supplier</h1>
          <p>Register a new fuel station or supplier</p>
        </div>
        <button className="secondary-button" onClick={() => navigate(-1)}>← Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-grid">
          <div className="form-card">
            <h3>Supplier Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Supplier Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="e.g., FuelMate Station D"
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
                placeholder="station@fuelmate.com"
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
                placeholder="+91 98765 55555"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
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
              <label htmlFor="address">Full Address *</label>
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
            <h3>Business Details</h3>
            
            <div className="form-group">
              <label htmlFor="fuel">Fuel Types Supplied *</label>
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
              <label htmlFor="capacity">Storage Capacity (Liters) *</label>
              <input 
                type="number" 
                id="capacity" 
                name="capacity" 
                value={formData.capacity} 
                onChange={handleChange}
                min="0"
                placeholder="e.g., 10000"
                required 
              />
              <small style={{ color: '#6b7280', fontSize: '12px' }}>
                Maximum storage capacity of the station
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="stock">Current Stock (Liters) *</label>
              <input 
                type="number" 
                id="stock" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange}
                min="0"
                placeholder="e.g., 5000"
                required 
              />
              <small style={{ color: '#6b7280', fontSize: '12px' }}>
                Current available fuel stock
              </small>
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
            Register Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierNew;
