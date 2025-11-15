import { useParams, useNavigate } from 'react-router-dom';
import './DetailPages.css';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const user = {
    id: id || 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Downtown, City - 110001',
    joinDate: '2024-01-15',
    totalOrders: 15,
    totalSpent: 28500,
    status: 'Active',
    lastOrder: '2025-11-09',
  };

  const recentOrders = [
    { id: 'ORD-001', date: '2025-11-09', fuel: 'Petrol', amount: 1900, status: 'Delivered' },
    { id: 'ORD-015', date: '2025-11-05', fuel: 'Diesel', amount: 2670, status: 'Delivered' },
    { id: 'ORD-028', date: '2025-11-01', fuel: 'CNG', amount: 1125, status: 'Delivered' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>User Details</h1>
          <p>Complete information about {user.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="secondary-button" onClick={() => navigate(-1)}>← Back</button>
          <button className="primary-button">Edit User</button>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <h3>Personal Information</h3>
          <div className="detail-row">
            <span className="detail-label">User ID:</span>
            <span className="detail-value">#{user.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{user.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Address:</span>
            <span className="detail-value">{user.address}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`status-badge status-${user.status === 'Active' ? 'delivered' : 'pending'}`}>
              {user.status}
            </span>
          </div>
        </div>

        <div className="detail-card">
          <h3>Account Statistics</h3>
          <div className="detail-row">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">{user.joinDate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Total Orders:</span>
            <span className="detail-value">{user.totalOrders}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Total Spent:</span>
            <span className="detail-value">₹{user.totalSpent.toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Last Order:</span>
            <span className="detail-value">{user.lastOrder}</span>
          </div>
        </div>

        <div className="detail-card full-width">
          <h3>Recent Orders</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Fuel Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.date}</td>
                    <td>{order.fuel}</td>
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

export default UserDetail;
