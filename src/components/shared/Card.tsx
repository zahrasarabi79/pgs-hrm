'use client';
import React, { FC } from 'react';
import { Card, CardHeader, Divider, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCloseModal } from '@/state-management/slices/modalSlice';
import { CardComponentProps } from '@/components/shared/ITypes';
import Icon from '@/components/shared/Icon';

const CardComponent: FC<CardComponentProps> = ({
  title,
  subheader,
  cardStyles,
  children,
  action,
  divider,
  closeBtn = false,
}) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(setCloseModal());
  return (
    <Card sx={cardStyles} style={{ height: '100%' }} role="main-card">
      {closeBtn && (
        <IconButton
          onClick={handleCloseModal}
          sx={{
            scale: '1.4',
            position: 'absolute',
            top: 10,
            right: 0,
            margin: 1,
          }}
        >
          <Icon pathName="linear/close.svg" />
        </IconButton>
      )}

      {(title || subheader || action) && (
        <CardHeader
          sx={{ px: 0 }}
          titleTypographyProps={{
            fontSize: 20,
          }}
          title={title}
          subheader={subheader}
          action={action}
        />
      )}
      {divider && <Divider sx={{ mb: 2 }} />}
      {children}
    </Card>
  );
};

export default CardComponent;
