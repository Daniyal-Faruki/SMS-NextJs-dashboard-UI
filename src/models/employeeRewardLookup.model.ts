import { Employee } from "./Employee.model";
import { Period } from "./period.model";
import { Reward } from "./rewards.model";
import { Team } from "./team.model";

export interface EmployeeRewardLookup {
    rewards: Reward[];
    periods: Period[];
    teams: Team[];
    employees: Employee[];
  }