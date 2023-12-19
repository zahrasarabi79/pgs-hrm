import { SidebarItems } from '@/public/data/sidebaritems';

interface Text {
  _: string;
}

export interface StaticText extends Text {
  _: 'StaticText';
  value: string;
}

export interface HierarchyData {
  id: string;
  name: StaticText;
  description?: StaticText;
  rank: number;
  createdAt: string;
  updatedAt: string | null;
  organizationalStructuresCount: number;
}

export interface HierarchiesRes {
  success: boolean;
  page: number;
  total: number;
  data: HierarchyData[];
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface HierarchyBriefRes {
  success: boolean;
  data: Partial<HierarchyData>[];
}

export interface HierarchyRes {
  success: boolean;
  data: HierarchyData;
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface AddHierarchyReq {
  name: StaticText;
  description?: StaticText;
  rank: number;
}

export interface UpdateHierarchyReq extends AddHierarchyReq {
  id: string;
}

export interface AddOrganizationLevelReq {
  name: StaticText;
  description?: StaticText;
}

export interface UpdateOrganizationLevel extends AddOrganizationLevelReq {
  id: string;
}

export interface OrganizationLevelsRes {
  page: number;
  total: number;
  data: {
    id: string;
    name: StaticText;
    description?: StaticText;
  }[];
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface OrganizationLevelRes {
  success: boolean;
  data: {
    id: string;
    name: StaticText;
    description?: StaticText;
  };
  permissions: {
    update: boolean;
    delete: boolean;
  };
}

export interface RoleRes {
  page: number;
  total: number;
  data: {
    id: string;
    organizationalStructureId: string;
    positionId: string;
    requiredEmployeesCount: number;
    rank: number;
    positionName: StaticText;
    path: OrganizationalPath[];
    description?: StaticText;
    employeesCount: number;
  }[];
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
    permission: boolean;
  };
}

export interface OneRoleRes {
  success: true;
  data: RoleRes['data'][0];
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
    permission: boolean;
  };
}

export interface OrganizationalPath {
  id: string;
  name: StaticText;
  organizationalHierarchyName: StaticText;
}

export interface AddRoleReq {
  positionId: string;
  organizationalStructureId: string;
  rank: number;
  requiredEmployeesCount: number;
  description?: StaticText;
}

export interface UpdateRoleReq extends AddRoleReq {
  id: string;
}

export interface PermissionGroupItem {
  name: string;
  items: Partial<PermissionGroupItem[] | PermissionItem[]>;
  _: 'PermissionGroupItem';
}

export interface PermissionItem {
  name: string;
  adminHasAccess: boolean;
  service: string;
  dependencies: string[];
  _: 'PermissionItem';
  selected?: boolean;
}

export interface Permissions {
  success: boolean;
  data: PermissionGroupItem[];
}

// structure interface

export interface StructureData {
  id: string;
  name: StaticText;
  description?: StaticText;
  organizationalHierarchyId: string;
  logo: null | string;
  organizationalHierarchyName: StaticText;
  organizationalHierarchyRank: number;
  path: StructureDataPath[];
  rolesCount: number;
  subsetsCount: number;
  createdAt: string;
  updatedAt: string | null;
  superiorId: string | null;
}

export interface StructureDataPath {
  id: string;
  name: StaticText;
  organizationalHierarchyName: StaticText;
}

export interface StructuresRes {
  success: boolean;
  page: number;
  total: number;
  data: StructureData[];
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface AddStructureReq {
  name: StaticText;
  description?: StaticText;
  organizationalHierarchyId: string;
  logo?: string | null;
}

export interface UpdateStructureReq extends AddStructureReq {
  id: string;
  superiorId?: string;
  isRoot?: boolean;
}

export interface StructuresTreeData {
  organizationalHierarchy: StaticText;
  id: string;
  subsets: StructuresTreeData[];
  name: StaticText;
  organizationalHierarchyRank: number;
}

export interface StructuresTreeRes {
  data: StructuresTreeData[];
}

export interface StructureRes {
  success: boolean;
  data: StructureData;
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

// employees
export interface employeeData {
  createdAt: string;
  description?: StaticText;
  firstname: string;
  gender: 'male' | 'female';
  id: string;
  lastname: string;
  profileImage: null | string;
  role?: RoleData[];
  roles?: RoleData[];
  rolesCount: number;
  updatedAt: null | string;
}

export interface RoleData {
  id: string;
  rank: number;
  organizationalStructurePath: StructureDataPath[];
  positionName: StaticText;
}

export interface EmployeesRes {
  success: boolean;
  page: number;
  total: number;
  data: employeeData[];
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
    account: boolean;
  };
}

export interface EmployeeRes {
  success: boolean;
  data: employeeData;
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
    account: boolean;
  };
}

export interface AddEmployeeReq {
  firstname: string;
  lastname: string;
  gender: 'male' | 'female';
  roles: string[];
  description?: StaticText;
  profileImage?: string; // uuid
}

export interface UpdateEmployeeReq extends AddEmployeeReq {}

export interface RoleTreeRes {
  success: boolean;
  data: {
    id: string;
    name: StaticText;
    organizationalHierarchy: StaticText;
    roles: { id: string; name: StaticText }[];
    subsets: RoleTreeRes[];
  }[];
}

// user
export interface UserAccountRes {
  success: boolean;
  data: {
    username: string;
    updateAt: string;
    isAdmin: boolean;
    enable: boolean;
    employeeId: string;
    email: string;
    createdAt: string;
  };
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface AddAndUpdateUserReq {
  username: string;
  email: string;
  password: string;
}

export interface SidebarItemsRes {
  success: boolean;
  data: SidebarItems[];
}

// workflow statuses
export interface createWorkflowStatusReq {
  type: 'start' | 'in-progress' | 'done';
  name: StaticText;
  description: StaticText;
}

export interface workflowStatusData {
  createdAt: string;
  description: StaticText;
  id: string;
  name: StaticText;
  type: 'start' | 'in-progress' | 'done';
  updatedAt: string;
}

export interface workflowStatusRes {
  success: boolean;
  data: workflowStatusData;
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface WorkflowStatusesRes {
  success: boolean;
  page: number;
  total: number;
  data: workflowStatusData[];
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface IFlows {
  createdAt: Date;
  id: string;
  active: boolean;
}

export interface WorkflowData {
  id: string;
  name: { _: 'StaticText'; value: string };
  service: { _: 'SystemService'; name: string };
  trigger: { _: 'FormWorkflowTrigger'; formId: string };
  flows: IFlows[];
  description?: StaticText;
}

export interface WorkflowsRes {
  success: boolean;
  page: number;
  total: number;
  data: WorkflowData[];
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface AddWorkflowReq {
  name: StaticText;
  service: { _: 'SystemService'; name: string };
  trigger: { _: 'FormWorkflowTrigger'; formId: string };
  description?: StaticText;
}

export interface UpdateFlowUpdate extends AddWorkflowReq {
  workflowId: string;
}

export interface WorkflowRes {
  success: boolean;
  data: WorkflowData;
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

// profile
export interface ProfileRes {
  success: boolean;
  data: {
    isAdmin: boolean;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    profileImage: string;
  };
}
