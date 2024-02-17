import React, { FC } from "react";
import styled from "styled-components";

interface props {
  nftType: number;
}

const NftCard: FC<props> = ({ nftType }) => {
  return (
    <Box>
      <Img src={`images/${nftType}.png`} alt="mint-image" />
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
