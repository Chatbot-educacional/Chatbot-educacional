
import axios from 'axios';
import { pb } from "@/integrations/pocketbase/client";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  // Use PocketBase token instead of Supabase
  if (pb.authStore.isValid) {
    config.headers.Authorization = `Bearer ${pb.authStore.token}`;
  }
  return config;
});

export default api;
