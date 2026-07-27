import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axiosConfig';

const AttendanceReport = () => {
    const navigate = useNavigate();
    const [report, setReport] = useState({ present: [], absent: [], total: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/attendence/attendance-report')
            .then(res => { setReport(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const cardStyle = {
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '16px',
        padding: '20px',
        flex: 1,
        minWidth: '280px'
    };

    const rowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        color: '#fff',
        fontSize: '0.9rem'
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', padding: '30px 20px', fontFamily: 'Poppins, sans-serif' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700 }}>📊 Attendance Report</h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Total Students: {report.total}</p>
                </div>
                <button onClick={() => navigate('/admin/dashboard')} style={{
                    padding: '10px 20px', background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px',
                    color: '#fff', cursor: 'pointer', fontSize: '0.9rem'
                }}>← Back</button>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <div style={{ ...cardStyle, borderColor: 'rgba(56,239,125,0.3)' }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '5px' }}>PRESENT</p>
                    <h2 style={{ color: '#38ef7d', fontSize: '2.5rem', fontWeight: 700 }}>{report.present.length}</h2>
                </div>
                <div style={{ ...cardStyle, borderColor: 'rgba(255,107,107,0.3)' }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '5px' }}>ABSENT</p>
                    <h2 style={{ color: '#ff6b6b', fontSize: '2.5rem', fontWeight: 700 }}>{report.absent.length}</h2>
                </div>
                <div style={{ ...cardStyle }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '5px' }}>ATTENDANCE RATE</p>
                    <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 700 }}>
                        {report.total ? Math.round((report.present.length / report.total) * 100) : 0}%
                    </h2>
                </div>
            </div>

            {loading ? <p style={{ color: '#fff', textAlign: 'center' }}>Loading...</p> : (
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {/* Present */}
                    <div style={cardStyle}>
                        <h3 style={{ color: '#38ef7d', marginBottom: '15px' }}>✅ Present ({report.present.length})</h3>
                        {report.present.length === 0
                            ? <p style={{ color: 'rgba(255,255,255,0.4)' }}>No students present</p>
                            : report.present.map(s => (
                                <div key={s._id} style={rowStyle}>
                                    <span>{s.rollNo}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>{s.email}</span>
                                </div>
                            ))
                        }
                    </div>

                    {/* Absent */}
                    <div style={cardStyle}>
                        <h3 style={{ color: '#ff6b6b', marginBottom: '15px' }}>❌ Absent ({report.absent.length})</h3>
                        {report.absent.length === 0
                            ? <p style={{ color: 'rgba(255,255,255,0.4)' }}>All students present</p>
                            : report.absent.map(s => (
                                <div key={s._id} style={rowStyle}>
                                    <span>{s.rollNo}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>{s.email}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceReport;
