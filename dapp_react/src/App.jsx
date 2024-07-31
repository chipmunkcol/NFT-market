import styled from "styled-components";
import { Outlet, ScrollRestoration } from "react-router-dom";
import MainSpinner from "./components/MainSpinner";
import Footer from "./components/Footer";
import Header from "./components/Header";

// aws-sdk
import {
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";

function App() {

  const { setS3Objects } = useContext(GlobalContext);

  useEffect(() => {
    const client = new S3Client({
      region: "ap-northeast-2",

      credentials: fromCognitoIdentityPool({
        clientConfig: { region: "ap-northeast-2" },
        identityPoolId: "ap-northeast-2:35debddd-8838-4170-9e8c-7a6dce0ac813",
      }),
    });
    const bucketName = "s3-lambda-edge-image-resize-pinata";
    const command = new ListObjectsCommand({ Bucket: bucketName });
    client.send(command).then(({ Contents }) => setS3Objects(Contents || []));
  }, []);

  return (
    <>
      {/* <ScrollToTop /> */}
      <ScrollRestoration />
      <MainSpinner />
      <Container>
        <Header />
        {/* path에 따라 Outlet 만 변하고 Header와 Footer은 고정 */}
        <ContainerHome>
          <Outlet />
        </ContainerHome>
        <Footer />
      </Container>
    </>
  );
}

const ContainerHome = styled.div`
  width: 100%;
  /* height: 100%; */
`;
const Container = styled.div`
  /* position: relative; */
  /* width: 100vw; */
`;


export default App;
