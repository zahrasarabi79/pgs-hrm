import { Dispatch, SetStateAction } from 'react';
import { IMenuPopup } from '@/types/workflow-builder/popupMenu';

export interface NodeContextMenuProps extends IMenuPopup {
  setNodeMenu: Dispatch<SetStateAction<IMenuPopup | null>>;
}

export interface EdgeContextMenuProps extends IMenuPopup {
  setEdgeMenu: Dispatch<SetStateAction<IMenuPopup | null>>;
}
