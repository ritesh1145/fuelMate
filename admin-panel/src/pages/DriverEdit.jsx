import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPages.css';

const DriverEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id: id || 1,
    name: 'Rajesh Kumar',
    phone: '+91 98765 11111',
    email: 'rajesh@fuelmate.com',
    vehicle: 'DL 01 AB 1234',
    vehicleType: 'Fuel Tanker - 2000L',
    license: 'DL1234567890',
    address: '456 Driver Colony, City - 110002',
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
    console.log('Updated driver:', formData);
    alert('Driver updated successfully!');
    navigate(`/drivers/${id}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Edit Driver</h1>
          <p>Update driver information</p>
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
              <label htmlFor="license">License Number</label>
              <input 
                type="text" 
                id="license" 
                name="license" 
                value={formData.license} 
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-card">
            <h3>Vehicle Information</h3>
            
            <div className="form-group">
              <label htmlFor="vehicle">Vehicle Number</label>
              <input 
                type="text" 
                id="vehicle" 
                name="vehicle" 
                value={formData.vehicle} 
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="vehicleType">Vehicle Type</label>
              <input 
                type="text" 
                id="vehicleType" 
                name="vehicleType" 
                value={formData.vehicleType} 
                onChange={handleChange}
                placeholder="e.g., Fuel Tanker - 2000L"
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
                <option value="Offline">Offline</option>
                <option value="On Break">On Break</option>
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

export default DriverEdit;
