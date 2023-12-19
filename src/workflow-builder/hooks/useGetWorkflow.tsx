import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { axiosInstance } from '@/workflow-builder/axiosInstance';

const useGetWorkflow = (url: string, isGetWorkflow: boolean) => {
  const [response, setResponse] = useState();
  const workflowId = Cookies.get('workflowId');

  const getWorkflow = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`${url}/${workflowId}`);
      setResponse(data);
    } catch (e) {}
  }, [workflowId, url]);

  useEffect(() => {
    if (workflowId && isGetWorkflow) {
      getWorkflow();
    }
  }, [getWorkflow, workflowId, isGetWorkflow]);

  return { response };
};

export default useGetWorkflow;
