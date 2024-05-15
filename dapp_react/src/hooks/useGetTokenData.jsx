import { useEffect, useState } from "react";
import { getImageUrl, getIpfsTokenData } from "./common";

const useGetTokenData = tokenUrl => {
  const [tokenData, setTokenData] = useState('');
  useEffect(() => {
    async function fetchImageUrl() {
      if (tokenUrl) {
        const result = await getIpfsTokenData(tokenUrl);
        const imageUrl = getImageUrl(result.image)
        setTokenData({ ...result, image: imageUrl });
      }
    }

    fetchImageUrl();
  }, [tokenUrl]);

  return tokenData;
}

export default useGetTokenData;