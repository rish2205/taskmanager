import api from "../api/axios";

// REGISTER USER
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// LOGIN USER
export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

// SAVE LOGGED-IN USER DATA IN LOCALSTORAGE
export const saveAuthData = (authData) => {
  localStorage.setItem("token", authData.token);
  localStorage.setItem("userName", authData.name);
  localStorage.setItem("userEmail", authData.email);
};

// GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

// GET USER NAME
export const getUserName = () => {
  return localStorage.getItem("userName");
};

// GET USER EMAIL
export const getUserEmail = () => {
  return localStorage.getItem("userEmail");
};

// CHECK IF USER IS LOGGED IN
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

// LOGOUT USER
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
};