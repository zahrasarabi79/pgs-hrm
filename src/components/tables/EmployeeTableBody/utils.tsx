import React from 'react';
import { Tooltip } from '@mui/material';
import { RoleData } from '@/state-management/apis/types';

const renderEmployeeRoles = (item: RoleData) => {
  const renderPositionName = () => {
    return (
      <span>
        {item.positionName.value} {' / '}{' '}
      </span>
    );
  };
  const renderSingleRole = (path: any) => (
    <span key={path.id}>
      {path.organizationalHierarchyName.value} {path.name.value}
    </span>
  );

  const renderWithoutTooltip = () => {
    return (
      <>
        {renderPositionName()}
        {item.organizationalStructurePath.map(renderSingleRole)}
      </>
    );
  };

  const renderPathWithTooltip = () => (
    <>
      {renderPositionName()}
      <Tooltip
        title={
          <>
            {renderPositionName()}
            {item.organizationalStructurePath.map((path, i) => (
              <React.Fragment key={path.id}>
                {i !== 0 && ' > '}
                {renderSingleRole(path)}
              </React.Fragment>
            ))}
          </>
        }
      >
        <span style={{ cursor: 'pointer' }}>
          {renderSingleRole(item.organizationalStructurePath[0])} {' ... '}
          {renderSingleRole(
            item.organizationalStructurePath[item.organizationalStructurePath.length - 1],
          )}
        </span>
      </Tooltip>
    </>
  );

  return item.organizationalStructurePath.length > 2
    ? renderPathWithTooltip()
    : renderWithoutTooltip();
};

export { renderEmployeeRoles };
