import axios from 'axios';
import { message } from 'antd'; 

const axiosInstance = axios.create({
  baseURL: 'https://api.dropcreative.io/', 
  // baseURL: 'http://localhost:8080', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          message.error('Bạn không có quyền truy cập tài nguyên này.');
          break;
        case 404:
          message.error('Tài nguyên không tồn tại.');
          break;
        case 500:
          message.error('Lỗi máy chủ. Vui lòng thử lại sau.');
          break;
        default:
          message.error('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } else if (error.request) {
      message.error('Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối mạng.');
    } else {
      message.error('Đã xảy ra lỗi khi thiết lập yêu cầu.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
