import { Edge, Node } from 'reactflow';
import { WorkflowNode } from '@/workflow-builder/validations/workflowNode';

export interface IWorkflowNode {
  get id(): string;

  get isInputVisited(): boolean;

  get isOutputVisited(): boolean;

  connect(node: IWorkflowNode): void;

  addInput(node: IWorkflowNode): void;

  validateConnection():
    | {
        id: string;
        message: string;
      }
    | undefined;

  visitInputs(): void;

  visitOutputs(): void;
}

export class LazyInitMap<K, V> extends Map<K, V> {
  public constructor(private readonly initializer?: (key: K) => V) {
    super();
  }

  public get(key: K, initializer?: (key: K) => V): V {
    if (!this.has(key)) {
      if (initializer) {
        this.set(key, initializer(key));
      } else if (this.initializer) {
        this.set(key, this.initializer(key));
      } else {
        throw new Error('error');
      }
    }
    return super.get(key) as V;
  }
}

export class WorkFlowGraph {
  private readonly nodesMap: Map<string, IWorkflowNode>;

  public constructor(
    private readonly nodes: Node[],
    lines: Edge[],
  ) {
    this.nodesMap = new LazyInitMap<string, IWorkflowNode>((key) =>
      WorkflowNode.Create(nodes.find((step) => step.id === key)!),
    );
    for (const line of lines) {
      this.connect(line);
    }
  }

  private get startNode() {
    return this.getBy(this.nodes.find((node) => node.data._ === 'StartStatus')?.id);
  }

  private get endNodes(): IWorkflowNode[] {
    return this.nodes
      .filter((node) => node.data._ === 'CloseStatus')
      .map((node) => this.getBy(node?.id));
  }

  public validate():
    | {
        id: string;
        message: string;
      }
    | string[]
    | undefined {
    for (const step of this.nodes) {
      const s = this.getBy(step.id).validateConnection();
      if (s) return s;
    }

    this.endNodes.forEach((node) => {
      node.visitInputs();
    });
    this.startNode.visitOutputs();
    const invalidOutput = this.nodes.filter((node) => !this.getBy(node.id).isOutputVisited);

    if (invalidOutput?.length > 0) {
      return invalidOutput.map((node) => node.id);
    }

    const invalidInput = this.nodes.filter((node) => !this.getBy(node.id).isInputVisited);
    if (invalidInput?.length > 0) {
      return invalidInput.map((node) => node.id);
    }

    return undefined;
  }

  private connect(line: Edge): void {
    const source = this.getBy(line.source);
    const target = this.getBy(line.target);
    source.connect(target);
  }

  private getBy(id: string | undefined): IWorkflowNode {
    return this.nodesMap.get(id as string) as IWorkflowNode;
  }
}
