import axios from 'axios';

const API_BASE_URL = 'https://your-dify-app.com/api';

export const getTarotReading = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tarot/reading`, data);
    return response.data;
  } catch (error) {
    console.error('API请求失败:', error);
    throw error;
  }
};