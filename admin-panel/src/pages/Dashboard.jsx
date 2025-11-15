import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalOrders: 1247,
    activeUsers: 892,
    totalRevenue: 156789,
    activeDrivers: 45,
    pendingApprovals: 3, // Add pending approvals count
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 'ORD-001', customer: 'John Doe', fuel: 'Petrol', quantity: 20, status: 'Delivered', amount: 1900 },
    { id: 'ORD-002', customer: 'Jane Smith', fuel: 'Diesel', quantity: 30, status: 'In Transit', amount: 2670 },
    { id: 'ORD-003', customer: 'Mike Johnson', fuel: 'CNG', quantity: 15, status: 'Pending', amount: 1125 },
    { id: 'ORD-004', customer: 'Sarah Williams', fuel: 'Electric', quantity: 25, status: 'Delivered', amount: 3000 },
    { id: 'ORD-005', customer: 'Tom Brown', fuel: 'Petrol', quantity: 40, status: 'In Transit', amount: 3800 },
  ]);

  const orderTrends = [
    { month: 'Jan', orders: 120 },
    { month: 'Feb', orders: 150 },
    { month: 'Mar', orders: 180 },
    { month: 'Apr', orders: 160 },
    { month: 'May', orders: 200 },
    { month: 'Jun', orders: 220 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 16000 },
    { month: 'May', revenue: 20000 },
    { month: 'Jun', revenue: 22000 },
  ];

  const fuelDistribution = [
    { name: 'Petrol', value: 45 },
    { name: 'Diesel', value: 30 },
    { name: 'CNG', value: 15 },
    { name: 'Electric', value: 10 },
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#95E1D3', '#FFA07A'];

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
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your fuel delivery platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate('/orders')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            📦
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Orders</div>
            <div className="stat-value">{stats.totalOrders.toLocaleString()}</div>
            <div className="stat-change positive">+12% from last month</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/users')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            👥
          </div>
          <div className="stat-content">
            <div className="stat-label">Active Users</div>
            <div className="stat-value">{stats.activeUsers.toLocaleString()}</div>
            <div className="stat-change positive">+8% from last month</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/analytics')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            💰
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Revenue</div>
            <div className="stat-value">₹{stats.totalRevenue.toLocaleString()}</div>
            <div className="stat-change positive">+15% from last month</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/drivers')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            🚗
          </div>
          <div className="stat-content">
            <div className="stat-label">Active Drivers</div>
            <div className="stat-value">{stats.activeDrivers}</div>
            <div className="stat-change positive">+5 new drivers</div>
          </div>
        </div>
      </div>

      {/* Pending Approvals Alert */}
      {stats.pendingApprovals > 0 && (
        <div 
          onClick={() => navigate('/pending-approvals')}
          style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: '2px solid #fbbf24',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '32px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ 
            fontSize: '32px',
            background: 'white',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            ⏳
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px 0', color: '#92400e', fontSize: '18px', fontWeight: 600 }}>
              {stats.pendingApprovals} Driver Application{stats.pendingApprovals > 1 ? 's' : ''} Pending Approval
            </h3>
            <p style={{ margin: 0, color: '#78350f', fontSize: '14px' }}>
              Click here to review and approve new driver registrations
            </p>
          </div>
          <div style={{ 
            fontSize: '24px',
            color: '#92400e'
          }}>
            →
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Order Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#667eea" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Revenue Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#4facfe" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Fuel Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fuelDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value">
                {fuelDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Fuel Type</th>
                <th>Quantity (L)</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.fuel}</td>
                  <td>{order.quantity}L</td>
                  <td>₹{order.amount.toLocaleString()}</td>
                  <td>{getStatusBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
