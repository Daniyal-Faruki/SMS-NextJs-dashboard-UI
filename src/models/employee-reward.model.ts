export interface EmployeeReward {
	uid?: string;
	employeeUid?: string;
	employeeId?: string | null;
	employeeName?: string;
	email?: string;
	periodUid?: string;
	teamName?: string;
	teamUid?: string;
	reward?: string;
	rewardUid?: string;
	reason?: string;
	points?: number;
	totalPoints?: number;
	assignedBy?: string;
	assignedAt?: string;
	avatar?: string;
	isDeleted?: boolean;
	startDate: string;
	endDate: string;
}
