'use client';
import React from 'react';
import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import CardForm from '@/form-builder/elements/CardForm';
import DroppableSection from '@/form-builder/components/DroppableSection';
import { setListId } from '@/state-management/slices/propertiesSlice';
import BoxProperties from '@/form-builder/components/BoxProperties';

const FormBuilder = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const dispatch = useAppDispatch();
  const cardFormProperties = useAppSelector((state) => state?.cardFormProperties);
  const properties = useAppSelector((state) => state?.properties);

  const submit = (data: any) => {
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={properties.openProperties ? 9.5 : 12} sx={{ transition: 'all 0.4s ease' }}>
          <CardForm>
            <Grid container gap={2}>
              <Grid item xs={12} sx={{ minHeight: '65vh', height: 'auto' }}>
                {Object.keys(properties.elementProperties)?.map((list, _i) => {
                  dispatch(setListId({ listId: list }));
                  return (
                    <DroppableSection
                      watch={watch}
                      key={list}
                      list={list}
                      control={control}
                      errors={errors}
                    />
                  );
                })}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: cardFormProperties?.primaryButtonAlignment,
                  textAlign: cardFormProperties?.primaryButtonAlignment,
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => router.back()}
                  sx={{
                    display: cardFormProperties?.isCancelButton ? 'block' : 'none',
                    opacity: cardFormProperties?.isCancelButton ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                >
                  {cardFormProperties?.cancelButtonTitle}
                </Button>
                <Button type="submit" variant="contained" sx={{ transition: 'all 0.4s ease' }}>
                  {cardFormProperties?.primaryButtonTitle}
                </Button>
              </Grid>
            </Grid>
          </CardForm>
        </Grid>
        <Grid item xs={properties.openProperties ? 2.5 : 0}>
          <BoxProperties />
        </Grid>
      </Grid>
    </form>
  );
};

export default FormBuilder;
