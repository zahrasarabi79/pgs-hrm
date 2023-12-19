import { RoleRes } from '@/state-management/apis/types';
import { Tooltip } from '@mui/material';
import React from 'react';

export const renderOrganizationalPath = (item: RoleRes['data'][0]) => {
  if (item.path?.length > 2) {
    return (
      <Tooltip
        title={item.path?.map((path, i) => (
          <span key={path.id}>
            {i !== 0 && ' > '}
            {path.organizationalHierarchyName.value} {path.name.value}
          </span>
        ))}
      >
        <span style={{ cursor: 'pointer' }}>
          {item.path[0].organizationalHierarchyName.value} {item.path[0].name.value}
          {' ... '}
          {item.path[item.path?.length - 1].organizationalHierarchyName.value}{' '}
          {item.path[item.path?.length - 1].name.value}
        </span>
      </Tooltip>
    );
  } else {
    return item.path?.map((path, i) => (
      <span key={path.id}>
        {i !== 0 && ' > '}
        {path.organizationalHierarchyName.value} {path.name.value}
      </span>
    ));
  }
};
