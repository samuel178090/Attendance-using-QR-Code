import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QrReader } from 'react-qr-reader';
import { markAttendance } from '../actions/qrActionStudent';

const StudentAttendanceScanner = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { successResponse, error } = useSelector(state => state.qrScanner);

  const handleResult = (result) => {
    if (result?.text && user?._id) {
      dispatch(markAttendance(result.text, user._id));
    }
  };

  return (
    <div>
      <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
        <QrReader
          onResult={handleResult}
          constraints={{ facingMode: 'environment' }}
          style={{ width: '100%' }}
        />
      </div>
      {successResponse && <p style={{ color: '#38ef7d', marginTop: '15px', fontWeight: 600 }}>✅ Attendance Marked Successfully!</p>}
      {error && <p style={{ color: '#ff6b6b', marginTop: '15px' }}>❌ {error}</p>}
    </div>
  );
};

export default StudentAttendanceScanner;
