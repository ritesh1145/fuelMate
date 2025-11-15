import { useParams, useNavigate } from 'react-router-dom';
import './DetailPages.css';

const DriverDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const driver = {
    id: id || 1,
    name: 'Rajesh Kumar',
    phone: '+91 98765 11111',
    email: 'rajesh@fuelmate.com',
    vehicle: 'DL 01 AB 1234',
    vehicleType: 'Fuel Tanker - 2000L',
    license: 'DL1234567890',
    deliveries: 156,
    rating: 4.8,
    status: 'Active',
    joinDate: '2023-05-10',
    address: '456 Driver Colony, City - 110002',
    totalEarnings: 234000,
  };

  const recentDeliveries = [
    { id: 'ORD-001', date: '2025-11-09', customer: 'John Doe', amount: 1900, status: 'Delivered' },
    { id: 'ORD-045', date: '2025-11-09', customer: 'Jane Smith', amount: 2670, status: 'Delivered' },
    { id: 'ORD-089', date: '2025-11-08', customer: 'Mike Johnson', amount: 1125, status: 'Delivered' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Driver Details</h1>
          <p>Complete information about {driver.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="secondary-button" onClick={() => navigate(-1)}>← Back</button>
          <button className="primary-button">Edit Driver</button>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <h3>Personal Information</h3>
          <div className="detail-row">
            <span className="detail-label">Driver ID:</span>
            <span className="detail-value">#{driver.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{driver.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{driver.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{driver.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Address:</span>
            <span className="detail-value">{driver.address}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">License Number:</span>
            <span className="detail-value">{driver.license}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`status-badge status-${driver.status === 'Active' ? 'delivered' : 'pending'}`}>
              {driver.status}
            </span>
          </div>
        </div>

        <div className="detail-card">
          <h3>Vehicle Information</h3>
          <div className="detail-row">
            <span className="detail-label">Vehicle Number:</span>
            <span className="detail-value">{driver.vehicle}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Vehicle Type:</span>
            <span className="detail-value">{driver.vehicleType}</span>
          </div>
        </div>

        <div className="detail-card">
          <h3>Performance Statistics</h3>
          <div className="detail-row">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">{driver.joinDate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Total Deliveries:</span>
            <span className="detail-value">{driver.deliveries}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Rating:</span>
            <span className="detail-value">⭐ {driver.rating} / 5.0</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Total Earnings:</span>
            <span className="detail-value">₹{driver.totalEarnings.toLocaleString()}</span>
          </div>
        </div>

        <div className="detail-card full-width">
          <h3>Recent Deliveries</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDeliveries.map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.date}</td>
                    <td>{order.customer}</td>
                    <td>₹{order.amount.toLocaleString()}</td>
                    <td>
                      <span className="status-badge status-delivered">{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetail;
