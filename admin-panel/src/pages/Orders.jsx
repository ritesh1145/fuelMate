import { useNavigate } from 'react-router-dom';
import './CommonPages.css';

const Orders = () => {
  const navigate = useNavigate();
  const orders = [
    { id: 'ORD-001', customer: 'John Doe', fuel: 'Petrol', quantity: 20, amount: 1900, status: 'Delivered', date: '2025-11-09' },
    { id: 'ORD-002', customer: 'Jane Smith', fuel: 'Diesel', quantity: 30, amount: 2670, status: 'In Transit', date: '2025-11-09' },
    { id: 'ORD-003', customer: 'Mike Johnson', fuel: 'CNG', quantity: 15, amount: 1125, status: 'Pending', date: '2025-11-08' },
    { id: 'ORD-004', customer: 'Sarah Williams', fuel: 'Electric', quantity: 25, amount: 3000, status: 'Delivered', date: '2025-11-08' },
    { id: 'ORD-005', customer: 'Tom Brown', fuel: 'Petrol', quantity: 40, amount: 3800, status: 'In Transit', date: '2025-11-07' },
    { id: 'ORD-006', customer: 'Emma Davis', fuel: 'Diesel', quantity: 35, amount: 3115, status: 'Delivered', date: '2025-11-07' },
    { id: 'ORD-007', customer: 'Alex Wilson', fuel: 'CNG', quantity: 20, amount: 1500, status: 'Cancelled', date: '2025-11-06' },
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Delivered': 'status-delivered',
      'In Transit': 'status-transit',
      'Pending': 'status-pending',
      'Cancelled': 'status-cancelled',
    };
    return <span className={`status-badge ${statusClasses[status]}`}>{status}</span>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Orders Management</h1>
          <p>View and manage all fuel delivery orders</p>
        </div>
        <button className="primary-button" onClick={() => navigate('/orders/new')}>+ New Order</button>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3>All Orders</h3>
          <input type="search" placeholder="Search orders..." className="search-input" />
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Fuel Type</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.fuel}</td>
                  <td>{order.quantity}L</td>
                  <td>₹{order.amount.toLocaleString()}</td>
                  <td>{order.date}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <button className="action-btn" onClick={() => navigate(`/orders/${order.id}`)}>View</button>
                    <button className="action-btn" onClick={() => navigate(`/orders/${order.id}/edit`)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
