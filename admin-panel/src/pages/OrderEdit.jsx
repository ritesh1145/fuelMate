import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPages.css';

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in real app, fetch based on id
  const [formData, setFormData] = useState({
    id: id || 'ORD-001',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+91 98765 43210',
    fuel: 'Petrol',
    quantity: 20,
    amount: 1900,
    status: 'Delivered',
    deliveryAddress: '123 Main Street, Downtown, City - 110001',
    driver: 'Rajesh Kumar',
    paymentMethod: 'Card',
    orderNotes: 'Please deliver between 10 AM - 12 PM',
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
    // In real app, send API request to update order
    console.log('Updated order:', formData);
    alert('Order updated successfully!');
    navigate(`/orders/${id}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Edit Order</h1>
          <p>Update order information for {formData.id}</p>
        </div>
        <button className="secondary-button" onClick={() => navigate(-1)}>← Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-grid">
          <div className="form-card">
            <h3>Order Information</h3>
            
            <div className="form-group">
              <label htmlFor="fuel">Fuel Type</label>
              <select 
                id="fuel" 
                name="fuel" 
                value={formData.fuel} 
                onChange={handleChange}
                required>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity (Liters)</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                value={formData.quantity} 
                onChange={handleChange}
                min="1"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount (₹)</label>
              <input 
                type="number" 
                id="amount" 
                name="amount" 
                value={formData.amount} 
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
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select 
                id="paymentMethod" 
                name="paymentMethod" 
                value={formData.paymentMethod} 
                onChange={handleChange}
                required>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Wallet">Wallet</option>
              </select>
            </div>
          </div>

          <div className="form-card">
            <h3>Customer Information</h3>
            
            <div className="form-group">
              <label htmlFor="customer">Customer Name</label>
              <input 
                type="text" 
                id="customer" 
                name="customer" 
                value={formData.customer} 
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">Email</label>
              <input 
                type="email" 
                id="customerEmail" 
                name="customerEmail" 
                value={formData.customerEmail} 
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerPhone">Phone</label>
              <input 
                type="tel" 
                id="customerPhone" 
                name="customerPhone" 
                value={formData.customerPhone} 
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="deliveryAddress">Delivery Address</label>
              <textarea 
                id="deliveryAddress" 
                name="deliveryAddress" 
                value={formData.deliveryAddress} 
                onChange={handleChange}
                rows="3"
                required 
              />
            </div>
          </div>

          <div className="form-card">
            <h3>Driver & Notes</h3>
            
            <div className="form-group">
              <label htmlFor="driver">Assigned Driver</label>
              <input 
                type="text" 
                id="driver" 
                name="driver" 
                value={formData.driver} 
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="orderNotes">Order Notes</label>
              <textarea 
                id="orderNotes" 
                name="orderNotes" 
                value={formData.orderNotes} 
                onChange={handleChange}
                rows="4"
                placeholder="Add any special instructions..."
              />
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

export default OrderEdit;
