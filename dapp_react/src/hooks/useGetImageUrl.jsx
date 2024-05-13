import { useEffect, useState } from "react";
import { getImageUrl, getIpfsTokenData } from "./common";

const useGetImgaeUrl = tokenUrl => {
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    async function fetchImageUrl() {
      if (tokenUrl) {
        const result = await getIpfsTokenData(tokenUrl);
        const imageUrl = getImageUrl(result.image)
        setImageUrl(imageUrl);
      }
    }

    fetchImageUrl();
  }, [tokenUrl]);

  return imageUrl;
}

export default useGetImgaeUrl;