import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditPages.css';

const OrderNew = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customer: '',
    customerEmail: '',
    customerPhone: '',
    fuel: 'Petrol',
    quantity: '',
    amount: '',
    status: 'Pending',
    deliveryAddress: '',
    driver: '',
    paymentMethod: 'Card',
    orderNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate amount based on quantity and fuel type
    if (name === 'quantity' || name === 'fuel') {
      const qty = name === 'quantity' ? parseInt(value) || 0 : parseInt(formData.quantity) || 0;
      const fuelType = name === 'fuel' ? value : formData.fuel;
      
      const pricePerLiter = {
        'Petrol': 95,
        'Diesel': 89,
        'CNG': 75,
        'Electric': 120
      };
      
      const calculatedAmount = qty * (pricePerLiter[fuelType] || 0);
      
      if (name === 'quantity') {
        setFormData(prev => ({
          ...prev,
          quantity: value,
          amount: calculatedAmount
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          fuel: value,
          amount: calculatedAmount
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, send API request to create order
    const newOrderId = 'ORD-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    console.log('Created new order:', { id: newOrderId, ...formData });
    alert(`Order ${newOrderId} created successfully!`);
    navigate('/orders');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Create New Order</h1>
          <p>Add a new fuel delivery order</p>
        </div>
        <button className="secondary-button" onClick={() => navigate(-1)}>← Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-grid">
          <div className="form-card">
            <h3>Order Information</h3>
            
            <div className="form-group">
              <label htmlFor="fuel">Fuel Type *</label>
              <select 
                id="fuel" 
                name="fuel" 
                value={formData.fuel} 
                onChange={handleChange}
                required>
                <option value="Petrol">Petrol (₹95/L)</option>
                <option value="Diesel">Diesel (₹89/L)</option>
                <option value="CNG">CNG (₹75/L)</option>
                <option value="Electric">Electric (₹120/L)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity (Liters) *</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                value={formData.quantity} 
                onChange={handleChange}
                min="1"
                placeholder="Enter quantity in liters"
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
                readOnly
                placeholder="Auto-calculated"
                style={{ background: '#f9fafb' }}
              />
              <small style={{ color: '#6b7280', fontSize: '12px' }}>
                Amount is automatically calculated based on fuel type and quantity
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select 
                id="status" 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                required>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method *</label>
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
              <label htmlFor="customer">Customer Name *</label>
              <input 
                type="text" 
                id="customer" 
                name="customer" 
                value={formData.customer} 
                onChange={handleChange}
                placeholder="Enter customer name"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">Email *</label>
              <input 
                type="email" 
                id="customerEmail" 
                name="customerEmail" 
                value={formData.customerEmail} 
                onChange={handleChange}
                placeholder="customer@example.com"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerPhone">Phone *</label>
              <input 
                type="tel" 
                id="customerPhone" 
                name="customerPhone" 
                value={formData.customerPhone} 
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="deliveryAddress">Delivery Address *</label>
              <textarea 
                id="deliveryAddress" 
                name="deliveryAddress" 
                value={formData.deliveryAddress} 
                onChange={handleChange}
                rows="3"
                placeholder="Enter complete delivery address"
                required 
              />
            </div>
          </div>

          <div className="form-card">
            <h3>Driver & Notes</h3>
            
            <div className="form-group">
              <label htmlFor="driver">Assign Driver</label>
              <input 
                type="text" 
                id="driver" 
                name="driver" 
                value={formData.driver} 
                onChange={handleChange}
                placeholder="Driver name (optional)"
              />
              <small style={{ color: '#6b7280', fontSize: '12px' }}>
                Leave empty to assign driver later
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="orderNotes">Order Notes</label>
              <textarea 
                id="orderNotes" 
                name="orderNotes" 
                value={formData.orderNotes} 
                onChange={handleChange}
                rows="4"
                placeholder="Add any special instructions or notes..."
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderNew;
