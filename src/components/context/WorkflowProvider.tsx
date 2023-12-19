'use client';
import { createContext, CSSProperties, FC, useContext, useEffect, useState } from 'react';
import { IOneWorkflow } from '@/types/workflow-builder/formAdaptore';
import {
  Directions,
  IAppContext,
  ICheckedRoles,
  IOpenSnackbar,
} from '@/types/workflow-builder/workflowProvider';
import { ChildrenProps } from '@/components/shared/ITypes';

export const NodeContext = createContext<IAppContext>({
  nodeShape: '',
  nodeStyle: undefined,
  edgeLabel: '',
  nodeName: '',
  layoutDirection: 'LR',
  errorMessageNode: '',
  graphError: { id: '', message: '' },
  oneWorkflow: undefined,
  openSnackbar: undefined,
  setNodeShape: () => '',
  setNodeStyle: () => undefined,
  setEdgeLabel: () => '',
  setNodeName: () => '',
  setLayoutDirection: () => '',
  setErrorMessageNode: () => '',
  setGraphError: () => undefined,
  setOneWorkflow: () => undefined,
  setOpenSnackbar: () => undefined,
  setCheckedRoles: () => undefined,
  checkedRoles: { roles: {} },
  triggerType: '',
  setTriggerType: () => '',
  form: '',
  setForm: () => '',
  nextButtonLabel: '',
  setNextButtonLabel: () => '',
});

export const AppProvider: FC<ChildrenProps> = ({ children }) => {
  const [nodeStyle, setNodeStyle] = useState<CSSProperties>();
  const [triggerType, setTriggerType] = useState<string>('');
  const [form, setForm] = useState<string>('');
  const [nextButtonLabel, setNextButtonLabel] = useState<string>('');
  const [nodeShape, setNodeShape] = useState<string>('');
  const [nodeName, setNodeName] = useState<string>('');
  const [edgeLabel, setEdgeLabel] = useState<string>('');
  const [layoutDirection, setLayoutDirection] = useState<Directions>('LR');
  const [checkedRoles, setCheckedRoles] = useState<ICheckedRoles>({ roles: {} });
  const [graphError, setGraphError] = useState<{
    id: string;
    message: string;
  }>({ id: '', message: '' });
  const [errorMessageNode, setErrorMessageNode] = useState('');
  const [oneWorkflow, setOneWorkflow] = useState<IOneWorkflow | undefined>(undefined);
  const [openSnackbar, setOpenSnackbar] = useState<IOpenSnackbar | undefined>({
    open: false,
    message: '',
    color: 'success',
  });

  useEffect(() => {
    if (openSnackbar?.open) {
      setTimeout(() => {
        setOpenSnackbar({ open: false });
      }, 3000);
    }
  }, [openSnackbar?.open]);

  return (
    <NodeContext.Provider
      value={{
        nodeStyle,
        setNodeStyle,
        nodeShape,
        setNodeShape,
        edgeLabel,
        nodeName,
        setEdgeLabel,
        setNodeName,
        layoutDirection,
        setLayoutDirection,
        errorMessageNode,
        graphError,
        setErrorMessageNode,
        setGraphError,
        oneWorkflow,
        setOneWorkflow,
        setOpenSnackbar,
        openSnackbar,
        checkedRoles,
        setCheckedRoles,
        setTriggerType,
        triggerType,
        form,
        setForm,
        nextButtonLabel,
        setNextButtonLabel,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export const useAppContext = () => useContext(NodeContext);
