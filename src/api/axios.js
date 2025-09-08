// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, // allows cookies if you’re using sessions
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Add token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // where you saved token after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
