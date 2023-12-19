import React, { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Grid } from '@mui/material';
import { Control, FieldErrors, UseFormWatch } from 'react-hook-form';
import { useAppSelector } from '@/state-management/store/store';
import Element from '@/form-builder/elements/Element';

export interface DroppableSectionProps {
  list: string;
  control: Control;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
}

const DroppableSection: FC<DroppableSectionProps> = ({ list, control, errors, watch }) => {
  const properties = useAppSelector((state) => state?.properties);
  return (
    <Droppable droppableId={list}>
      {(provided, snapshot) => (
        <div
          style={{
            minHeight: '65vh',
            backgroundColor: snapshot.isDraggingOver ? 'rgba(255,255,255,0.01)' : '',
            borderRadius: snapshot.isDraggingOver ? 6 : 0,
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Grid container spacing={3}>
            {properties.elementProperties[list]?.length ? (
              properties.elementProperties[list]?.map((item, index) => {
                return (
                  <Element
                    key={item.id}
                    control={control}
                    errors={errors}
                    item={item}
                    index={index}
                    watch={watch}
                  />
                );
              })
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '65vh',
                  transition: 'all 0.4s ease',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    bgcolor: 'background.paper',
                    border: '1px dashed gray',
                    borderRadius: 6,
                    ml: 3,
                  }}
                >
                  drag here
                </Box>
              </Box>
            )}
          </Grid>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default DroppableSection;
