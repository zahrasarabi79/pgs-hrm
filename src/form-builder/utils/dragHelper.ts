import { v4 as uuid } from 'uuid';
import { Dispatch } from 'redux';
import { ISidebarPopoverItems, popoverItems } from '@/public/data/otherData';
import { addElementProperties, IPropertiesState } from '@/state-management/slices/propertiesSlice';

export const reorder = (
  list: Iterable<unknown> | ArrayLike<unknown>,
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const copy = (
  source: Iterable<unknown> | ArrayLike<unknown>,
  destination: Iterable<unknown> | ArrayLike<unknown>,
  droppableSource: { index: string | number },
  droppableDestination: { index: number },
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  // @ts-ignore
  const item = sourceClone[droppableSource.index];
  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

export const move = (
  source: Iterable<unknown> | ArrayLike<unknown>,
  destination: Iterable<unknown> | ArrayLike<unknown>,
  droppableSource: { index: number; droppableId: any },
  droppableDestination: { index: number; droppableId: any },
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  return {
    ...destination,
    [droppableSource.droppableId]: sourceClone,
    [droppableDestination.droppableId]: destClone,
  };
};

export const onDragEnd = (
  result: any,
  properties: IPropertiesState,
  elType: string,
  dispatch: Dispatch,
) => {
  const { source, destination } = result;

  if (!destination) {
    return;
  }
  let updatedLists;
  if (source.droppableId === destination.droppableId) {
    updatedLists = {
      ...properties?.elementProperties,
      [destination.droppableId]: reorder(
        properties?.elementProperties[destination.droppableId], // Pass the array of complex objects to reorder
        source.index,
        destination.index,
      ),
    };
  } else if (source.droppableId === 'popoverItems') {
    updatedLists = {
      ...properties?.elementProperties,
      [destination.droppableId]: copy(
        popoverItems.filter((item: ISidebarPopoverItems) => item.elType === elType),
        properties?.elementProperties[destination.droppableId],
        source,
        destination,
      ),
    };
  } else {
    updatedLists = move(
      properties?.elementProperties[source.droppableId],
      properties?.elementProperties[destination.droppableId],
      source,
      destination,
    );
  }
  // @ts-ignore
  dispatch(addElementProperties({ elementProperties: updatedLists }));
};
