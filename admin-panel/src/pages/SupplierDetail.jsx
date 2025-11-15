import { useParams, useNavigate } from 'react-router-dom';
import './DetailPages.css';

const SupplierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const supplier = {
    id: id || 1,
    name: 'FuelMate Station A',
    location: 'Downtown, City - 110001',
    address: '789 Station Road, Downtown, City - 110001',
    phone: '+91 98765 55555',
    email: 'stationa@fuelmate.com',
    fuel: 'All Types',
    stock: 5000,
    status: 'Active',
    registrationDate: '2023-01-15',
    totalSupplied: 250000,
    revenue: 23750000,
  };

  const stockDetails = [
    { fuelType: 'Petrol', available: 2000, capacity: 3000, percentage: 67 },
    { fuelType: 'Diesel', available: 1500, capacity: 2500, percentage: 60 },
    { fuelType: 'CNG', available: 1000, capacity: 1500, percentage: 67 },
    { fuelType: 'Electric', available: 500, capacity: 1000, percentage: 50 },
  ];

  const recentSupplies = [
    { id: 'SUP-001', date: '2025-11-09', fuelType: 'Petrol', quantity: 500, amount: 47500 },
    { id: 'SUP-002', date: '2025-11-08', fuelType: 'Diesel', quantity: 600, amount: 53400 },
    { id: 'SUP-003', date: '2025-11-07', fuelType: 'CNG', quantity: 300, amount: 22500 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Supplier Details</h1>
          <p>Complete information about {supplier.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="secondary-button" onClick={() => navigate(-1)}>← Back</button>
          <button className="primary-button">Edit Supplier</button>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <h3>Supplier Information</h3>
          <div className="detail-row">
            <span className="detail-label">Supplier ID:</span>
            <span className="detail-value">#{supplier.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{supplier.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{supplier.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{supplier.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{supplier.location}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Full Address:</span>
            <span className="detail-value">{supplier.address}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className="status-badge status-delivered">{supplier.status}</span>
          </div>
        </div>

        <div className="detail-card">
          <h3>Business Statistics</h3>
          <div className="detail-row">
            <span className="detail-label">Registration Date:</span>
            <span className="detail-value">{supplier.registrationDate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Fuel Types:</span>
            <span className="detail-value">{supplier.fuel}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Current Stock:</span>
            <span className="detail-value">{supplier.stock.toLocaleString()}L</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Total Supplied:</span>
            <span className="detail-value">{supplier.totalSupplied.toLocaleString()}L</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Total Revenue:</span>
            <span className="detail-value">₹{supplier.revenue.toLocaleString()}</span>
          </div>
        </div>

        <div className="detail-card full-width">
          <h3>Stock Details</h3>
          <div className="stock-grid">
            {stockDetails.map((stock) => (
              <div key={stock.fuelType} className="stock-item">
                <div className="stock-header">
                  <span className="stock-fuel">{stock.fuelType}</span>
                  <span className="stock-percentage">{stock.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${stock.percentage}%` }}
                  ></div>
                </div>
                <div className="stock-info">
                  <span>{stock.available}L / {stock.capacity}L</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-card full-width">
          <h3>Recent Supplies</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Supply ID</th>
                  <th>Date</th>
                  <th>Fuel Type</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentSupplies.map((supply) => (
                  <tr key={supply.id}>
                    <td><strong>{supply.id}</strong></td>
                    <td>{supply.date}</td>
                    <td>{supply.fuelType}</td>
                    <td>{supply.quantity}L</td>
                    <td>₹{supply.amount.toLocaleString()}</td>
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

export default SupplierDetail;
