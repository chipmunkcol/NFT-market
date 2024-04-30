import React, { FC } from "react";
import styled from "styled-components";

interface props {
  nftHash: string;
  name: string;
}

const NftCard: FC<props> = ({ nftHash, name }) => {
  return (
    <Container>
      <ImgWrap>
        <Img
          src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${nftHash}`}
          alt="mint-image"
        />
      </ImgWrap>
      <NftInfo>
        {name ? <Name>{name}</Name> : <Name>NFT {"#"}277</Name>}
      </NftInfo>
    </Container>
  );
};

export const ImgWrap = styled.div`
  width: 200px;
  height: 200px;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
`;
export const NftInfo = styled.div`
  height: 64px;
  padding: 1rem;
`;
export const Name = styled.div`
  font-weight: bold;
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
`;

export const Container = styled.div`
  position: relative;
  max-width: 200px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 15px;
  padding-bottom: 1rem;
  font-size: 14px;
  text-align: center;
`;

export default NftCard;
