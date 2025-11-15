import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/orders', icon: '📦', label: 'Orders' },
    { path: '/users', icon: '👥', label: 'Users' },
    { path: '/drivers', icon: '🚗', label: 'Drivers' },
    { path: '/pending-approvals', icon: '⏳', label: 'Pending Approvals' },
    { path: '/suppliers', icon: '⛽', label: 'Suppliers' },
    { path: '/analytics', icon: '📈', label: 'Analytics' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src="/logo.png" alt="FuelMate Logo" className="logo-image" />
            <span className="logo-text">FuelMate</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.charAt(0) || 'A'}</div>
            <div className="user-details">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
