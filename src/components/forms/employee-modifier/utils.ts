import { AddEmployeeReq, RoleData, employeeData } from '@/state-management/apis/types';
import { IEmployeeFormValue } from '@/types/form-types';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction } from 'react';
import { FileWithPath } from 'react-dropzone';
import { UseFormReset, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export const getFlattenTreeData = (data: any[], parentLabels: string[] = []) => {
  if (!data) {
    return [];
  }
  let roleItem: any[] = [];

  data?.forEach((item) => {
    const roleLabel = item.organizationalHierarchy.value + ' ' + item.name.value;
    const currentParents = [...parentLabels, roleLabel.trim()];

    item.roles.forEach((role: any) => {
      const x = { id: role.id, label: ` ${currentParents.join(' < ')} / ${role.name.value}` };
      roleItem.push(x);
    });

    if (item.subsets && item.subsets.length > 0) {
      const childRoles = getFlattenTreeData(item.subsets, currentParents);
      roleItem = roleItem.concat(childRoles);
    }
  });

  return roleItem;
};

export const renderPositionAndHierarchy = (role: RoleData) => {
  if (!role) return null;
  const organizationalStructurePath = role.organizationalStructurePath || [];
  const positionName = role.positionName?.value || '';
  const hierarchyPath = organizationalStructurePath
    .map((item) => item.name.value)
    .reverse()
    .join(' > ');
  return `${positionName} / ${hierarchyPath}`;
};

export const updateEmployeeHandler = (
  employeeData: employeeData,
  setValue: UseFormSetValue<IEmployeeFormValue>,
  mode: string,
  flattenedRoles: any[],
) => {
  if (mode === 'update' && employeeData) {
    setValue('name', employeeData?.firstname);
    setValue('lastname', employeeData?.lastname);
    setValue('gender', {
      name: employeeData?.gender === 'male' ? 'مرد' : 'زن',
      value: employeeData?.gender,
    });
    setValue(
      'role',
      employeeData?.roles?.map((role) => flattenedRoles.find((item) => item.id === role.id)) || [],
    );
    setValue('description', employeeData?.description?.value as string);
    setValue('image', employeeData?.profileImage as string);
  }
};

export const removeFileHandler = (
  watch: UseFormWatch<IEmployeeFormValue>,
  setValue: UseFormSetValue<IEmployeeFormValue>,
  removedFile: FileWithPath,
  setRemovedImage: Dispatch<SetStateAction<any>>,
) => {
  const image = watch('image') as File[];
  if (typeof image === 'string') setValue('image', [], { shouldDirty: true });
  else {
    setValue(
      'image',
      (image?.filter((file: FileWithPath) => file.name !== removedFile.name) as File[]) || [],
    );

    if (removedFile.size === 0) {
      // size == 0 items are old files (we should not consider the newly removed files that are unrelated to server pictures!)
      setRemovedImage((prevState: any) => [...prevState, removedFile.path as string]);
    }
  }
};

export const submitHandler = async (
  data: IEmployeeFormValue,
  uploadImage: MutationTrigger<any>,
  setProgress: Dispatch<SetStateAction<{ percent: number; progress: string }>>,
  mode: string,
  addEmployee: any,
  reset: UseFormReset<IEmployeeFormValue>,
  updateEmployee: any,
  employeeId: string,
  router: AppRouterInstance,
  setError: UseFormSetError<IEmployeeFormValue>,
) => {
  const { name, lastname, role, gender, image, description } = data;
  const roles = Array.isArray(role) ? role.map((rl) => rl.id) : [];
  let uploadResult: any | never; // returns array of image or error !
  let profileImage;
  if (Array.isArray(image) && image.length > 0 && image.every((item) => item instanceof File)) {
    uploadResult = await fileUploader(image as File[], uploadImage, setProgress);
    profileImage = uploadResult[0]; //adding or replacing new local image (create and update)
  } else if (Array.isArray(image) && image.length === 0) {
    profileImage = null; // we delete the image
  } else if (typeof image === 'string') {
    profileImage = undefined; // image already exist we send it again with no changes
  }

  const body: AddEmployeeReq = {
    firstname: name,
    lastname,
    gender: gender?.value,
    roles: roles as string[],
    description: description ? { _: 'StaticText', value: description } : undefined,
    profileImage,
  };
  if (uploadResult?.data && !uploadResult.data.success) {
    // if we receive error from upload-service
    if (uploadResult.data.data.message.includes('out of range')) {
      setError('image', { type: 'text', message: 'جحم عکس بیشتر از حجم مجاز است' });
    }
  } else {
    // continue the requests just in case the images has uploaded successfully
    if (mode === 'create') {
      const res = await addEmployee(body);
      res.data.success && reset();
    }
    if (mode === 'update') {
      await updateEmployee({
        body,
        id: employeeId as string,
      }).unwrap();
      router.back();
    }
  }
  setProgress({ progress: 'done', percent: 0 });
};

async function fileUploader(
  files: File[],
  uploadImage: any,
  setProgress: Dispatch<SetStateAction<{ percent: number; progress: string }>>,
) {
  const uploadFile = async (postURL: string, formData: FormData) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', postURL, true); //IMO
      // handling the progress percentage
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100;
          setProgress({ percent, progress: 'uploading' });
        }
      };
      xhr.onload = () => {
        if (xhr.status === 204) resolve();
        else reject(new Error());
      };
      xhr.send(formData);
    });
  };
  try {
    setProgress({ percent: 0, progress: 'uploading' });
    const results = await Promise.all(
      Array.from(files).map(async (file) => {
        const response = await uploadImage(file).unwrap();
        if (response.success) {
          const formData = new FormData();
          for (const x in response.data.formData) {
            formData.set(x, response.data.formData[x]);
          }
          formData.append('file', file as any);
          await uploadFile(response?.data.postURL, formData);
          return response.data.formData.key;
        }
      }),
    );

    return results;
    // this function always returns array of uuid of the images ; but in single image requests , we should just catch the [0] index
  } catch (error: any) {
    return error;
  }
}

export { fileUploader };
