// src/services/lookupService.ts

import { AxiosInstance } from "axios";

// import api from "@/utils/api";
export const getScheduleRangeLookup = async (
    api: AxiosInstance,
    organizationKey: string
  ) => {
    const response = await api.get(
      `/api/v1/organizations/${organizationKey}/lookup/GetScheduleRangeLookup`
    );
    return response.data;
  };

// export const getTeamsLookup = async (organizationKey: string) => {
//   const response = await api.get(
//     `/organizations/${organizationKey}/lookup/GetTeamsLookup`
//   );
//   return response.data;
// };

// export const getRolesLookup = async (organizationKey: string) => {
//   const response = await api.get(
//     `/organizations/${organizationKey}/lookup/GetRolesLookup`
//   );
//   return response.data;
// };

// Add more lookup calls here
