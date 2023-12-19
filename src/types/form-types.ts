export interface StructureModifierFormValues {
  hierarchy: { label: string; id: string; rank: number }[];
  name: any;
  subset: { label: string; id: string }[];
  description: any;
  image: File[] | string; //when we select files from storages they are files 'when we get them from server they are string
}

export interface IEmployeeFormValue {
  name: string;
  lastname: string;
  gender: { name: string; value: 'male' | 'female' };
  image: File[] | string; //when we select files from storages they are files 'when we get them from server they are string
  role: { label: string; id: string }[];
  description: string;
}

export interface IUserFormValues {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}
