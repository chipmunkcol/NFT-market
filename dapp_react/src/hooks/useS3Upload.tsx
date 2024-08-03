import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { useEffect, useRef } from "react";

const useS3Upload = () => {
  const clientRef = useRef<S3Client | null>(null);

  useEffect(() => {
    clientRef.current = new S3Client({
      region: "ap-northeast-2",
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: "ap-northeast-2" },
        identityPoolId: import.meta.env.VITE_AWS_S3_COGNITO_POOL_ID,
      }),
    });
  }, []);

  const uploadImageTos3 = async (path: string, file: File) => {
    // let result = false;
    if (!file) return;
    if (!clientRef.current) {
      console.error("S3 client is not initialized");
      return;
    }
    // const encodedName = Buffer.from(file.name).toString("base64");
    const ext = file.type.split("/")[1];
    const bucketParams = {
      Bucket: import.meta.env.VITE_AWS_S3_BUCKET_NAME,
      Key: `${path}.${ext}`, // 저장될 이름 ex) ipfsHash.jpg
      Body: file,
      ContentType: `image/${ext}`, // 지정하지 않으면 브라우저창에서 열지않고 다운로드 받는다!
      // ACL: "public-read",
    };

    try {
      const command = new PutObjectCommand(bucketParams);
      const response = await clientRef.current.send(command);
      console.log("response: ", response);
      // result = true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      // return result;
    }
  };
  return { uploadImageTos3 };
};

export default useS3Upload;
