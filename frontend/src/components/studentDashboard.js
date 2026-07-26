import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/studentAction';
import { useNavigate } from 'react-router-dom';
import StudentAttendanceScanner from './QRScanner';

const StudentDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);

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
                    <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700 }}>📋 Student Dashboard</h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                        Welcome, {user?.rollNo || 'Student'}
                    </p>
                </div>
                <button onClick={handleLogout} style={{
                    padding: '10px 24px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }}>Logout</button>
            </div>

            {/* Scanner Card */}
            <div style={{
                maxWidth: '420px',
                margin: '0 auto',
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📷</div>
                <h2 style={{ color: '#fff', marginBottom: '5px', fontSize: '1.2rem' }}>Scan to Mark Attendance</h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: '20px' }}>
                    Point your camera at the QR code shown by your admin
                </p>
                <StudentAttendanceScanner />
            </div>
        </div>
    );
};

export default StudentDashboard;
