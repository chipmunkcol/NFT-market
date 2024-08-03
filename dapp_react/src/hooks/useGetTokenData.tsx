import { useEffect, useState } from "react";
import { getIpfsTokenData } from "./common";

const useGetTokenData = (tokenUrl: string) => {
  const [tokenData, setTokenData] = useState({
    name: "",
    description: "",
    image: "",
    attributes: [{ trait_type: "", value: "" }],
  });

  useEffect(() => {
    async function fetchImageUrl() {
      if (tokenUrl) {
        const result = await getIpfsTokenData(tokenUrl);
        setTokenData(result);
      }
    }

    fetchImageUrl();
  }, [tokenUrl]);

  return tokenData;
};

export default useGetTokenData;
