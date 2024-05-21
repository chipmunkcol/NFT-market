import { useContext, } from "react";
import { GlobalContext } from "../context/GlobalContext";

function useAsyncTask() {
  const { setLoadingState } = useContext(GlobalContext);
  // const [executeState, setExecuteStatus] = useState({

  // });
  /**
   * 
   * @param {Promise<*>} promise 
   * @param {string} message 로딩 창에 표시할 메시지
   * @returns {Promise<*>} promise function 결과 값
   */
  const handleWithLoading = async (promise, message) => {
    setLoadingState({ isLoading: true, message });
    const result = await promise;
    setLoadingState({ isLoading: false, message: "" });
    return result;
  }

  return {
    handleWithLoading
  }
}

export default useAsyncTask;