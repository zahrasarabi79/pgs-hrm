'use client';
import React, { FC } from 'react';
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import styled from '@emotion/styled';
import { TableComponentProps } from '@/components/shared/ITypes';
import PaginationComponent from '@/components/shared/Pagination';

const CustomTable: FC<TableComponentProps> = ({ tableHeadItems, children, total }) => {
  const theme = useTheme();
  const tableBodyStyles = {
    '& .MuiTableRow-root:nth-of-type(even)': {
      background: theme.palette.background.paper,
    },
  };

  const StyledTableContainer = styled(TableContainer)`
    border-radius: 8px;
    padding-bottom: 5.5rem;
    overflow: auto;

    & .MuiTableContainer-root {
      border-radius: 8px;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: #555555;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  `;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <StyledTableContainer sx={{ height: '73vh', borderRadius: '10px 10px 0 0' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeadItems.map((item) => (
                <TableCell
                  align={item.align}
                  key={item.title}
                  sx={{ width: item.width, minWidth: item.minWidth }}
                >
                  {item.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={tableBodyStyles}>{children}</TableBody>
        </Table>
      </StyledTableContainer>
      {!!total && (
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            p: 0.75,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'background.paper',
          }}
        >
          <PaginationComponent total={total} />
        </Stack>
      )}
    </Paper>
  );
};

export default CustomTable;
