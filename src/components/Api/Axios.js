import axios from "axios";

const AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3006"
      : "https://dream-team-0u4l.onrender.com",
  timeout: 50000,
});

export default AxiosInstance;