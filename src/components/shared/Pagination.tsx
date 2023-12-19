import React, { FC, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from 'next/navigation';
import { paginationComponentProps } from '@/components/shared/ITypes';
import useQueryParams from '@/components/hooks/useQueryParams';
import styled from 'styled-components';

const StyledPagination = styled(Pagination)(() => ({
  '& .Mui-selected': {
    backgroundColor: '#DBEAD9 !important',
    color: 'black',
  },
  '& .MuiPaginationItem-icon': {
    backgroundColor: '#fff !important',
    color: 'black',
    borderRadius: '50px',
  },
}));
const PaginationComponent: FC<paginationComponentProps> = ({ total }) => {
  const searchParams = useSearchParams()!;
  const [page, setPage] = useState<number>(parseInt(searchParams.get('page') || '1'));
  const pageCount = Math.ceil(total / 10);
  const updateQueryParams = useQueryParams();

  const paginateHandler = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    updateQueryParams({ page: value });
  };

  return (
    <StyledPagination role="pagination" count={pageCount} page={page} onChange={paginateHandler} />
  );
};

export default PaginationComponent;
