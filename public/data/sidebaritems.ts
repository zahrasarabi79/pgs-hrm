import { IconNames } from '@/components/shared/ITypes';

export interface ISidebar {
  items: SidebarItems[];
}

export interface SidebarItems {
  _: 'SidebarGroupItem' | 'SidebarItem';
  name: string;
  icon?: IconNames;
  route?: string;
  items?: SimpleSidebarItem[];
  title?: string;
}

export interface SimpleSidebarItem {
  _: 'SidebarItem';
  name: string;
  route?: string;
  title?: string;
}
export interface StaticSidebarItem {
  icon: string;
  route: string;
  title?: string;
}

export const sidebarItemsMap: StaticSidebarItemsMap = {
  dashboard: {
    icon: 'linear/status-up.svg',
    route: 'workflow-management/dashboard',
    title: 'داشبورد',
  },
  'organizational-structures-management': {
    icon: 'linear/status-up.svg',
    route: 'management-of-organizational-structure',
    title: 'مدیریت ساختار سازمانی',
  },
  hierarchies: {
    icon: 'linear/status-up.svg',
    route: 'management-of-organizational-structure/hierarchy-list',
    title: 'سلسله مراتب',
  },
  structures: {
    icon: 'linear/status-up.svg',
    route: 'management-of-organizational-structure/structure-list',
    title: ' ساختار',
  },
  'employees-management': {
    icon: 'linear/status-up.svg',
    route: 'employee-management',
    title: 'مدیریت کارمندان',
  },
  positions: {
    icon: 'linear/status-up.svg',
    route: 'employee-management/organization-level-list',
    title: 'سمت سازمانی',
  },
  roles: {
    icon: 'linear/status-up.svg',
    route: 'employee-management/role-list',
    title: 'نقش',
  },
  employees: {
    icon: 'linear/status-up.svg',
    route: 'employee-management/employees-list',
    title: 'کارمندان',
  },
  leave: {
    icon: 'linear/status-up.svg',
    route: '/leave',
    title: 'leave',
  },
  bpms: {
    icon: 'linear/status-up.svg',
    route: 'bpms',
    title: 'سامانه  فرآیندهای کسبی',
  },
  'workflow-status': {
    icon: 'linear/status-up.svg',
    route: 'workflow-management/workflow-status-list',
    title: 'وضعیت جریان کار',
  },
  workflow: {
    icon: 'linear/status-up.svg',
    route: 'workflow-management/workflow-list',
    title: 'موتور جریان کار',
  },
  form: {
    icon: 'linear/status-up.svg',
    route: 'form-builder',
    title: '  فرم بساز',
  },
};

export function transformSidebarData(data: SidebarItems[], dataMap: StaticSidebarItemsMap): any {
  return {
    items:
      data?.map((groupItem) => {
        if (groupItem._ === 'SidebarGroupItem') {
          return {
            _: groupItem._,
            name: dataMap[groupItem.name]?.title, // name should be persian based on components config
            icon: dataMap[groupItem.name]?.icon || 'default-icon',
            items: transformSidebarData(groupItem.items || [], dataMap).items,
            title: groupItem.name,
          };
        } else {
          return {
            _: groupItem._,
            name: dataMap[groupItem.name]?.title,
            icon: dataMap[groupItem.name]?.icon || 'default-icon',
            route: dataMap[groupItem.name]?.route || 'default-route',
            title: groupItem.name,
          };
        }
      }) || [],
  };
}

export interface StaticSidebarItemsMap {
  [key: string]: StaticSidebarItem;
}

export const sidebarItems: ISidebar = {
  items: [
    {
      _: 'SidebarItem',
      name: 'داشبورد',
      title: 'داشبورد',
      route: '/dashboard',
      icon: 'linear/status-up.svg',
    },
    {
      _: 'SidebarGroupItem',
      name: 'مدیریت ساختار سازمانی',
      title: 'مدیریت ساختار سازمانی',
      icon: 'linear/status-up.svg',
      items: [
        {
          _: 'SidebarItem',
          name: 'سلسله مراتب',
          title: 'سلسله مراتب',
          route: 'management-of-organizational-structure/hierarchy-list',
        },
        {
          _: 'SidebarItem',
          name: 'ساختار',
          title: 'ساختار',
          route: 'management-of-organizational-structure/structure-list',
        },
      ],
    },
    {
      _: 'SidebarGroupItem',
      name: 'مدیریت کارمندان',
      title: 'مدیریت کارمندان',
      icon: 'linear/status-up.svg',
      items: [
        {
          _: 'SidebarItem',
          name: 'سمت سازمانی',
          title: 'سمت سازمانی',
          route: 'employee-management/organization-level-list',
        },
        {
          _: 'SidebarItem',
          name: 'نقش',
          title: 'نقش',
          route: 'employee-management/role-list',
        },
        {
          _: 'SidebarItem',
          name: 'کارمندان',
          title: 'کارمندان',
          route: 'employee-management/employees-list',
        },
      ],
    },
    {
      _: 'SidebarItem',
      name: 'مرخصی',
      title: 'مرخصی',
      icon: 'linear/status-up.svg',
      route: '/leave',
    },
    {
      _: 'SidebarItem',
      name: 'تایم شیت',
      title: 'تایم شیت',
      icon: 'linear/status-up.svg',
      route: '/time-sheet',
    },
  ],
};
