import styled, { keyframes } from "styled-components";
import * as Styled from "../../pages/homeComponents/Top10NftCard"

const Top10NftCard = () => {

  const dummyList = Array.from({ length: 13 }, (_, i) => i + 1);

  return (
    <>
      {
        dummyList.map((item, index) => (
          <Item Item key={`skeleton-top10Nft-${index}`} >
            <SkeletonLoader />
          </Item>))}
    </>
  );
};

export default Top10NftCard;

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
  height: 100%; /* 높이는 필요에 따라 조정 */
  background-color: #2c2d31; /* 기본 배경색 */
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%; /* 시작 위치 */
    width: 100px;
    height: 100%;
    /* background-color: #cccccc; */
    background: linear-gradient(
        90deg,
        rgba(44, 45, 49, 0.8) 0%,
      rgba(54, 55, 58, 0.6) 50%,
      rgba(44, 45, 49, 0.5) 100%
    );
    animation: ${loadingAnimation} 3s infinite; /* 애니메이션 설정 */
  }
`;

const Item = styled.div`
  height: 40px;
  border-radius: 5px;
`