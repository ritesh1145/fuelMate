import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditPages.css';

const DriverNew = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    vehicleType: '',
    license: '',
    address: '',
    status: 'Pending Approval',
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
    // In real app, send API request to create driver
    const newDriverId = Math.floor(Math.random() * 1000);
    console.log('Created new driver:', { id: newDriverId, ...formData });
    alert('Driver registration submitted! Awaiting approval.');
    navigate('/drivers');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Add New Driver</h1>
          <p>Register a new delivery driver</p>
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
                placeholder="Enter driver's full name"
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
                placeholder="driver@example.com"
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
                placeholder="+91 98765 11111"
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

            <div className="form-group">
              <label htmlFor="license">License Number *</label>
              <input 
                type="text" 
                id="license" 
                name="license" 
                value={formData.license} 
                onChange={handleChange}
                placeholder="DL1234567890"
                required 
              />
            </div>
          </div>

          <div className="form-card">
            <h3>Vehicle Information</h3>
            
            <div className="form-group">
              <label htmlFor="vehicle">Vehicle Number *</label>
              <input 
                type="text" 
                id="vehicle" 
                name="vehicle" 
                value={formData.vehicle} 
                onChange={handleChange}
                placeholder="DL 01 AB 1234"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="vehicleType">Vehicle Type *</label>
              <select 
                id="vehicleType" 
                name="vehicleType" 
                value={formData.vehicleType} 
                onChange={handleChange}
                required>
                <option value="">Select vehicle type</option>
                <option value="Fuel Tanker - 1000L">Fuel Tanker - 1000L</option>
                <option value="Fuel Tanker - 2000L">Fuel Tanker - 2000L</option>
                <option value="Fuel Tanker - 3000L">Fuel Tanker - 3000L</option>
                <option value="Fuel Tanker - 5000L">Fuel Tanker - 5000L</option>
                <option value="Electric Delivery Van">Electric Delivery Van</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select 
                id="status" 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                required>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Active">Active</option>
                <option value="Offline">Offline</option>
                <option value="On Break">On Break</option>
                <option value="Suspended">Suspended</option>
              </select>
              <small style={{ color: '#6b7280', fontSize: '12px' }}>
                New drivers are set to "Pending Approval" by default
              </small>
            </div>
          </div>

          <div className="form-card">
            <h3>Additional Information</h3>
            
            <div style={{ 
              background: '#fef3c7', 
              border: '1px solid #fbbf24', 
              borderRadius: '8px', 
              padding: '16px',
              marginBottom: '16px'
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
                <strong>⚠️ Admin Approval Required</strong><br />
                New driver registrations require admin approval before they can start accepting deliveries.
              </p>
            </div>

            <div style={{ 
              background: '#dbeafe', 
              border: '1px solid #60a5fa', 
              borderRadius: '8px', 
              padding: '16px'
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#1e40af' }}>
                <strong>📋 Required Documents:</strong><br />
                • Valid Driving License<br />
                • Vehicle Registration Certificate<br />
                • Vehicle Insurance<br />
                • Background Verification
              </p>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Register Driver
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverNew;
