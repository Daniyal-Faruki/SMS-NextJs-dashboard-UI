import { RoleTypeEnum } from "./enums";

export function getPermissions(roles: string[] = []) {
    const hasSysAdminRole = roles.includes(RoleTypeEnum.SysAdmin);
    const hasUserRole = roles.includes(RoleTypeEnum.User);
    const hasRpsAdminRole = roles.includes(RoleTypeEnum.RPSAdmin);
    const hasOrgAdminRole = roles.includes(RoleTypeEnum.OrgAdmin);
  
    const canEdit = hasSysAdminRole || hasOrgAdminRole || hasRpsAdminRole;
    const canCreate = hasSysAdminRole || hasOrgAdminRole || hasRpsAdminRole;
    const canView = hasUserRole || hasOrgAdminRole || hasRpsAdminRole;
    const canDelete = hasSysAdminRole || hasOrgAdminRole || hasRpsAdminRole;
  
    return {
      // roles
      hasSysAdminRole,
      hasOrgAdminRole,
      hasRpsAdminRole,
      hasUserRole,
      // permissions
      canEdit,
      canCreate,
      canView,
      canDelete,
    };
  }
  