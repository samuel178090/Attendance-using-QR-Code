import API from '../axiosConfig';

export const fetchQRCode = () => {
  return async dispatch => {
    try {
      const response = await API.get('/attendence/generate-qr');
      dispatch({ type: 'SET_QR_CODE', payload: response.data.qrCodeData });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch QR code' });
    }
  };
};
