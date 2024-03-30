import React, { useContext, useEffect, useState } from "react";
import { SaleNftContract, web3 } from "../../contracts/index";
import styled from "styled-components";
import OnsaleNftCard from "../components/OnsaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import { S_Button } from "../styles/styledComponent";

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

  const [file, setFile] = useState();
  const [cid, setCid] = useState();
  const onchangeHandler = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_IPFS_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      setCid(resData.IpfsHash);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <Container>
      <S_Button onClick={handleSubmission}>Nft 발행하기</S_Button>
      <input type="file" onChange={onchangeHandler} />
      {cid && (
        <img
          src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${cid}`}
          alt="ipfs image"
          width={500}
          height={500}
        />
      )}
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
  );
};

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
