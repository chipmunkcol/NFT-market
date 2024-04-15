import styled from "styled-components";

function Collection() {
  return (
    <Background>
      <Container>
        <h1>Collection</h1>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  /* height: 100%; */
  padding-top: 100px;
  width: 100%;
  background-color: #ffffff;
  background-size: cover;
`;

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  padding: 0 50px 0 30px;
`;

export default Collection;
