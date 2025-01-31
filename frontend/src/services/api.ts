import axios from "axios";
import { ApiResponse } from "../types";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchRepositories = async (): Promise<ApiResponse> => {
  try {
    const response = await API.get<ApiResponse>("/repositories");
    return response.data;
  } catch (error) {
    console.error("Network Error:", error);
    throw error;
  }
};
