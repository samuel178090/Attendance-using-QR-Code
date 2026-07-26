import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'qrcode.react';
import { fetchQRCode } from '../actions/qrActionAdmin';
import { useNavigate } from 'react-router-dom';

const AdminQRCodeDisplay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { qrCodeData } = useSelector(state => state.qrcode);

  useEffect(() => {
    dispatch(fetchQRCode());
    const interval = setInterval(() => {
      dispatch(fetchQRCode());
    }, 60000 * 10);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
      padding: '20px'
    }}>
      <button onClick={() => navigate('/admin/dashboard')} style={{
        position: 'absolute',
        top: '25px',
        left: '25px',
        padding: '10px 20px',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '10px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '0.9rem'
      }}>← Back</button>

      <div style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '24px',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        maxWidth: '380px',
        width: '100%'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>📱</div>
        <h1 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '6px' }}>
          Attendance QR Code
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: '25px' }}>
          Students scan this to mark their attendance
        </p>

        <div style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '16px',
          display: 'inline-block',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          {qrCodeData
            ? <QRCode value={qrCodeData} size={220} />
            : <div style={{ width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                Loading...
              </div>
          }
        </div>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '20px' }}>
          🔄 QR code refreshes every 10 minutes
        </p>
      </div>
    </div>
  );
};

export default AdminQRCodeDisplay;
