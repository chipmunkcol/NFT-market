import styled from "styled-components";
import {
  getImageUrl,
  getResizeImageUrl,
  removeExtenstion,
} from "../../hooks/common";
import { useNavigate } from "react-router-dom";
import { DummyNft, GlobalContextType } from "../../../type";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import loadingImg from "../../assets/images/달팽이로딩.png";

interface MoveBgNftCardProps {
  nft: DummyNft;
  direction: "up" | "down";
}
const MoveBgNftCard = ({ nft, direction }: MoveBgNftCardProps) => {
  const { image, tokenUrl } = nft;
  const { s3Obects } = useContext(GlobalContext) as GlobalContextType;
  const navigate = useNavigate();
  const [resizeImageUrl, setResizeImageUrl] = useState("");

  const navigateDetailPage = () => {
    // navigate(`/nft-detail/${tokenUrl}/${nftId}`);
    navigate(`/nft-detail/${tokenUrl}/0`);
  };

  useEffect(() => {
    if (s3Obects.length === 0) return;
    const targetKey = s3Obects.filter((s3Object) => {
      if (s3Object.Key) {
        let keyWithoutExtension = removeExtenstion(s3Object.Key);
        return keyWithoutExtension === image;
      }
    });
    if (targetKey[0]?.Key) {
      const _resizeImageUrl = getResizeImageUrl(targetKey[0].Key);
      setResizeImageUrl(_resizeImageUrl);
    }
  }, [s3Obects]);

  return (
    <ImgWrap key={`testMovingBg2-${image}`} onClick={navigateDetailPage}>
      {resizeImageUrl ? (
        <Img
          $direction={direction}
          src={`${resizeImageUrl}?w=100&h=150`}
          onError={(e) => (e.currentTarget.src = getImageUrl(image))}
          alt="home-background-nftCard"
        />
      ) : (
        <Img
          $direction={direction}
          src={loadingImg}
          alt="home-background-nftCard"
        />
      )}
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
