import styled from "styled-components";
import { Outlet, ScrollRestoration } from "react-router-dom";
import MainSpinner from "./components/MainSpinner";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {

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
