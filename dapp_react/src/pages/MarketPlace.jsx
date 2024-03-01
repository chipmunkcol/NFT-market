import React, { useContext, useEffect } from "react";
import { SaleNftContract, web3 } from "../../contracts/index";
import styled from "styled-components";
import OnsaleNftCard from "../components/OnsaleNftCard";
import { GlobalContext } from "../context/GlobalContext";

const MarketPlace = () => {
  const { onsaleNftList, setOnsaleNftList, trigger } = useContext(GlobalContext);

  async function getOnsaleNftList() {
    const res = await SaleNftContract.methods
      .getOnsaleNftList()
      .call();
    console.log("res: ", res);
    if (res?.length < 0) return;

    const onsaleNftList = [];
    res.map((onsaleNft) => {
      const { nftId, nftType, price } = onsaleNft;
      const parsedId = parseInt(nftId, 10);
      const parsedType = parseInt(nftType, 10);
      const parsedPrice = parseInt(price, 10);
      const etherPrice = web3.utils.fromWei(parsedPrice.toString(), "ether");
      onsaleNftList.push({
        nftId: parsedId,
        nftType: parsedType,
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
    <div>
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
    </div>
  );
};

const MarketWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

export default MarketPlace;
