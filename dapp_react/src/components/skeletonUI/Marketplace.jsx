import styled, { keyframes } from "styled-components";

const Marketplace = () => {
  const dummyList = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Container>
      {
        dummyList.map((item, index) => (
          <Item Item key={`skeleton-Marketplace-${index}`} >
            <SkeletonLoader />
          </Item>))}
    </Container>
  )
}

export default Marketplace;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Item = styled.div`
  /* position: relative; */
  width: 193px;
  height: 289px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 15px;
  padding: 5px 5px 0 5px;
  padding-bottom: 1rem;
`;

const loadingAnimation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const SkeletonLoader = styled.div`
  width: 100%;
  height: 193px; /* 높이는 필요에 따라 조정 */
  background-color: #f5f5f5; /* 기본 배경색 */
  position: relative;
  overflow: hidden;
  

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%; /* 시작 위치 */
    width: 500px;
    height: 100%;
    /* background-color: #cccccc; */
    background: linear-gradient(
      90deg,
      rgba(245, 245, 245, 1) 0%,
      #ffffffae 10%,
      rgba(245, 245, 245, 1) 20%
    );
    animation: ${loadingAnimation} 2s infinite; /* 애니메이션 설정 */
  }
`;