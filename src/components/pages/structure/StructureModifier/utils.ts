import { fileUploader } from '@/components/forms/employee-modifier/utils';
import {
  AddStructureReq,
  HierarchiesRes,
  StructureRes,
  StructuresTreeData,
} from '@/state-management/apis/types';
import { StructureModifierFormValues } from '@/types/form-types';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReset, UseFormSetError } from 'react-hook-form';

function map(
  result: any[],
  data: StructuresTreeData,
  path: any[],
  rank: number,
  selectedId?: string,
) {
  if (data.organizationalHierarchyRank > rank) {
    return;
  }
  if (data.id === selectedId) {
    return;
  }
  const label = {
    id: data.id,
    name: data.name,
    organizationalHierarchyName: data.organizationalHierarchy,
  };
  result.push({
    ...label,
    path,
  });
  for (const subset of data.subsets) {
    map(result, subset, [...path, label], rank, selectedId);
  }
}

function pathItemToString(item: any): string {
  return ` ${item.organizationalHierarchyName?.value} ${item.name?.value} `;
}

function pathToString(path: any[]): string {
  return path?.map((pathItem) => pathItemToString(pathItem)).join(' > ');
}

function getFlattenTreeData(
  tree: StructuresTreeData[],
  rank: number = Number.MAX_SAFE_INTEGER,
  selectedId?: string,
  withRoot: boolean = true,
) {
  const result = [];
  if (withRoot) {
    result.push({
      id: 'null',
      name: { _: 'StaticText', value: 'سطح اول' },
      organizationalHierarchyName: { _: 'StaticText', value: '' },
      path: [],
    });
  }
  if (tree)
    for (const item of tree) {
      map(result, item, [], rank, selectedId);
    }
  return result.map((item) => ({
    id: item.id,
    label: pathToString([...item.path, item]),
  }));
}

const flattenedHierarchies = (hierarchyData: HierarchiesRes) => {
  let result: any[] = [];
  if (hierarchyData) {
    hierarchyData?.data.map((item) =>
      result.push({
        label: item.name.value,
        id: item.id,
        rank: item.rank,
      }),
    );
  }
  return result;
};

export const initializeFormData = (
  reset: any,
  structureData: StructureRes,
  mode: string,
  flattenedData: { id: string; label: string }[],
) => {
  if (mode === 'update' && structureData && flattenedData) {
    const oneStructureTree = flattenedData.find(
      (item) => item.id === structureData.data.superiorId,
    );
    const formValues = {
      name: structureData.data.name.value,
      hierarchy: [
        {
          label: structureData.data.organizationalHierarchyName.value,
          id: structureData.data.organizationalHierarchyId,
          rank: structureData.data.organizationalHierarchyRank,
        },
      ],
      description: structureData.data.description?.value,
      subset: [oneStructureTree],
      image: structureData?.data.logo,
    };
    reset(formValues);
  }
};

export const submitHandler = async (
  data: StructureModifierFormValues,
  mode: string,
  reset: UseFormReset<StructureModifierFormValues>,
  addStructure: any,
  addStructureWithSubset: any,
  updateStructure: any,
  StructureId: string,
  uploadImage: MutationTrigger<any>,
  setProgress: Dispatch<SetStateAction<{ percent: number; progress: string }>>,
  setError: UseFormSetError<StructureModifierFormValues>,
) => {
  const { name, hierarchy, description, subset, image } = data;
  let uploadResult: any | never; // returns array of image or error !
  let logo;
  if (Array.isArray(image) && image.length > 0 && image.every((item) => item instanceof File)) {
    uploadResult = await fileUploader(image as File[], uploadImage, setProgress);
    logo = uploadResult[0]; //adding or replacing new local image (create and update)
  } else if (Array.isArray(image) && image.length === 0) {
    logo = null; // we delete the image
  } else if (typeof image === 'string') {
    logo = undefined; // image already exist we send it again with no changes
  }
  const body = {
    name: {
      _: 'StaticText',
      value: name,
    },
    description: {
      _: 'StaticText',
      value: description,
    },
    organizationalHierarchyId: hierarchy[0]?.id,
    logo,
  } as AddStructureReq;
  if (uploadResult?.data && !uploadResult.data.success) {
    // if we receive error from upload-service
    if (uploadResult.data.data.message.includes('out of range')) {
      setError('image', { type: 'text', message: 'جحم عکس بیشتر از حجم مجاز است' });
    }
  } else {
    // continue the requests just in case the images has uploaded successfully
    if (mode === 'create') {
      let result;
      if (subset[0].id === 'null') {
        const res1 = await addStructure(body).unwrap();
        result = res1;
      } else {
        const res2 = await addStructureWithSubset({ newStructure: body, id: subset[0].id });
        result = res2;
      }
      result.data.success && reset();
    }
    if (mode === 'update') {
      if (subset[0].id === 'null') {
        await updateStructure({
          ...body,
          id: StructureId as string,
          isRoot: true,
        }).unwrap();
      } else {
        await updateStructure({
          ...body,
          id: StructureId as string,
          superiorId: subset[0].id,
        }).unwrap();
      }
    }
  }
  setProgress({ progress: 'done', percent: 0 });
};

export { flattenedHierarchies, getFlattenTreeData, pathItemToString, pathToString };
