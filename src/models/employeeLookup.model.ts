import { EmploymentStatus } from "./employmentStatus.model";
import { Role } from "./role.model";
import { Team } from "./team.model";

export interface EmployeeLookup {
    teams: Team[];          // List of teams
    roles: Role[];          // List of roles
    employmentStatuses: EmploymentStatus[];
  }