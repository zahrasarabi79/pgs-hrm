import * as React from 'react';
import Box from '@mui/material/Box';
import { animated, useSpring } from '@react-spring/web';
import { TransitionProps } from '@mui/material/transitions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { alpha, styled } from '@mui/material/styles';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses, TreeItemProps } from '@mui/x-tree-view/TreeItem';
import { RoleTreeData } from '@/public/data/role-tree-data';
import { Checkbox, Stack } from '@mui/material';
import { useAppContext } from '@/components/context/WorkflowProvider';
import { useGetRolesTreeQuery } from '@/state-management/apis/roleApi';
import { Edge } from 'reactflow';
import { ICheckedRoles } from '@/types/workflow-builder/workflowProvider';
import Loading from '@/components/shared/Loading';

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

// eslint-disable-next-line react/display-name
const CustomTreeItem = React.forwardRef((props: TreeItemProps, ref: React.Ref<HTMLLIElement>) => (
  <TreeItem
    style={{ flexDirection: 'row-reverse' }}
    {...props}
    TransitionComponent={TransitionComponent}
    ref={ref}
  />
));

const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
  // textAlign: "start",
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 14,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  [`& .muirtl-wxnjbc-MuiTreeItem-content`]: {
    flexDirection: 'row-reverse',
  },
}));

const renderTreeItems = (
  nodes: RoleTreeData[],
  checkedRoles: ICheckedRoles,
  handleCheckboxChange: any,
  edge?: Edge<any>,
) => {
  return nodes.map((node) => (
    <StyledTreeItem
      key={node.id}
      nodeId={node.id}
      label={`${node.organizationalHierarchy.value} ${node.name.value}`}
    >
      {Array.isArray(node.subsets)
        ? renderTreeItems(node.subsets, checkedRoles, handleCheckboxChange, edge)
        : null}
      {Array.isArray(node.roles) &&
        node.roles.map((role) => (
          <div key={role.id}>
            <Stack
              sx={{
                transition: 'width 1s ease',
              }}
              direction={'row-reverse'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <StyledTreeItem nodeId={role.id} label={role.name.value} />
              <Checkbox
                size={'small'}
                checked={checkedRoles?.roles?.[edge?.id ?? '']?.some((item) => item.id === role.id)}
                onChange={(event) => handleCheckboxChange(event, role)}
                name={role.id.toString()}
              />
            </Stack>
          </div>
        ))}
    </StyledTreeItem>
  ));
};

interface RoleTreeProps {
  edge?: Edge<any>;
}

const RoleTree: React.FC<RoleTreeProps> = ({ edge }) => {
  const { checkedRoles, setCheckedRoles } = useAppContext();
  const { data, isLoading: getRoleTreeLoading } = useGetRolesTreeQuery();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, role: any) => {
    const { id } = edge as Edge<any>;

    if (event.target.checked) {
      setCheckedRoles((prevItems: ICheckedRoles) => ({
        ...prevItems,
        roles: {
          ...prevItems.roles,
          [id]: [...(prevItems.roles?.[id] || []), { id: role.id, name: role.name.value }],
        },
      }));
    } else {
      setCheckedRoles((prevItems: ICheckedRoles) => ({
        ...prevItems,
        roles: { [id]: [...prevItems.roles?.[id].filter((item) => item.id !== role.id)] },
      }));
    }
  };

  return (
    <Box
      sx={{
        overflowY: 'auto',
        overflowX: 'hidden',
        height: 'auto',
        maxHeight: '25vh',
        // ...styledScrollBar,
      }}
    >
      {getRoleTreeLoading ? (
        <Loading height={'8vh'} />
      ) : (
        <TreeView
          disableSelection={true}
          aria-label="customized"
          defaultExpanded={['1']}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronLeftIcon />}
        >
          {data?.data
            ? renderTreeItems(data?.data as any, checkedRoles, handleCheckboxChange, edge)
            : null}
        </TreeView>
      )}
    </Box>
  );
};

export default RoleTree;
