import { Grid, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { updateElementProperties } from '@/state-management/slices/propertiesSlice';
import { textVariantProperties } from '@/public/data/otherData';

const HeadVariantSection = () => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state?.properties);
  const elementStyles =
    properties?.elementProperties[properties?.listId][properties?.currentIndex]?.properties;

  const handleTextVariant = (variant: any) => {
    dispatch(
      updateElementProperties({
        id: properties.id,
        uniqueName: `head-title-${properties.currentIndex}`,
        type: 'head-title',
        properties: {
          textVariant: variant,
        },
      }),
    );
  };

  return (
    <Stack spacing={1} direction="row" sx={{ width: '100%' }}>
      <Grid container spacing={1}>
        {textVariantProperties.map((textVariant) => (
          <Grid
            xs={6}
            key={textVariant.name}
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              height: '60px',
              cursor: 'pointer',
              '&:hover': {
                borderRadius: '12px',
                bgcolor: 'rgba(54,159,255, 0.2)',
              },
              bgcolor: elementStyles?.textVariant === textVariant.name ? 'primary.main' : 'none',
              borderRadius: '12px',
              transition: 'all 0.4s ease',
            }}
            onClick={() => handleTextVariant(textVariant.name)}
          >
            <Typography gutterBottom variant={textVariant.name}>
              {textVariant.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
export default HeadVariantSection;
