import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { AlertColor } from '@mui/material';
import { IOneWorkflow } from '@/types/workflow-builder/formAdaptore';

export interface IGraphError {
  id: string;
  message: string;
}

export interface IOpenSnackbar {
  open: boolean;
  message?: string;
  color?: AlertColor;
}

export interface IAppContext {
  nodeStyle: CSSProperties | undefined;
  nodeShape: string;
  nodeName: string;
  edgeLabel: string;
  layoutDirection: 'TB' | 'LR';
  graphError: IGraphError;
  errorMessageNode: string;
  oneWorkflow: IOneWorkflow | undefined;
  openSnackbar: IOpenSnackbar | undefined;
  setNodeStyle: Dispatch<SetStateAction<CSSProperties | undefined>>;
  setNodeShape: Dispatch<SetStateAction<string>>;
  setNodeName: Dispatch<SetStateAction<string>>;
  setEdgeLabel: Dispatch<SetStateAction<string>>;
  setLayoutDirection: Dispatch<SetStateAction<'TB' | 'LR'>>;
  setGraphError: Dispatch<
    SetStateAction<{
      id: string;
      message: string;
    }>
  >;
  triggerType: string;
  setTriggerType: Dispatch<SetStateAction<string>>;
  form: string;
  setForm: Dispatch<SetStateAction<string>>;
  nextButtonLabel: string;
  setNextButtonLabel: Dispatch<SetStateAction<string>>;
  setErrorMessageNode: Dispatch<SetStateAction<string>>;
  setOneWorkflow: Dispatch<SetStateAction<IOneWorkflow | undefined>>;
  setOpenSnackbar: Dispatch<SetStateAction<IOpenSnackbar | undefined>>;
  setCheckedRoles: Dispatch<SetStateAction<ICheckedRoles>>;
  checkedRoles: ICheckedRoles;
}

export interface ICheckedRoles {
  // roles: Record<string, string[]>;
  roles: {
    [x: string]: { id: string; name: string }[];
  };
}

export interface INodeSizes {
  width: number;
  height: number;
}

export type Directions = 'TB' | 'LR';
