import React, { FC } from "react";
import styled from "styled-components";

interface props {
  nftUrl: string;
}

const NftCard: FC<props> = ({ nftUrl }) => {
  return (
    <Box>
      <Img src={nftUrl} alt="mint-image" />
    </Box>
  );
};
export const Img = styled.img`
  width: 200px;
  height: 100%;
  object-fit: cover;
`;

export const Box = styled.div`
  /* width: 200px; */
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NftCard;
