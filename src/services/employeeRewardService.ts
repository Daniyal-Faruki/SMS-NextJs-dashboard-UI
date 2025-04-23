// src/services/employeeService.ts

import { AxiosInstance } from "axios";
import { EmployeeReward } from "@/models/employee-reward.model";

interface EmployeeRewardSearchPayload {
  searchString: string;
  teams: string[] | string | null;
  startDate: string;
  endDate: string;
}

interface SpecificEmployeeRewardPayload {
  employeeUid: string;
  startDate: string;
  endDate: string;
}

export const searchEmployeeRewards = async (
  api: AxiosInstance,
  organizationKey: string,
  payload: EmployeeRewardSearchPayload
): Promise<EmployeeReward[]> => {
  const response = await api.post(
    `/api/v1/organizations/${organizationKey}/employee-rewards/search`,
    payload
  );
  return response.data;
};

export const specificEmployeeRewards = async (
  api: AxiosInstance,
  organizationKey: string,
  payload: SpecificEmployeeRewardPayload
): Promise<EmployeeReward[]> => {
  const response = await api.post(
    // `https://localhost:7192/api/v1/organizations/${organizationKey}/employee-rewards/get-specific`,
    `/api/v1/organizations/${organizationKey}/employee-rewards/get-specific`,
    payload
  );
  return response.data;
};
