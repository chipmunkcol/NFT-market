import React, { useContext, useEffect, useRef, useState } from "react";
import { SaleNftContract, web3 } from "../../contracts/index";
import styled from "styled-components";
import OnsaleNftCard from "../components/OnsaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import { S_Button, S_Wallet_Button } from "../styles/styledComponent";
import bgMain from '../assets/images/bg-main.png';

const MarketPlace = () => {
  const { onsaleNftList, setOnsaleNftList, trigger } = useContext(GlobalContext);
  const { account } = useContext(GlobalContext);

  async function getOnsaleNftList() {
    const res = await SaleNftContract.methods
      .getOnsaleNftList()
      .call();
    console.log("res: ", res);
    if (res?.length < 0) return;

    const onsaleNftList = [];
    res.map((onsaleNft) => {
      const { nftId, nftUrl, price } = onsaleNft;
      const parsedId = parseInt(nftId, 10);
      const parsedPrice = parseInt(price, 10);
      const etherPrice = web3.utils.fromWei(parsedPrice.toString(), "ether");
      onsaleNftList.push({
        nftId: parsedId,
        nftUrl,
        nftPrice: etherPrice,
      });
    });
    // setOnsaleNftList(prev => [...prev, ...onsaleNftList]);
    setOnsaleNftList(onsaleNftList);
  }

  useEffect(() => {
    getOnsaleNftList();
  }, [trigger]);

  return (
    <Background>
      <Container>
        <h1>MarketPlace</h1>
        {
          onsaleNftList.length < 1 ? (<div>판매중인 NFT가 없습니다.</div>) : (
            <MarketWrap>
              {
                onsaleNftList.map(onsaleNft => (
                  <OnsaleNftCard key={onsaleNft.nftId} nft={onsaleNft} />
                ))
              }
            </MarketWrap>
          )
        }
      </Container>
    </Background>
  );
};


const Background = styled.div`
  /* height: 100%; */
  padding-top: 72px;
  width: 100%;
  background-image: url(${bgMain});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
`;

const MarketWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

export default MarketPlace;
