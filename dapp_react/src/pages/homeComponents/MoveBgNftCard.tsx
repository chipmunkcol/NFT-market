import styled from "styled-components";
import { getImageUrl, getResizeImageUrl } from "../../hooks/common";
import { useNavigate } from "react-router-dom";
import { DummyNft } from "../../../type";
import { useState } from "react";

interface MoveBgNftCardProps {
  nft: DummyNft;
  direction: "up" | "down";
}
const MoveBgNftCard = ({ nft, direction }: MoveBgNftCardProps) => {
  const { image, tokenUrl, ext } = nft;

  const [src, setSrc] = useState(
    `${getResizeImageUrl(image, ext)}?w=100&h=150`
  );

  const [errorOccurred, setErrorOccurred] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // 이미 대체 URL로 변경했는지 확인하여 재호출 방지
    e.currentTarget.onerror = null;
    if (!errorOccurred) {
      // 에러가 발생하지 않았을 경우에만 대체 URL로 변경
      setErrorOccurred(true); // 에러 발생 상태로 변경
      setSrc(getImageUrl(image));
    }
  };
  const navigate = useNavigate();

  const navigateDetailPage = () => {
    navigate(`/nft-detail/${tokenUrl}/0`);
  };

  return (
    <ImgWrap key={`testMovingBg2-${image}`} onClick={navigateDetailPage}>
      <Img
        $direction={direction}
        src={src}
        // src={getImageUrl(image)}
        onError={handleError}
        alt="home-background-nftCard"
      />
    </ImgWrap>
  );
};

export default MoveBgNftCard;

const ImgWrap = styled.div`
  width: 100px;
  height: 148px;
`;
const Img = styled.img<{ $direction: string }>`
  width: 100%;
  height: 148px;
  object-fit: cover;
  border-radius: 10px;
  filter: brightness(0.2);
  transition: filter 0.3s ease;

  animation: move-image-${(props) => props.$direction} 30s linear infinite;
  cursor: pointer;
  &:hover {
    filter: brightness(1);
  }

  @keyframes move-image-${(props) => props.$direction} {
    0% {
      transform: ${(props) =>
        props.$direction === "up" ? "translateY(0)" : "translateY(-100%)"};
    }
    50% {
      transform: ${(props) =>
        props.$direction === "up" ? "translateY(-100%)" : "translateY(0)"};
    }
    100% {
      transform: ${(props) =>
        props.$direction === "up" ? "translateY(0)" : "translateY(-100%)"};
    }
    /* 0% {
    transform: translateY(100%);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  } */
  }
`;
