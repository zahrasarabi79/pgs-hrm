import { FC } from 'react';
import { Card, CardContent, CardHeader, Collapse, Divider } from '@mui/material';
import { ChildrenProps } from '@/components/shared/ITypes';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setElementInfo } from '@/state-management/slices/propertiesSlice';

const CardForm: FC<ChildrenProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const cardFormProperties = useAppSelector((state) => state?.cardFormProperties);
  return (
    <Card
      onClick={() => {
        dispatch(setElementInfo({ id: '', currentIndex: 0, propertyType: '' }));
      }}
      variant={cardFormProperties?.variant}
      elevation={cardFormProperties?.elevation}
      sx={{
        width: '100%',
        minHeight: '75vh',
        maxHeight: 'auto',
        borderRadius:
          !!cardFormProperties?.borderRadius &&
          cardFormProperties?.borderRadius >= 0 &&
          cardFormProperties?.borderRadius < 8
            ? cardFormProperties?.borderRadius
            : '8px',
        transition: 'all 0.5s ease',
      }}
    >
      <Collapse in={cardFormProperties?.isHeader}>
        <CardHeader
          title={cardFormProperties?.titleHeader}
          subheader={cardFormProperties?.subTitleHeader}
          sx={{ transition: 'all 0.5s ease' }}
        />
        <Divider />
      </Collapse>
      <CardContent sx={{ display: 'flex', pt: 4 }}>{children}</CardContent>
    </Card>
  );
};

export default CardForm;
