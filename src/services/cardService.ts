import axios from "axios";
import type { CreateCardDto } from "../interfaces/CardType";

const API_URL = "https://bcard-ojqa.onrender.com/cards";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { "x-auth-token": token } };
};

export const getCards = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getMyCards = async () => {
  const response = await axios.get(`${API_URL}/my-cards`, getAuthHeaders());
  return response.data;
};

export const createCard = async (cardData: CreateCardDto) => {
  const response = await axios.post(API_URL, cardData, getAuthHeaders());
  return response.data;
};

export const getCardById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateCard = async (id: string, cardData: CreateCardDto) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    cardData,
    getAuthHeaders()
  );
  return response.data;
};

export const likeCard = async (id: string) => {
  const response = await axios.patch(`${API_URL}/${id}`, {}, getAuthHeaders());
  return response.data;
};

export const deleteCard = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
