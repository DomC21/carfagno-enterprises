export const API_URL = "http://localhost:8000";
import axios from "axios"; export const api = axios.create({ baseURL: API_URL });
