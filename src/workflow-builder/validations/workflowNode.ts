import type { Node } from 'reactflow';
import { IWorkflowNode } from '@/workflow-builder/validations/workflowGraph';

export class WorkflowNode implements IWorkflowNode {
  private readonly step: Node;
  private readonly outputs: Array<IWorkflowNode>;
  private readonly inputs: Array<IWorkflowNode>;
  private inputVisited: boolean;
  private outputVisited: boolean;

  public constructor(step: Node) {
    this.step = step;
    this.outputs = [];
    this.inputs = [];
    this.inputVisited = false;
    this.outputVisited = false;
  }

  public get id(): string {
    return this.step.id;
  }

  public get isInputVisited(): boolean {
    return this.inputVisited;
  }

  public get isOutputVisited(): boolean {
    return this.outputVisited;
  }

  public static Create(step: Node): IWorkflowNode {
    return new this(step);
  }

  public getMinInput(node: Node) {
    switch (node.data._) {
      case 'StartStatus':
        return 0;
      case 'CloseStatus':
        return 1;
      case 'SquareStatus':
        return 1;
      case 'DiamondStatus':
        return 1;
      default:
        return 1;
    }
  }

  public getMinOutput(node: Node) {
    switch (node.data._) {
      case 'StartStatus':
        return 1;
      case 'CloseStatus':
        return 0;
      case 'SquareStatus':
        return 1;
      case 'DiamondStatus':
        return 1;
      default:
        return 1;
    }
  }

  public getMaxInput(node: Node) {
    switch (node.data._) {
      case 'StartStatus':
        return 0;
      case 'CloseStatus':
        return Number.MAX_VALUE;
      case 'SquareStatus':
        return Number.MAX_VALUE;
      case 'DiamondStatus':
        return Number.MAX_VALUE;
      default:
        return Number.MAX_VALUE;
    }
  }

  public getMaxOutput(node: Node) {
    switch (node.data._) {
      case 'StartStatus':
        return 1;
      case 'CloseStatus':
        return 0;
      case 'SquareStatus':
        return Number.MAX_VALUE;
      case 'DiamondStatus':
        return Number.MAX_VALUE;
      default:
        return 1;
    }
  }

  public connect(node: IWorkflowNode): void {
    this.outputs.push(node);
    node.addInput(this);
  }

  public addInput(node: IWorkflowNode): void {
    this.inputs.push(node);
  }

  public validateConnection():
    | {
        id: string;
        message: string;
      }
    | undefined {
    if (this.inputs.length < this.getMinInput(this.step)) {
      return { id: this.id, message: 'ورودی مرحله موردنظر را مشخص کنید' };
    }
    if (this.inputs.length > this.getMaxInput(this.step)) {
      return { id: this.id, message: 'نشه آقا نشه' };
    }
    if (this.outputs.length < this.getMinOutput(this.step)) {
      return {
        id: this.id,
        message: this.step.data._ !== 'CircleStatus' ? 'خروجی مرحله موردنظر را مشخص کنید' : '',
      };
    }
    if (this.outputs.length > this.getMaxOutput(this.step)) {
      return { id: this.id, message: 'نشه آقا نشه shishj' };
    }
  }

  public visitInputs(): void {
    if (!this.inputVisited) {
      this.inputVisited = true;
      for (const input of this.inputs) {
        input.visitInputs();
      }
    }
  }

  public visitOutputs(): void {
    if (!this.outputVisited) {
      this.outputVisited = true;
      for (const output of this.outputs) {
        output.visitOutputs();
      }
    }
  }
}
