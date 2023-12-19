import { Edge, Node, XYPosition } from 'reactflow';

interface ILines {
  sourceId: string;
  targetId: string;
  trigger: {
    _: 'NextTrigger' | 'FormTrigger' | 'AutoTrigger';
    roles: string[];
    buttonLabel?: {
      _: 'StaticText';
      value: string;
    };
    formId: string;
  };
  label: ILabel | undefined;
}

interface ISteps {
  _: string;
  id: string;
  position: XYPosition;
  size: ISize;
  typeId: string;
}

interface ISize {
  width: number;
  height: number;
}

interface ILabel {
  _: string;
  value: string;
}

export interface AddFlowReq {
  trigger: {
    _: 'RolesStartTrigger';
    roles: string[];
  };
  startStatusId: string;
  transitions: ILines[];
  statuses: ISteps[];
  name: ILabel;
}

export interface IOneWorkflow {
  data: AddFlowReq;
}

export interface IFormValues {
  nodes: Node[];
  edges: Edge[];
}
