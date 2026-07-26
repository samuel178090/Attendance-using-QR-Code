import axios from 'axios';

export const markAttendance = (token, studentId) => {
  return async dispatch => {
    try {
      const response = await axios.post('/attendence/mark-attendance', { token, studentId });
      dispatch({ type: 'ATTENDANCE_MARKED_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to mark attendance' });
    }
  };
};

export const attendanceMarkedSuccess = (data) => {
  return { type: 'ATTENDANCE_MARKED_SUCCESS', payload: data };
};
