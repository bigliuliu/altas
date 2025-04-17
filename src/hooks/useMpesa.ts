import { AtlasBackendApi } from '@/constants/atlas-backend-api';
import { useState } from 'react';
import axios from 'axios';

const useMpesa = () => {
  const [paymentLoading, setLoading] = useState(false);
  const [paymentError, setError] = useState<string | null>(null);

  const getToken = async () => {
    try {
      const response = await axios.get(`${AtlasBackendApi}/payments/token`);
      return response.data.accessToken;
    } catch (err) {
      setError('Failed to retrieve token');
      throw new Error('Failed to retrieve token');
    }
  };

  const initiateSTKPush = async (phoneNumber: string, amount: number, user_id: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();

      console.log('TOKEN', token)

      // Headers for the request
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      // Payload for the STK Push
      const payload = {
        phoneNumber,
        amount,
        user_id
      };

      // Make the request to the Mpesa endpoint
      const response = await axios.post(`${AtlasBackendApi}/payments/stkpush`, payload, config);

      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError('Error initiating STK Push');
      throw new Error('Error initiating STK Push');
    }
  };

  return { initiateSTKPush, paymentLoading, paymentError };
};

export default useMpesa;

