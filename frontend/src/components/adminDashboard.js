import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/adminAction';
import { useNavigate } from 'react-router-dom';
import NewStudentForm from '../admin/NewStudent';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
            padding: '30px 20px',
            fontFamily: 'Poppins, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px',
                padding: '0 10px'
            }}>
                <div>
                    <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700 }}>🎓 Admin Dashboard</h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Manage students and attendance</p>
                </div>
                <button onClick={handleLogout} style={{
                    padding: '10px 24px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s'
                }}>Logout</button>
            </div>

            {/* Content */}
            <div style={{
                display: 'flex',
                gap: '30px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}>
                {/* Register Student Form */}
                <NewStudentForm />

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
                    <Link to="/all-students" style={{ textDecoration: 'none' }}>
                        <button style={{
                            width: '220px',
                            padding: '16px',
                            background: 'linear-gradient(135deg, #11998e, #38ef7d)',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#fff',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}>👥 View All Students</button>
                    </Link>

                    <Link to="/admin/qrcode" style={{ textDecoration: 'none' }}>
                        <button style={{
                            width: '220px',
                            padding: '16px',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#fff',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}>📱 Generate QR Code</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
