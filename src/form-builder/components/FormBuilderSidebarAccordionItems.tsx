import React, { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AccordionDetails, Box, Paper } from '@mui/material';
import { popoverItems } from '@/public/data/otherData';

const FormBuilderSidebarAccordionItems: FC<{ elTypes: string }> = ({ elTypes }) => {
  return (
    <AccordionDetails sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, .125)' }}>
      <Droppable droppableId="popoverItems">
        {(provided, _snapshot) => (
          <Box sx={{ width: '100%' }} ref={provided.innerRef}>
            {popoverItems
              .filter((popoverItem) => popoverItem.elType === elTypes)
              .map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <React.Fragment>
                      <Paper
                        sx={{
                          display: 'flex',
                          userSelect: 'none',
                          padding: '0.5rem',
                          margin: '0 0 0.5rem 0',
                          alignItems: 'flex-start',
                          alignContent: 'flex-start',
                          lineHeight: 1.5,
                          borderRadius: '3px',
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.type}
                      </Paper>
                      {snapshot.isDragging && (
                        <Paper
                          elevation={12}
                          sx={{
                            display: 'flex',
                            userSelect: 'none',
                            padding: '0.5rem',
                            margin: '0 0 0.5rem 0',
                            alignItems: 'flex-start',
                            alignContent: 'flex-start',
                            lineHeight: 1.5,
                            borderRadius: '3px',
                          }}
                        >
                          {item.type}
                        </Paper>
                      )}
                    </React.Fragment>
                  )}
                </Draggable>
              ))}
          </Box>
        )}
      </Droppable>
    </AccordionDetails>
  );
};
export default FormBuilderSidebarAccordionItems;
