import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { GlobalContextType } from "../../type";

function useAsyncTask() {
  const { setLoadingState } = useContext(GlobalContext) as GlobalContextType;
  // const [executeStatus, setExecuteStatus] = useState(false);

  const handleWithLoading = async (
    promise: () => Promise<any>,
    message: string
  ) => {
    setLoadingState((prev) => ({
      ...prev,
      isLoading: true,
      message: message,
    }));
    try {
      const result = await promise();
      return result;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoadingState((prev) => ({
        ...prev,
        isLoading: false,
        message: "",
      }));
    }
  };

  return {
    handleWithLoading,
  };
}

export default useAsyncTask;
