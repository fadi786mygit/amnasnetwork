// src/pages/Admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import "../../UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8082/api/users/getUsers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Users data:', data); // Debug log
        
        // Handle different response structures
        if (data.users) {
          setUsers(data.users);
        } else if (Array.isArray(data)) {
          setUsers(data);
        } else if (data.data) {
          setUsers(data.data);
        } else {
          setUsers([]);
          setError('No users found or invalid response format');
        }
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = sessionStorage.getItem('adminToken');
        const response = await fetch(`http://localhost:8082/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setUsers(users.filter(user => user._id !== userId));
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  
  if (error) return <div className="error-alert">{error}</div>;

  return (
    <div className="user-management">
      <div className="page-header">
        <h2>User Management</h2>
        <p>Manage all registered users</p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map(user => (
                    <tr key={user._id || user.id}>
                      <td>{user.fullName || user.name || 'N/A'}</td>
                      <td>{user.email || 'N/A'}</td>
                      <td>{user.phone || 'N/A'}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteUser(user._id || user.id)}
                          disabled={user.role === 'admin'}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;