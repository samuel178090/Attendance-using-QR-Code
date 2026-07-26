import React from 'react';
import StudentLoginForm from '../components/StudentLoginForm';
import AdminLogin from '../components/adminLogin';
import '../components/studentLogin.css';

const Home = () => {
    return (
        <div className="home-wrapper">
            <div className="home-header">
                <div className="school-icon">🎓</div>
                <h1>Attendance Management System</h1>
                <p>Scan QR Code · Mark Attendance · Track Records</p>
            </div>

            <div className="login-forms-container">
                <StudentLoginForm />
                <AdminLogin />
            </div>
        </div>
    );
};

export default Home;
