import dynamic from 'next/dynamic';

const FormBuilder = dynamic(() => import('@/form-builder/FormBuilder'), { ssr: false });

const FormBuilderPage = () => {
  return <FormBuilder />;
};
export default FormBuilderPage;
