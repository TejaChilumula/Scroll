
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const requestBody = req.body;

    // Add necessary headers or configurations
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        // Other headers if needed
      },
    };

    const response = await axios.post('http://127.0.0.1:5000/ask', requestBody, axiosConfig);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}
