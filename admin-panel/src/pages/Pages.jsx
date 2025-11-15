import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import './CommonPages.css';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users from API...');
      const response = await api.get('/admin/users');
      console.log('API Response:', response.data);
      // Filter only customer users (not admins or drivers)
      const customerUsers = response.data.filter(user => user.role === 'customer');
      console.log('Customer users:', customerUsers);
      setUsers(customerUsers);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      console.error('Error details:', err.response?.data);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load users';
      setError(`${errorMsg}. Please logout and login again. Using sample data for now.`);
      // Fallback to mock data if API fails
      setUsers([
        { _id: '1', name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', createdAt: '2024-01-15', role: 'customer' },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+91 98765 43211', createdAt: '2024-02-20', role: 'customer' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: '#6b7280' }}>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Users Management</h1>
          <p>Manage all registered users ({users.length} total)</p>
        </div>
        <button className="primary-button" onClick={() => navigate('/users/new')}>+ Add User</button>
      </div>

      {error && (
        <div style={{
          background: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          color: '#92400e',
          fontSize: '14px'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div className="content-card">
        <div className="card-header">
          <h3>All Users</h3>
          <input 
            type="search" 
            placeholder="Search users..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                    {searchTerm ? 'No users found matching your search.' : 'No users registered yet.'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id || user.id}>
                    <td><strong>#{user._id?.slice(-6) || user.id}</strong></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="action-btn" onClick={() => navigate(`/users/${user._id || user.id}`)}>View</button>
                      <button className="action-btn" onClick={() => navigate(`/users/${user._id || user.id}/edit`)}>Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Drivers = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      console.log('Fetching drivers from API...');
      const response = await api.get('/admin/users');
      console.log('API Response:', response.data);
      // Filter only driver users
      const driverUsers = response.data.filter(user => user.role === 'driver');
      console.log('Driver users:', driverUsers);
      setDrivers(driverUsers);
      setError(null);
    } catch (err) {
      console.error('Error fetching drivers:', err);
      console.error('Error details:', err.response?.data);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load drivers';
      setError(`${errorMsg}. Please logout and login again. Using sample data for now.`);
      // Fallback to mock data if API fails
      setDrivers([
        { _id: '1', name: 'Rajesh Kumar', phone: '+91 98765 11111', vehicleNumber: 'DL 01 AB 1234', status: 'active' },
        { _id: '2', name: 'Amit Singh', phone: '+91 98765 22222', vehicleNumber: 'DL 02 CD 5678', status: 'active' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: '#6b7280' }}>Loading drivers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Drivers Management</h1>
          <p>Manage all delivery drivers ({drivers.length} total)</p>
        </div>
        <button className="primary-button" onClick={() => navigate('/drivers/new')}>+ Add Driver</button>
      </div>

      {error && (
        <div style={{
          background: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          color: '#92400e',
          fontSize: '14px'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div className="content-card">
        <div className="card-header">
          <h3>All Drivers</h3>
          <input 
            type="search" 
            placeholder="Search drivers..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>License</th>
                <th>Vehicle Number</th>
                <th>Vehicle Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver._id}>
                  <td><strong>#{driver._id.slice(-6)}</strong></td>
                  <td>{driver.name}</td>
                  <td>{driver.email}</td>
                  <td>{driver.phone || 'N/A'}</td>
                  <td>{driver.licenseNumber || 'N/A'}</td>
                  <td>{driver.vehicleNumber || 'N/A'}</td>
                  <td>{driver.vehicleType || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${
                      driver.status === 'active' ? 'status-delivered' : 
                      driver.status === 'pending' ? 'status-pending' : 
                      'status-cancelled'
                    }`}>
                      {driver.status || 'active'}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => navigate(`/drivers/${driver._id}`)}>View</button>
                    <button className="action-btn" onClick={() => navigate(`/drivers/${driver._id}/edit`)}>Edit</button>
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

const Suppliers = () => {
  const navigate = useNavigate();
  const suppliers = [
    { id: 1, name: 'FuelMate Station A', location: 'Downtown', fuel: 'All Types', stock: 5000, status: 'Active' },
    { id: 2, name: 'FuelMate Station B', location: 'City Center', fuel: 'Petrol, Diesel', stock: 3500, status: 'Active' },
    { id: 3, name: 'FuelMate Station C', location: 'Suburb', fuel: 'All Types', stock: 7000, status: 'Active' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Suppliers Management</h1>
          <p>Manage fuel suppliers and stations</p>
        </div>
        <button className="primary-button" onClick={() => navigate('/suppliers/new')}>+ Add Supplier</button>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3>All Suppliers</h3>
          <input type="search" placeholder="Search suppliers..." className="search-input" />
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Fuel Types</th>
                <th>Stock (L)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td><strong>#{supplier.id}</strong></td>
                  <td>{supplier.name}</td>
                  <td>{supplier.location}</td>
                  <td>{supplier.fuel}</td>
                  <td>{supplier.stock.toLocaleString()}L</td>
                  <td>
                    <span className="status-badge status-delivered">{supplier.status}</span>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => navigate(`/suppliers/${supplier.id}`)}>View</button>
                    <button className="action-btn" onClick={() => navigate(`/suppliers/${supplier.id}/edit`)}>Edit</button>
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

const Analytics = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Analytics & Reports</h1>
          <p>Detailed insights and performance metrics</p>
        </div>
        <button className="primary-button">Export Report</button>
      </div>

      <div className="content-card">
        <h3>Detailed Analytics Coming Soon</h3>
        <p style={{ color: '#6b7280', marginTop: '16px' }}>
          This section will include comprehensive analytics including revenue trends, 
          customer behavior, driver performance, and more detailed reports.
        </p>
      </div>
    </div>
  );
};

export { Users, Drivers, Suppliers, Analytics };
