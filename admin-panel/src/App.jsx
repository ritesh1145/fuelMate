import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import OrderEdit from './pages/OrderEdit';
import OrderNew from './pages/OrderNew';
import UserDetail from './pages/UserDetail';
import UserEdit from './pages/UserEdit';
import UserNew from './pages/UserNew';
import DriverDetail from './pages/DriverDetail';
import DriverEdit from './pages/DriverEdit';
import DriverNew from './pages/DriverNew';
import PendingApprovals from './pages/PendingApprovals';
import SupplierDetail from './pages/SupplierDetail';
import SupplierEdit from './pages/SupplierEdit';
import SupplierNew from './pages/SupplierNew';
import Profile from './pages/Profile';
import { Users, Drivers, Suppliers, Analytics } from './pages/Pages';
import './App.css';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/new" element={<OrderNew />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="orders/:id/edit" element={<OrderEdit />} />
            <Route path="users" element={<Users />} />
            <Route path="users/new" element={<UserNew />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="users/:id/edit" element={<UserEdit />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="drivers/new" element={<DriverNew />} />
            <Route path="drivers/:id" element={<DriverDetail />} />
            <Route path="drivers/:id/edit" element={<DriverEdit />} />
            <Route path="pending-approvals" element={<PendingApprovals />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="suppliers/new" element={<SupplierNew />} />
            <Route path="suppliers/:id" element={<SupplierDetail />} />
            <Route path="suppliers/:id/edit" element={<SupplierEdit />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
