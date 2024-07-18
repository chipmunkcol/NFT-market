import { useEffect, useState } from "react";
import { getImageUrl, getIpfsTokenData } from "./common";

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
        const imageUrl = getImageUrl(result.image);
        setTokenData({ ...result, image: imageUrl });
      }
    }

    fetchImageUrl();
  }, [tokenUrl]);

  return tokenData;
};

export default useGetTokenData;
