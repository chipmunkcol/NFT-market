import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const MainSpinner = () => {
  const { loadingState } = useContext(GlobalContext);
  const { isLoading, message } = loadingState;

  if (isLoading) {
    return (
      null
    )
  }
}

export default MainSpinner;