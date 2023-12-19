import React, { FC, useEffect } from 'react';
import { Button, IconButton, Paper, Stack, TextField } from '@mui/material';
import { useReactFlow } from 'reactflow';
import { useAppContext } from '@/components/context/WorkflowProvider';
import { EdgeContextMenuProps } from '@/types/workflow-builder/contextMenus';
import { Icon } from '@/components/shared';
import RoleTree from '@/workflow-builder/workflow-components/RoleTree';
import TriggerType from '@/workflow-builder/workflow-components/TriggerType';
import SelectForm from '@/workflow-builder/workflow-components/SelectForm';
import NextButtonLabel from '@/workflow-builder/workflow-components/NextButtonLabel';
import { v4 as uuid } from 'uuid';

//box
const EdgeContextMenu: FC<EdgeContextMenuProps> = ({
  setEdgeMenu,
  id,
  top,
  left,
  right,
  bottom,
}) => {
  const { setEdges, getEdge, getNodes } = useReactFlow();

  const nodes = getNodes();

  const edge = getEdge(id);
  const {
    setEdgeLabel,
    edgeLabel,
    triggerType,
    checkedRoles,
    nextButtonLabel,
    form,
    setForm,
    setNextButtonLabel,
    setTriggerType,
  } = useAppContext();

  useEffect(() => {
    if (!!edge?.data?.label?.length) {
      setEdgeLabel(edge.data.label);
    }
    if (!!edge?.data?.trigger?._) {
      setTriggerType(edge?.data?.trigger?._);
    }
    if (!!edge?.data?.trigger?.buttonLabel?.value) {
      setNextButtonLabel(edge?.data?.trigger?.buttonLabel?.value);
    }
    if (!!edge?.data?.trigger?.form?.name) {
      setForm(edge?.data?.trigger?.form?.name);
    }
  }, [setEdgeLabel, setTriggerType, setNextButtonLabel, setForm]);

  const buttonLabel = {
    _: 'StaticText',
    value: nextButtonLabel,
  };

  useEffect(() => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === id) {
          edge.data = {
            ...edge.data,
            label: edgeLabel,
            trigger:
              nodes[0]?.id === edge?.source
                ? {
                    _: 'RolesStartTrigger',
                    roles: checkedRoles.roles[id]?.map((role) => role.id),
                  }
                : triggerType === 'NextTrigger'
                  ? {
                      _: triggerType,
                      roles: checkedRoles.roles[id]?.map((role) => role.id),
                      buttonLabel,
                    }
                  : triggerType === 'FormTrigger'
                    ? {
                        _: triggerType,
                        roles: checkedRoles.roles[id]?.map((role) => role.id),
                        form: { formId: uuid(), name: form },
                      }
                    : { _: triggerType },
          };
        }
        return edge;
      }),
    );
  }, [id, edgeLabel, setEdges, form, nextButtonLabel, checkedRoles, triggerType]);

  const handleSetLabel = (e: any) => {
    setEdgeLabel(e.target.value);
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
        minWidth: '20vw',
        transition: 'all 3s ease',
      }}
    >
      <Stack spacing={2}>
        <Stack justifyContent={'space-between'} direction={'row'}>
          <IconButton
            onClick={() => {
              setEdgeMenu(null);
              setEdgeLabel('');
              setForm('');
              setNextButtonLabel('');
              setTriggerType('');
            }}
          >
            <Icon pathName={'linear/close.svg'} />
          </IconButton>
        </Stack>
        {nodes[0]?.id !== edge?.source && <TriggerType />}
        {nodes[0]?.id !== edge?.source && triggerType === 'FormTrigger' && <SelectForm />}
        {nodes[0]?.id !== edge?.source && triggerType === 'NextTrigger' && <NextButtonLabel />}
        {triggerType === 'NextTrigger' ||
        triggerType === 'FormTrigger' ||
        nodes[0]?.id === edge?.source ? (
          <RoleTree edge={edge} />
        ) : null}
        <TextField
          multiline
          size="small"
          type="text"
          label="توضیحات"
          value={edgeLabel}
          onChange={(e) => handleSetLabel(e)}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setEdgeMenu(null);
            setEdgeLabel('');
            setForm('');
            setNextButtonLabel('');
            setTriggerType('');
          }}
        >
          ثبت
        </Button>
      </Stack>
    </Paper>
  );
};

export default EdgeContextMenu;
