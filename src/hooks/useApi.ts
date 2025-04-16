// src/hooks/useApi.ts
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { environment } from "@/environments/environment";

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const api = axios.create({
    baseURL: environment.apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently({
        authorizationParams: {
            audience: environment.auth.authorizationParams.audience // Value from your config
        }
    });
    console.log("Token From Auth0: ", token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
};
