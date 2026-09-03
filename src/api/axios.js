import axios from "axios";

// إنشاء نسخة مخصصة من أسويس
const API = axios.create({
  // بيقرأ الرابط من متغيرات البيئة، ولو مش موجود بيروح لـ localhost افتراضياً للتطوير المحلي
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // لو بتستعمل Cookies / Sessions للتوثيق
});

// (اختياري ولكن مفيد جداً): إضافة Token التوثيق تلقائياً لو موجود في الـ localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // أو حسب المكان اللي بتخزن فيه الـ Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default API;
