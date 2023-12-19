import React, { FC, useState } from 'react';
import { Control, FieldErrors, FieldValues, UseFormWatch } from 'react-hook-form';
import { Box, Fade, Grid, IconButton, Stack } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { deleteElementProperties, setElementInfo } from '@/state-management/slices/propertiesSlice';
import renderElement from '@/form-builder/elements/renderElement';

export interface IItem {
  id: string;
  type: string;
}

export interface ViewProps {
  control: Control<FieldValues, any>;
  item: IItem;
  index: number;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<any>;
}

const Element: FC<ViewProps> = ({ control, item, index, errors, watch }) => {
  const [showActions, setShowActions] = useState(false);
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);

  return (
    <Grid
      item
      xl={Number(
        properties?.elementProperties[properties?.listId][index]?.properties?.inputFlex || 12,
      )}
      md={6}
      xs={12}
    >
      <Draggable draggableId={item.id} index={index}>
        {(provided) => (
          <Box
            key={item.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              pt: 2,
              userSelect: 'none',
              boxShadow:
                index === properties?.currentIndex
                  ? '-7px 7px 10px 2px rgba(54,159,255, 0.2)'
                  : 'none',
            }}
            onMouseEnter={() => setShowActions(true)}
            onMouseMove={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                setElementInfo({
                  propertyType: item.type,
                  id: item.id,
                  currentIndex: index,
                }),
              );
            }}
          >
            <Fade in={showActions}>
              <Stack direction="row" sx={{ position: 'absolute', top: '-15px', right: 0 }}>
                <IconButton size="small" {...provided.dragHandleProps}>
                  <OpenWithIcon />
                </IconButton>
                <IconButton size="small" onClick={() => dispatch(deleteElementProperties(item.id))}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Fade>
            {renderElement({ item, control, index, errors, watch })}
          </Box>
        )}
      </Draggable>
    </Grid>
  );
};

export default Element;
