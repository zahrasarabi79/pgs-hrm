/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function CollapsedBreadcrumbs({ items }: { items: any[] }) {
  if (items) {
    return (
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs separator=">" maxItems={1} aria-label="breadcrumb">
          {items.map((item) => (
            <div key={item.id}>
              <Typography fontSize={14} color={'white'}>
                {` ${item.organizationalHierarchyName.value} ${item.name.value}` || 'سطح اول'}
              </Typography>
            </div>
          ))}
        </Breadcrumbs>
        {items === null && 'سطح اول'}
      </div>
    );
  }
}
