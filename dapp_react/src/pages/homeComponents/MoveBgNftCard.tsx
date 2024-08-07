import styled from "styled-components";
import { getImageUrl, getResizeImageUrl } from "../../hooks/common";
import { useNavigate } from "react-router-dom";
import { DummyNft } from "../../../type";

interface MoveBgNftCardProps {
  nft: DummyNft;
  direction: "up" | "down";
}
const MoveBgNftCard = ({ nft, direction }: MoveBgNftCardProps) => {
  const { image, tokenUrl, ext } = nft;
  const navigate = useNavigate();

  const navigateDetailPage = () => {
    // navigate(`/nft-detail/${tokenUrl}/${nftId}`);
    navigate(`/nft-detail/${tokenUrl}/0`);
  };

  return (
    <ImgWrap key={`testMovingBg2-${image}`} onClick={navigateDetailPage}>
      <Img
        $direction={direction}
        src={`${getResizeImageUrl(image, ext)}?w=100&h=150`}
        // src={getImageUrl(image)}
        onError={(e) => (e.currentTarget.src = getImageUrl(image))}
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
