import React, { FC, useCallback, useEffect } from 'react';
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useReactFlow } from 'reactflow';
import { useForm } from 'react-hook-form';
import { NodeContextMenuProps } from '@/types/workflow-builder/contextMenus';
import { useAppContext } from '@/components/context/WorkflowProvider';
import AutoCompleteComponent from '@/components/shared/AutoComplete';
import { useGetWorkflowStatusBriefQuery } from '@/state-management/apis/workflowApi';
import Loading from '@/components/shared/Loading';
import { Icon } from '@/components/shared';

interface StatusFormData {
  status: { label: string; id: string }[];
}

const NodeContextMenu: FC<NodeContextMenuProps> = ({
  setNodeMenu,
  id,
  top,
  left,
  right,
  bottom,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    formState,
    watch,
  } = useForm<StatusFormData>({ mode: 'onChange' });
  const { getNode, setNodes, setEdges } = useReactFlow();
  const { setNodeName, nodeName } = useAppContext();
  const node = getNode(id);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes?.filter((node) => node.id !== id));
    setEdges((edges) => edges?.filter((edge) => edge.source !== id));
    setNodeMenu(null);
  }, [setNodes, setEdges, setNodeMenu, id]);

  useEffect(() => {
    if (!!node?.data.label?.length) {
      setNodeName(node.data.label);
    }
  }, [setNodeName, node]);

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            status: watch('status')[0],
          };
        }
        return node;
      }),
    );
  }, [id, nodeName, setNodes]);
  const props = {
    optionName: 'label',
    formSubmitted: formState.isSubmitted,
    watch,
    setValue,
    register,
  };
  const { data, isLoading: getStatusesLoading } = useGetWorkflowStatusBriefQuery();

  const submit = (e: any) => {
    e.preventDefault();
  };
  const transformData = (data: Record<any, any>[]) => {
    return data?.map((item) => ({
      label: item.name.value,
      id: item.id,
    }));
  };
  let statusNames = transformData(data?.data as unknown as any);
  const handleSetStatusBtn = () => {
    setNodeName(watch('status')[0]?.label);
    setTimeout(() => {
      setNodeMenu(null);
      setNodeName('');
    }, 100);
  };

  return (
    <Paper
      style={{
        position: 'absolute',
        padding: '12px',
        borderRadius: 12,
        zIndex: 10,
        top: top as number,
        left: left as number,
        right: right as number,
        bottom: bottom as number,
        // height: "-webkit-fill-available",
        minWidth: '400px',
      }}
    >
      <Stack spacing={1}>
        {node?.data?._ !== 'EndStep' && (
          <>
            <Stack justifyContent={'space-between'} direction={'row'}>
              <IconButton onClick={() => setNodeMenu(null)}>
                <Icon pathName={'linear/close.svg'} size={36} />
              </IconButton>
              <Typography color="primary"> وضعیت </Typography>
            </Stack>
            <form onSubmit={submit}>
              <AutoCompleteComponent
                noOptionsText={getStatusesLoading ? <Loading height={'10vh'} /> : 'موردی یافت نشد'}
                label=" نام وضعیت"
                dataList={(statusNames as any) || []}
                name="status"
                errors={Boolean(errors.status?.message)}
                errorMessage={errors.status?.message as string}
                {...props}
              />
              <Stack direction="row" gap={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={(_) => {
                    handleSetStatusBtn();
                  }}
                >
                  ثبت
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={(_) => {
                    deleteNode();
                  }}
                >
                  حذف
                </Button>
              </Stack>
            </form>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default NodeContextMenu;
