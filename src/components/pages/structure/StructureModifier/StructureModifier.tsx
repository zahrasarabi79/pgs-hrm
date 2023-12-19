import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAddStructureMutation,
  useAddStructureWithSubsetMutation,
  useGetStructureTreeQuery,
  useUpdateStructureMutation,
} from '@/state-management/apis/structureApi';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { HierarchiesRes, StructureRes, StructuresTreeData } from '@/state-management/apis/types';
import { AutoComplete, DropzoneComponent, MainCard, ProgressBar } from '@/components/shared';
import { useRouter } from 'next/navigation';
import { StructureModifierFormProps } from '@/types/component-types';
import { useGetHierarchiesBriefQuery } from '@/state-management/apis/hierarchyApi';
import {
  flattenedHierarchies,
  getFlattenTreeData,
  initializeFormData,
  submitHandler,
} from '@/components/pages/structure/StructureModifier/utils';
import { setOpenModal } from '@/state-management/slices/modalSlice';
import { useAppDispatch } from '@/state-management/store/store';
import { Icon } from '@/components/shared';
import AddHierarchyModal from '@/components/modals/AddHierarchyModal';
import { StructureModifierFormValues } from '@/types/form-types';
import DropzoneProfileBox from '@/components/shared/dropzone/DropzoneProfileBox';
import DropzoneErrorMessage from '@/components/shared/dropzone/DropzoneErrorMessage';
import { useUploadLogoImageMutation } from '@/state-management/apis/uploadFileApi';

const StructureModifierForm: FC<StructureModifierFormProps> = ({
  mode,
  StructureId,
  structureData,
}) => {
  const [progress, setProgress] = useState({ percent: 0, progress: 'done' });
  const [addStructure, { isLoading: createLoading }] = useAddStructureMutation();
  const [addStructureWithSubset, { isLoading: createWithSubsetLoading }] =
    useAddStructureWithSubsetMutation();
  const [updateStructure, { isLoading: UpdateLoading, isSuccess }] = useUpdateStructureMutation();
  const { data: structureTreeData } = useGetStructureTreeQuery();

  const { data: hierarchiesData } = useGetHierarchiesBriefQuery();
  const dispatch = useAppDispatch();
  const [uploadImage] = useUploadLogoImageMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    formState,
    watch,
    setError,
    clearErrors,
  } = useForm<StructureModifierFormValues>({ mode: 'onChange' });
  const router = useRouter();

  const selectedHierarchyRank =
    (watch('hierarchy') && watch('hierarchy')[0]?.rank) ?? Number.MAX_SAFE_INTEGER;
  const flattenedData = useMemo(() => {
    return getFlattenTreeData(
      structureTreeData?.data as StructuresTreeData[],
      selectedHierarchyRank,
      StructureId,
    );
  }, [structureTreeData, StructureId, selectedHierarchyRank]);
  useEffect(() => {
    initializeFormData(reset, structureData as StructureRes, mode, flattenedData);
  }, [structureData, mode, reset, flattenedData]);

  const flattenedHierarchiesData = flattenedHierarchies(hierarchiesData as HierarchiesRes);
  const props = {
    optionName: 'label',
    formSubmitted: formState.isSubmitted,
    watch,
    setValue,
    register,
  };
  useEffect(() => {
    // back-end does not send response for patch request
    // this is why we cant check the success from response in submit functions
    isSuccess && router.replace('/management-of-organizational-structure/structure-list');
  }, [isSuccess, router]);
  const submit = async (data: StructureModifierFormValues) => {
    await submitHandler(
      data,
      mode,
      reset,
      addStructure,
      addStructureWithSubset,
      updateStructure,
      StructureId as string,
      uploadImage,
      setProgress,
      setError,
    );
  };
  const handleOpenModal = () => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard closeBtn={true} cardStyles={{ px: 2, pb: 2 }} title="ایجاد سلسله مراتب">
            <AddHierarchyModal />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };
  const removeFile = () => {
    setValue('image', [], { shouldDirty: true });
    clearErrors('image');
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2} justifyContent={'end'}>
          <Grid item xs={12} md={6}>
            <AutoComplete
              noOptionsText={
                <Stack
                  width={'100%'}
                  direction={'column'}
                  justifyContent={'left'}
                  gap={2}
                  alignItems={'center'}
                >
                  <Typography> موردی یافت نشد</Typography>
                  <IconButton onClick={handleOpenModal}>
                    <Icon pathName="linear/add-square.svg" />
                  </IconButton>
                </Stack>
              }
              label="سلسله مراتب"
              additionalKeys={['rank']}
              dataList={(flattenedHierarchiesData as any) || []}
              name="hierarchy"
              errors={Boolean(errors.hierarchy?.message)}
              errorMessage={errors.hierarchy?.message as string}
              {...props}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="نام *"
              fullWidth
              variant="outlined"
              type="text"
              inputProps={{
                maxLength: 20,
              }}
              error={Boolean(errors.name?.message)}
              helperText={Boolean(errors.name?.message) && (errors.name?.message as string)}
              {...register('name', {
                required: 'این فیلد الزامی است',
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <AutoComplete
              noOptionsText="موردی یافت نشد "
              label=" جایگاه سازمانی"
              dataList={(flattenedData as any) || []}
              name="subset"
              errors={Boolean(errors.subset?.message)}
              errorMessage={errors.subset?.message as string}
              {...props}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              label="توضیحات *"
              fullWidth
              multiline
              maxRows={3}
              variant="outlined"
              type="text"
              inputProps={{
                maxLength: 200,
                style: {
                  height: 180,
                },
              }}
              error={Boolean(errors.description?.message)}
              helperText={
                Boolean(errors.description?.message) && (errors.description?.message as string)
              }
              {...register('description', {})}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction={'column'} sx={{ height: '100%' }} gap={1}>
              <DropzoneProfileBox
                watch={watch}
                removeFile={removeFile}
                inputName="image"
                errors={errors}
              />
              <div style={{ height: '100%', display: 'flex' }}>
                <DropzoneComponent
                  setValue={setValue}
                  register={register}
                  watch={watch}
                  label="بارگذاری عکس لوگو"
                  inputName="image"
                  disabled={false}
                />
              </div>
              {progress.progress === 'uploading' && <ProgressBar progress={progress.percent} />}
              <DropzoneErrorMessage watch={watch} errors={errors} inputName="image" />
            </Stack>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              endIcon={
                (progress.progress === 'uploading' ||
                  createLoading ||
                  createWithSubsetLoading ||
                  UpdateLoading) && <CircularProgress size={12} color="primary" />
              }
              fullWidth
              disabled={
                progress.progress === 'uploading' ||
                createLoading ||
                UpdateLoading ||
                !formState.isDirty
              }
              variant="contained"
              color="primary"
              type="submit"
            >
              ثبت
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default StructureModifierForm;
