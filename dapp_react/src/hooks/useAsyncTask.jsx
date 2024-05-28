import { useContext, useEffect, useState, } from "react";
import { GlobalContext } from "../context/GlobalContext";

function useAsyncTask() {
  const { setLoadingState } = useContext(GlobalContext);
  const [executeStatus, setExecuteStatus] = useState({
    isExecuting: false,
    message: '',
  });

  /**
   * 
   * @param {Promise<*>} promise 
   * @param {string} message 로딩 창에 표시할 메시지
   * @returns {Promise<*>} promise function 결과 값
   */
  const handleWithLoading = async (promise, message) => {
    setExecuteStatus({
      isExecuting: true,
      message,
    });
    const result = await promise();
    setExecuteStatus({
      isExecuting: false,
      message: '',
    });
    return result;
  }

  useEffect(() => {
    if (executeStatus.isExecuting) {
      setLoadingState({
        isLoading: executeStatus.isExecuting,
        message: executeStatus.message,
      });
    } else {
      setLoadingState({
        isLoading: executeStatus.isExecuting,
        message: '',
      });
    }
  }, [executeStatus]);

  return {
    handleWithLoading
  }
}

export default useAsyncTask;