import { useParams, useNavigate } from 'react-router-dom';
import './DetailPages.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in real app, fetch based on id
  const order = {
    id: id || 'ORD-001',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+91 98765 43210',
    fuel: 'Petrol',
    quantity: 20,
    amount: 1900,
    status: 'Delivered',
    date: '2025-11-09',
    time: '10:30 AM',
    deliveryAddress: '123 Main Street, Downtown, City - 110001',
    driver: 'Rajesh Kumar',
    driverPhone: '+91 98765 11111',
    vehicle: 'DL 01 AB 1234',
    paymentMethod: 'Card',
    orderNotes: 'Please deliver between 10 AM - 12 PM',
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Order Details</h1>
          <p>Complete information about order {order.id}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="secondary-button" onClick={() => navigate(-1)}>← Back</button>
          <button className="primary-button">Edit Order</button>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <h3>Order Information</h3>
          <div className="detail-row">
            <span className="detail-label">Order ID:</span>
            <span className="detail-value">{order.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date & Time:</span>
            <span className="detail-value">{order.date} at {order.time}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Fuel Type:</span>
            <span className="detail-value">{order.fuel}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Quantity:</span>
            <span className="detail-value">{order.quantity}L</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Amount:</span>
            <span className="detail-value">₹{order.amount.toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Payment Method:</span>
            <span className="detail-value">{order.paymentMethod}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`status-badge ${
              order.status === 'Delivered' ? 'status-delivered' :
              order.status === 'In Transit' ? 'status-transit' :
              order.status === 'Pending' ? 'status-pending' : 'status-cancelled'
            }`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="detail-card">
          <h3>Customer Information</h3>
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{order.customer}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{order.customerEmail}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{order.customerPhone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Delivery Address:</span>
            <span className="detail-value">{order.deliveryAddress}</span>
          </div>
        </div>

        <div className="detail-card">
          <h3>Driver Information</h3>
          <div className="detail-row">
            <span className="detail-label">Driver Name:</span>
            <span className="detail-value">{order.driver}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{order.driverPhone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Vehicle Number:</span>
            <span className="detail-value">{order.vehicle}</span>
          </div>
        </div>

        <div className="detail-card">
          <h3>Additional Notes</h3>
          <p className="notes-text">{order.orderNotes}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
