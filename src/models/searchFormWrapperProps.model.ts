import { EmployeeReward } from "./employee-reward.model";

export interface SearchFormWrapperProps {
    formData: any;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    // gridClass?: string;
    ComponentToLoad: string;
    ComponentNameEnum: any;
    canCreate: boolean;
    openDialog: <T = any>(type: string, data?: T, isEdit?: boolean) => void;
    dialogConfig: any;
    open: boolean;
    dialogType: string | null;
    closeDialog: () => void;
    organizationKey: string;
    reloadTable: () => void;
    setOpenSnackbar: any;
    setSnackbarMessage: any;
    setSnackbarSeverity: any;
    selectedPeriod: any;
    handleSelectChange: (period: any) => void;
    periodsRange: any[];
    isMobile: boolean;
    teams: any[];
    handleFormat: (e: any, newVal: string) => void;
    handleTeamDropdown: (e: any) => void;
    rewardToEdit?: EmployeeReward;
    isEdit?: boolean;
  }