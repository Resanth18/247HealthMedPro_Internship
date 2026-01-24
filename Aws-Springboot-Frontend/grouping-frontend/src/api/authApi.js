import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// LOGIN
export const login = (data) =>
  API.post("/auth/login", data);

// FORGOT PASSWORD
export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);

// RESET PASSWORD
export const resetPassword = (data) =>
  API.post("/auth/reset-password", data);

export const setNewPassword = (data) => {
  return API.post("/set-new-password", data);
};

export default API;
