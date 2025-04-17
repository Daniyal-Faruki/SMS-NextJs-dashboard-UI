// src/services/employeeService.ts

import { AxiosInstance } from "axios";
import { Employee } from "@/models/Employee.model";

interface EmployeeSearchPayload {
  searchString: string;
  teams: string[] | string | null;
}

export const searchEmployees = async (
  api: AxiosInstance,
  organizationKey: string,
  payload: EmployeeSearchPayload
): Promise<Employee[]> => {
  const response = await api.post(
    `/api/v1/organizations/${organizationKey}/employees/search`,
    payload
  );
  return response.data;
};
