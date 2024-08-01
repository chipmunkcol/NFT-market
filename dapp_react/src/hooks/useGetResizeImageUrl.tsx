// import { useContext, useEffect, useState } from "react";
// import {
//   getResizeImageKeyOfAwsS3,
//   getResizeImageUrl,
//   removeExtenstion,
// } from "./common";
// import { GlobalContext } from "../context/GlobalContext";
// import { GlobalContextType } from "../../type";

// const useGetResizeImageUrl = (imageUrl: string) => {
//   const [resizeImageUrl, setResizeImageUrl] = useState("");
//   const { s3Obects } = useContext(GlobalContext) as GlobalContextType;

//   useEffect(() => {
//     if (!imageUrl) return;
//     const resizeImagekey = getResizeImageKeyOfAwsS3(imageUrl);
//     const targetKey = s3Obects.filter((s3Object) => {
//       if (s3Object.Key) {
//         let keyWithoutExtension = removeExtenstion(s3Object.Key);
//         return keyWithoutExtension === resizeImagekey;
//       }
//     });
//     if (targetKey[0]?.Key) {
//       const _resizeImageUrl = getResizeImageUrl(targetKey[0].Key);
//       setResizeImageUrl(_resizeImageUrl);
//     }
//   }, [imageUrl]);

//   return resizeImageUrl;
// };

// export default useGetResizeImageUrl;
