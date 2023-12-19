import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import {
  CloseSquare,
  MinusSquare,
  PlusSquare,
  StyledTreeItem,
} from '@/components/forms/role-modifier/TreeViewUtility';
import {
  useGetPermissionsQuery,
  useUpdatePermissionsMutation,
} from '@/state-management/apis/roleApi';
import { Button, Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import { Permissions } from '@/state-management/apis/types';

interface IData {
  isChecked: boolean;
  name: string;
  service: string;
}

// const getLastNestedChildren = (data: Permissions['data']): IData[] => {
//   const getLastChild = (node: any): IData => {
//     if (node.items && node.items.length > 0) {
//       return getLastChild(node.items[node.items.length - 1]);
//     }
//     return {
//       isChecked: false,
//       name: node.name,
//       service: node.service || '', // Adjust based on your data structure
//     };
//   };
//
//   const getLastNestedChildrenRecursive = (nodes: any): IData[] => {
//     return nodes?.map((node: any) => {
//       const lastChild = getLastChild(node);
//       if (node.items && node.items.length > 0) {
//         return [...getLastNestedChildrenRecursive(node.items), lastChild];
//       }
//       return lastChild;
//     });
//   };
//
//   return getLastNestedChildrenRecursive(data);
// };

const renderTreeItems = (
  nodes: any[],
  setCheckedItems: Dispatch<SetStateAction<IData[]>>,
  handleCheckboxChange: any,
  level = 0,
) => {
  const x = nodes?.map((node, index) =>
    node._ === 'PermissionGroupItem' ? (
      <StyledTreeItem key={node.name + level} nodeId={node.name + level} label={node.name}>
        {renderTreeItems(node.items, setCheckedItems, handleCheckboxChange, level + 1)}
      </StyledTreeItem>
    ) : (
      <FormGroup key={index + level}>
        <FormControlLabel
          control={
            <Checkbox
              checked={node.isChecked ? node.isChecked : node.selected || false}
              onChange={(event) => handleCheckboxChange(event, node.name, node._, index)}
              name={node.name}
            />
          }
          label={node.name}
        />
      </FormGroup>
    ),
  );
  return nodes?.some((item) => item._ === 'PermissionGroupItem') ? (
    x
  ) : (
    <Stack direction={'row'}>{x}</Stack>
  );
};

/*
interface ISelected {
  name: string;
  service: string;
}
*/

/*
interface AccessLevelFormValues {
  formCheckedItems: {
    selected: ISelected[];
  };
}
*/
const AccessLevelForm = () => {
  const [items, setItems] = useState<Permissions['data']>([]);
  const [checkedItems, setCheckedItems] = useState([]);

  // const { handleSubmit } = useForm<AccessLevelFormValues>();

  const { roleId } = useParams();

  const { data: permissionData } = useGetPermissionsQuery(roleId as string);

  const [updatePermissions] = useUpdatePermissionsMutation();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, nodeName: string) => {
    setItems((prevCheckedItems) => {
      const updatedItems = updateCheckedState([...prevCheckedItems]);
      console.log('Updated State:', updatedItems); // Log the updated state
      return updatedItems;
    });

    // Recursive function to update the checked state
    const updateCheckedState = (items: any[]): any[] => {
      return items.map((item) => {
        if (item._ === 'PermissionGroupItem') {
          return {
            ...item,
            items: updateCheckedState([...item.items]),
          };
        } else if (item.name === nodeName) {
          if (event.target.checked) {
            setCheckedItems((prevState: any) => [...prevState, item] as any);
          } else {
            setCheckedItems((prevState) => [
              ...prevState.filter((state: any) => state.name !== nodeName),
            ]);
          }
          return {
            ...item,
            isChecked: event.target.checked,
          };
        }
        return item;
      });
    };
  };

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // @ts-ignore
    const newCheckedItems = [...new Set(checkedItems)];
    const selected = newCheckedItems.map((item) => ({
      name: item.name,
      service: item.service,
    }));

    await updatePermissions({ selected, roleId: roleId as string }).unwrap();
  };

  useEffect(() => {
    setItems(permissionData?.data as Permissions['data']);
  }, [permissionData?.data]);

  return (
    <form onSubmit={submit}>
      <Box sx={{ minHeight: 270, flexGrow: 1, height: '62vh', overflow: 'auto' }}>
        <TreeView
          multiSelect
          aria-label="customized"
          defaultExpanded={['root']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          sx={{ overflow: 'hidden' }}
        >
          {permissionData?.data
            ? renderTreeItems(items, setItems as any, handleCheckboxChange)
            : null}
        </TreeView>
      </Box>
      <Box sx={{ textAlign: 'end' }}>
        <Button variant="contained" type="submit">
          ثبت
        </Button>
      </Box>
    </form>
  );
};

export default AccessLevelForm;
