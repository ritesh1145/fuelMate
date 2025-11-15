import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      setFormData({
        name: response.data.name,
        phone: response.data.phone || '',
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      alert('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      setEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.post(`${API_URL}/profile/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile picture updated successfully');
      await loadProfile();
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert(error.response?.data?.message || 'Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePicture = async () => {
    if (!profile?.profilePicture) {
      alert('No profile picture to delete');
      return;
    }

    if (!window.confirm('Are you sure you want to delete your profile picture?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/profile/picture`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Profile picture deleted successfully');
      await loadProfile();
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      alert(error.response?.data?.message || 'Failed to delete profile picture');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  const profileImageUrl = profile?.profilePicture
    ? `${API_URL.replace('/api', '')}${profile.profilePicture}`
    : null;

  return (
    <div className="profile-container">
      <h1>Admin Profile</h1>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image-container">
              {profileImageUrl ? (
                <img 
                  src={profileImageUrl} 
                  alt="Profile" 
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder">
                  <span className="profile-initials">
                    {profile?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {uploading && (
                <div className="uploading-overlay">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
            <div className="profile-image-actions">
              <label className="btn btn-secondary btn-sm">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  disabled={uploading}
                />
                📷 Change Photo
              </label>
              {profile?.profilePicture && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleDeletePicture}
                  disabled={uploading}
                >
                  🗑️ Remove
                </button>
              )}
            </div>
          </div>

          <div className="profile-info">
            <h2>{profile?.name}</h2>
            <p className="email">{profile?.email}</p>
            <span className="role-badge">{profile?.role?.toUpperCase()}</span>
          </div>
        </div>

        <div className="profile-details">
          {!editing ? (
            <>
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{profile?.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{profile?.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{profile?.phone || 'Not provided'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Role:</span>
                <span className="detail-value">{profile?.role}</span>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleUpdateProfile} className="edit-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  💾 Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: profile.name,
                      phone: profile.phone || '',
                    });
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
