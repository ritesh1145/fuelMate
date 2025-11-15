import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommonPages.css';

const PendingApprovals = () => {
  const navigate = useNavigate();
  
  const [pendingDrivers, setPendingDrivers] = useState([
    { id: 4, name: 'Suresh Patel', phone: '+91 98765 44444', vehicle: 'DL 04 GH 3456', vehicleType: 'Fuel Tanker - 2000L', license: 'DL4567890123', dateApplied: '2025-11-09', email: 'suresh@example.com' },
    { id: 5, name: 'Ramesh Yadav', phone: '+91 98765 55555', vehicle: 'DL 05 IJ 7890', vehicleType: 'Fuel Tanker - 3000L', license: 'DL7890123456', dateApplied: '2025-11-08', email: 'ramesh@example.com' },
    { id: 6, name: 'Dinesh Kumar', phone: '+91 98765 66666', vehicle: 'DL 06 KL 1234', vehicleType: 'Fuel Tanker - 1000L', license: 'DL1234567890', dateApplied: '2025-11-07', email: 'dinesh@example.com' },
  ]);

  const handleApprove = (driver) => {
    if (window.confirm(`Approve driver ${driver.name}?`)) {
      // In real app, send API request to approve driver
      console.log('Approved driver:', driver);
      setPendingDrivers(prev => prev.filter(d => d.id !== driver.id));
      alert(`${driver.name} has been approved and can now start accepting deliveries!`);
    }
  };

  const handleReject = (driver) => {
    const reason = prompt(`Enter reason for rejecting ${driver.name}:`);
    if (reason) {
      // In real app, send API request to reject driver with reason
      console.log('Rejected driver:', driver, 'Reason:', reason);
      setPendingDrivers(prev => prev.filter(d => d.id !== driver.id));
      alert(`${driver.name}'s application has been rejected.`);
    }
  };

  const handleViewDetails = (driver) => {
    // Show driver details in a modal or navigate to detail page
    alert(`Driver Details:\n\nName: ${driver.name}\nPhone: ${driver.phone}\nEmail: ${driver.email}\nVehicle: ${driver.vehicle}\nVehicle Type: ${driver.vehicleType}\nLicense: ${driver.license}\nApplied: ${driver.dateApplied}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Pending Driver Approvals</h1>
          <p>Review and approve new driver registrations</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ 
            background: '#fef3c7', 
            color: '#92400e', 
            padding: '8px 16px', 
            borderRadius: '20px', 
            fontSize: '14px',
            fontWeight: 600
          }}>
            {pendingDrivers.length} Pending
          </span>
        </div>
      </div>

      {pendingDrivers.length === 0 ? (
        <div className="content-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <h3 style={{ color: '#1f2937', marginBottom: '8px' }}>No Pending Approvals</h3>
          <p style={{ color: '#6b7280' }}>All driver applications have been reviewed.</p>
        </div>
      ) : (
        <div className="content-card">
          <div className="card-header">
            <h3>Driver Applications</h3>
            <input type="search" placeholder="Search applications..." className="search-input" />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Vehicle</th>
                  <th>Vehicle Type</th>
                  <th>License</th>
                  <th>Applied On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDrivers.map((driver) => (
                  <tr key={driver.id}>
                    <td><strong>#{driver.id}</strong></td>
                    <td>{driver.name}</td>
                    <td>{driver.phone}</td>
                    <td>{driver.vehicle}</td>
                    <td>{driver.vehicleType}</td>
                    <td>{driver.license}</td>
                    <td>{driver.dateApplied}</td>
                    <td>
                      <button 
                        className="action-btn" 
                        onClick={() => handleViewDetails(driver)}
                        style={{ background: '#dbeafe', color: '#1e40af' }}>
                        👁️ View
                      </button>
                      <button 
                        className="action-btn" 
                        onClick={() => handleApprove(driver)}
                        style={{ background: '#d1fae5', color: '#065f46' }}>
                        ✓ Approve
                      </button>
                      <button 
                        className="action-btn" 
                        onClick={() => handleReject(driver)}
                        style={{ background: '#fee2e2', color: '#991b1b' }}>
                        ✕ Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="content-card" style={{ marginTop: '24px', background: '#f0f9ff', border: '1px solid #bae6fd' }}>
        <h3 style={{ fontSize: '16px', color: '#0c4a6e', marginBottom: '12px' }}>
          📝 Approval Guidelines
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0369a1', fontSize: '14px', lineHeight: '1.8' }}>
          <li>Verify driver's license is valid and not expired</li>
          <li>Confirm vehicle registration matches the provided details</li>
          <li>Check insurance documents are up to date</li>
          <li>Review background verification report</li>
          <li>Ensure vehicle meets fuel delivery safety standards</li>
        </ul>
      </div>
    </div>
  );
};

export default PendingApprovals;
