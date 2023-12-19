import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import {
  employeeData,
  HierarchyData,
  HierarchyRes,
  OneRoleRes,
  OrganizationLevelRes,
  OrganizationLevelsRes,
  RoleRes,
  StructureData,
  StructureRes,
  UserAccountRes,
  WorkflowData,
  workflowStatusData,
} from '@/state-management/apis/types';

export interface HeaderMenuProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
}

export interface HeaderComponentProps {
  open: boolean;
  drawerWidth: {
    desktop: number;
    mobile: number;
  };
  handleMobileSidebarToggle: () => void;
}

export interface AutoCompleteComponentProps {
  label: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
  readOnly?: boolean;
  disabledIndices?: number[];
  dataList: any[]; // data type can be any kind of data
  noOptionsText: string | ReactNode;
  optionName: string;
  watch: UseFormWatch<any>;
  name: string;
  errors: boolean;
  errorMessage?: string;
  setValue: UseFormSetValue<any>;
  multiple?: boolean;
  formSubmitted: boolean;
  additionalKeys?: string[];
  register: any;
}

export interface OptionType {
  label: string;
  id: number;
  [key: string]: any;
}

export interface CustomSelectComponentProps {
  name: string;
  label: string;
  size: 'medium' | 'small';
  disabled: boolean;
  multiple?: boolean;
  items: { name: string; value: string }[];
  errors: any;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export interface HierarchiesTableBodyProps {
  item: HierarchyData;
  index: number;
  page: number;
  refetch: any;
}

export interface HierarchyModifierProps {
  mode: 'update' | 'create';
  hierarchyId?: string;
  hierarchyData?: HierarchyRes;
}

export interface OrganizationLevelModifierFormProps {
  mode: 'update' | 'create';
  organizationLevelId?: string;
  organizationData?: OrganizationLevelRes;
}

export interface IOrganizationLevelFormValue {
  name: string;
  description: string;
}

export interface OrganizationLevelTableBodyProps {
  items: OrganizationLevelsRes['data'][0];
  index: number;
}

export interface OrganizationLevelFieldProps {
  watch: UseFormWatch<any>;
  errors: boolean;
  setValue: UseFormSetValue<any>;
  control: Control<any>;
  errorMessage: string;
  register: UseFormRegister<any>;
  formSubmitted: boolean;
}

export interface RoleModifierFormValues {
  positionId: { label: string; id: string }[];
  organizationalStructureId: { label: string; id: string }[];
  rank: number;
  requiredEmployeesCount: number;
  description: string;
}

export interface StructureTreeFieldProps extends OrganizationLevelFieldProps {
  dataList: { id: any; label: string }[];
}

export interface RoleModifierFormProps {
  mode: 'create' | 'update';
  roleId?: string;
  // if role-modifier was responsible for updating, it should take role-data as props ; otherwise it should not ;
  roleData?: OneRoleRes['data'];
}

export interface RoleTableBodyProps {
  item: RoleRes['data'][0];
  index: number;
}

export interface StructureModifierFormProps {
  mode: 'update' | 'create';
  StructureId?: string;
  structureData?: StructureRes;
}

export interface StructuresTableBodyProps {
  item: StructureData;
  index: number;
  page: number;
  refetch: any;
}

export interface EmployeesTableBodyProps {
  item: employeeData;
  index: number;
  page: number;
  refetch: any;
}

export interface EmployeeModifierFormProp {
  mode: 'create' | 'update';
  employeeId?: string;
  employeeData?: employeeData;
}

export interface WorkflowTableBodyProps {
  item: workflowStatusData;
  index: number;
  page: number;
  refetch: any;
}

export interface WorkflowModifierFormProps {
  mode: 'create' | 'update';
  workflowData?: WorkflowData;
}

export interface UserModifierFormProps {
  isSuccess: boolean;
  userAccount?: UserAccountRes;
}
// landing
export interface ISliderImages {
  url: string;
  name: string;
  icon: string;
}