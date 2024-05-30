import { useContext, useEffect, useState, } from "react";
import { GlobalContext } from "../context/GlobalContext";

function useAsyncTask() {
  const { setLoadingState } = useContext(GlobalContext);
  // const [executeStatus, setExecuteStatus] = useState(false);

  /**
   * 
   * @param {Promise<*>} promise 
   * @param {string} message 로딩 창에 표시할 메시지
   * @returns {Promise<*>} promise function 결과 값
   */
  const handleWithLoading = async (promise, message) => {
    setLoadingState(prev => ({
      ...prev,
      isLoading: true, message: message
    }));
    try {
      const result = await promise();
      return result;
    } finally {
      setLoadingState(prev => ({
        ...prev,
        isLoading: false, message: ''
      }));
    }
  }

  return {
    handleWithLoading
  }
}

export default useAsyncTask;