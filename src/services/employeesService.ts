// src/services/employeeService.ts

import { AxiosInstance } from "axios";
import { Employee } from "@/models/Employee.model";
import { EmployeeLookup } from "@/models/employeeLookup.model";

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
 
export const fetchEmployeeLookups = async (
  api: AxiosInstance,
  organizationKey: string
): Promise<EmployeeLookup> => {
  const response =  await api.get(
    `/api/v1/organizations/${organizationKey}/lookup/GetEmployeeLookups`
  );
  return response.data;
}

export const checkIfEmployeeEmailExists = async (
  api: AxiosInstance,
  organizationKey: string,
  email: string
): Promise<any> => {
  const response =  await api.get(
    `/api/v1/organizations/${organizationKey}/employees/${email}/check-email`
  );
  return !response.data;
}

export const checkIfEmployeeIdExists = async (
  api: AxiosInstance,
  organizationKey: string,
  employeeId: string
): Promise<any> => {
  const response =  await api.get(
    `/api/v1/organizations/${organizationKey}/employees/${employeeId}/check-employee-id`
  );
  return !response.data;
}