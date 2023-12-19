import React, { FC } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from 'reactflow';
import { useAppContext } from '@/components/context/WorkflowProvider';
import { useAppDispatch } from '@/state-management/store/store';
import { setCloseModal, setOpenModal } from '@/state-management/slices/modalSlice';
import { Icon } from '@/components/shared';

interface EdgeData {
  value: number;
}

const CustomEdge: FC<EdgeProps<EdgeData>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  sourcePosition,
  targetPosition,
  targetY,
  markerEnd,
  style,
}) => {
  const { getEdge } = useReactFlow();

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edge = getEdge(id);
  const { checkedRoles } = useAppContext();
  const dispatch = useAppDispatch();

  const showRolesHandler = () => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <Card>
            <CardHeader
              title="نقش ها"
              action={
                <IconButton>
                  <Icon pathName="bold/close.svg" size={24} />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              {checkedRoles?.roles?.[edge?.id ?? ''].map((role: any) => (
                <div key={role.id}>
                  <p>{role.name}</p>
                </div>
              ))}
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => dispatch(setCloseModal())} size="small">
                بستن
              </Button>
            </CardActions>
          </Card>
        ),
        maxWidth: 'xs',
      }),
    );
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      {edge?.data && (
        <>
          <EdgeLabelRenderer>
            <Stack direction={'column'}>
              {edge.data.label && (
                <Typography
                  style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    backgroundColor: '#313030',
                    padding: '0 4px',
                    borderRadius: 5,
                    fontSize: '8px',
                    transition: 'transform 0.2s ease',
                  }}
                  variant="subtitle2"
                >
                  {edge.data.label}
                </Typography>
              )}
              {!!edge?.data?.trigger?.buttonLabel?.value?.length && (
                <Typography
                  style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${
                      !!edge?.data?.trigger?.roles?.length ? labelY - 60 : labelY - 30
                    }px)`,
                    backgroundColor: '#313030',
                    padding: '0 4px',
                    borderRadius: 5,
                    fontSize: '8px',
                    transition: 'transform 0.2s ease',
                  }}
                  variant="subtitle2"
                >
                  {edge?.data?.trigger?.buttonLabel?.value}
                </Typography>
              )}
              {!!edge?.data?.trigger?.form?.name?.length && (
                <Typography
                  style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${
                      !!edge?.data?.trigger?.roles?.length ? labelY - 60 : labelY - 30
                    }px)`,
                    backgroundColor: '#313030',
                    padding: '0 4px',
                    borderRadius: 5,
                    fontSize: '8px',
                    transition: 'transform 0.2s ease',
                  }}
                  variant="subtitle2"
                >
                  {edge?.data?.trigger?.form?.name}
                </Typography>
              )}
              {!!edge?.data?.trigger?.roles?.length && (
                <IconButton
                  style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY - 30}px)`,
                    backgroundColor: '#313030',
                    pointerEvents: 'all',
                    transition: 'transform 0.2s ease',
                  }}
                  onClick={() => showRolesHandler()}
                >
                  <Icon pathName="linear/user.svg" size={14} />
                </IconButton>
              )}
            </Stack>
          </EdgeLabelRenderer>
        </>
      )}
    </>
  );
};

export default CustomEdge;
