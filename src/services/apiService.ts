import axios from "axios";
import type { RegisterUserDto, LoginUserDto } from "../interfaces/UserType";

const API_URL = "https://bcard-ojqa.onrender.com/users";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { "x-auth-token": token } };
};

export const registerUser = async (user: RegisterUserDto) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const loginUser = async (user: LoginUserDto) => {
  const response = await axios.post(`${API_URL}/login`, user);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const updateUser = async (
  id: string,
  user: Partial<RegisterUserDto>
) => {
  const response = await axios.put(`${API_URL}/${id}`, user, getAuthHeaders());
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const changeUserBusinessStatus = async (id: string) => {
  const response = await axios.patch(`${API_URL}/${id}`, {}, getAuthHeaders());
  return response.data;
};
