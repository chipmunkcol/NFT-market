/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from "react";
// import detectEthereumProvider from "@metamask/detect-provider";
import { Web3 } from "web3";
import { MintContract } from "../../contracts/index";
import NonSaleNftCard from "../components/NonSaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import bgMain from '../assets/images/bg-main.png';
import test1 from '../assets/images/test/1.gif';
import test2 from '../assets/images/test/2.png';
import test3 from '../assets/images/test/3.png';
import test4 from '../assets/images/test/4.png';
import goodHand from '../assets/images/good-hand.png';
import premiumCrown from '../assets/images/premium-crown.png';

import Slider from "../components/Slider";
import { S_Button } from "../styles/styledComponent";
import { getImageUrl, getIpfsTokenData, ipfsGetOptions } from "../hooks/common";
import HomeNftCard from "./Create/homeComponents/HomeNftCard";


const temp = [{ name: 'test', image: 'QmRkVNwxQDPLYfMtymC4SPbRtTRGu8CWAabpVPpYSuUjby', price: 2 },
{ name: 'test', image: 'QmTKwcbLe1P4Cq56omBtb2ocRmrfyRrUyxqA9LYSMjvcEB', price: 3 },
{ name: 'test', image: 'QmWa8JvYYRpB2QfJbYvZkXsSts3rRZ1hzakAusbsikqZKr', price: 4 }
]

// Detect the MetaMask Ethereum provider
function Home() {
  //state to store and show the connected account
  // const [account, setAccount] =
  //   useState("연결된 계정이 없습니다");
  const { account } = useContext(GlobalContext);


  const sliderRef = useRef(null);

  // const handleNext = () => {
  //   sliderRef.current.slideNext();
  // }
  // const handlePrev = () => {
  //   sliderRef.current.slidePrev();
  // }
  // numberOfSales
  const [maxPriceNftData, setMaxPriceNftData] = useState({
    name: '',
    tokenUrl: '',
    soldPrice: 0,
    keyvalues: {}
  });

  const [maxPriceNftImageUrl, setMaxPriceNftImageUrl] = useState();
  const [top10Nfts, setTop10Nfts] = useState([]);
  const findMaxPriceSoldNft = nftList => {
    const priceHistory = JSON.parse(nftList[0].metadata.keyvalues.priceHistory);
    let soldPrice = priceHistory[0]?.price;
    let maxPriceSoldNft = nftList[0];
    // if (nftList.length === 1)  {
    //   const { name, ipfs_pin_hash, keyvalues } = maxPriceSoldNft.metadata;
    //   return { name, tokenUrl: ipfs_pin_hash, soldPrice, keyvalues }
    // };
    for (let i = 0; i < nftList.length; i++) {
      const targetNftPriceHistory = JSON.parse(nftList[i].metadata.keyvalues.priceHistory);
      const latestSoldPrice = targetNftPriceHistory[0].price;
      if (latestSoldPrice > soldPrice) { // priceHistory
        soldPrice = latestSoldPrice;
        maxPriceSoldNft = nftList[i];
      }
    }
    const { name, keyvalues } = maxPriceSoldNft.metadata;
    return { name, tokenUrl: maxPriceSoldNft.ipfs_pin_hash, soldPrice, keyvalues }
  };

  const findTop10NumberOfSales = nftList => {
    nftList.sort((a, b) => a.metadata.keyvalues.numberOfSales - b.metadata.keyvalues.numberOfSales);
    return nftList.slice(0, 10);
  }

  const getTopRanking = async () => {
    const res = await fetch('https://api.pinata.cloud/data/pinList?pinStart=20240510&metadata[keyvalues][numberOfSales]={"value":"0","op":"gt"}', ipfsGetOptions);
    const result = await res.json();
    console.log('result: ', result);
    const nftList = result.rows;
    const maxPriceSoldNft = findMaxPriceSoldNft(nftList);
    const top10NftList = findTop10NumberOfSales(nftList);
    setMaxPriceNftData(maxPriceSoldNft);
    setTop10Nfts(top10NftList);
  }

  useEffect(() => {
    getTopRanking();
  }, []);

  // useEffect(() => {
  //   async function fetchImageUrl() {
  //     const result = await getIpfsTokenData(maxPriceNftData.tokenUrl);
  //     const imageUrl = result.image;
  //     setMaxPriceNftImageUrl(imageUrl);
  //   }
  //   if (maxPriceNftData.tokenUrl) {
  //     fetchImageUrl();
  //   }
  // }, [maxPriceNftData]);

  return (
    <Background>
      <Container>
        <S_Background $bgColor="#161618" >
          <Slider sliderRef={sliderRef} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1rem', padding: '2rem 0' }}>
            <TestWrap>
              <TestMovingBg>
                {
                  [test1, test2, test3, test4, test1, test2, test3, test4].map((item, index) => (
                    <ImgWrap key={`testMovingBg-${index}`}>
                      <Img src={item} alt="test" />
                    </ImgWrap>
                  ))
                }
              </TestMovingBg>
            </TestWrap>
            <TestWrap>
              <TestMovingBg>
                {
                  [test1, test2, test3, test4, test1, test2, test3, test4].reverse().map((item, index) => (
                    <ImgWrap key={`testMovingBg2-${index}`}>
                      <Img src={item} alt="test" />
                    </ImgWrap>
                  ))
                }
              </TestMovingBg>
            </TestWrap>
            <RankingArea>
              <RankingTitle>
                <h2>NFT 랭킹</h2>
                <h4>2024.04.23 13:15 기준</h4>
              </RankingTitle>
              <RankingBox>
                <FilterWrap>
                  <FilterItem>실시간</FilterItem>
                  <FilterItem>7일</FilterItem>
                  <FilterItem>30일</FilterItem>
                </FilterWrap>
                <ItemWrap>
                  {temp.map((item, index) => (
                    <Item key={index}>
                      <ItemContent>
                        <ItemRank>{index + 1}</ItemRank>
                        <ItemInfo>
                          <ItemName>name# {item.name}</ItemName>
                          <ItemPrice>price {item.price} ETH ~</ItemPrice>
                        </ItemInfo>
                      </ItemContent>
                      <ItemImg>
                        <img src={`https://ipfs.io/ipfs/${item.image}`} alt="test" />
                      </ItemImg>
                    </Item>
                  ))}
                </ItemWrap>
              </RankingBox>
            </RankingArea>
            <TestWrap>
              <TestMovingBg>
                {
                  [test1, test2, test3, test4, test1, test2, test3, test4].map((item, index) => (
                    <ImgWrap key={`testMovingBg3-${index}`}>
                      <Img src={item} alt="test" />
                    </ImgWrap>
                  ))
                }
              </TestMovingBg>
            </TestWrap>
            <TestWrap>
              <TestMovingBg>
                {
                  [test1, test2, test3, test4, test1, test2, test3, test4].reverse().map((item, index) => (
                    <ImgWrap key={`testMovingBg4-${index}`}>
                      <Img src={item} alt="test" />
                    </ImgWrap>
                  ))
                }
              </TestMovingBg>
            </TestWrap>
          </div>
        </S_Background>
        <div style={{ marginTop: '-2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <TopPicksBox>
              <BgTitle>TOP <br /> COLLECTOR</BgTitle>
              <MainTitle>
                <TopPickImgWrap>
                  <img src={goodHand} alt="good-hand" />
                </TopPickImgWrap>
                <h2>TOP 컬렉터가 구매했어요</h2>
                <p>NFT에 진심인 그들의 선택은?</p>
              </MainTitle>
              <div style={{ marginTop: '4rem' }}>
                <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                  {
                    [top10Nfts].slice(0, 3).map((nft, index) => (
                      <TopItemBox key={`top10-${index}`}>
                        <TopImgWrap>
                          <img src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${temp[index].image}`} />
                        </TopImgWrap>
                        <TopContent>
                          {/* <h3>{item} name</h3> */}
                          <p>price</p>
                        </TopContent>
                      </TopItemBox>
                    ))
                  }
                </ul>
                <ButtonArea>
                  <ButtonBox>
                    <div>
                      <i />✨
                    </div>
                    <p>
                      10초 후 업데이트
                    </p>
                  </ButtonBox>
                </ButtonArea>
              </div>
            </TopPicksBox>
            <HighestPriceBox>
              <HighBgTitle>PREMIUM <br /> NFT</HighBgTitle>
              <MainTitle>
                <TopPickImgWrap>
                  <img src={premiumCrown} alt="premiun-crown" />
                </TopPickImgWrap>
                <h2>100만원 이상으로 거래됐어요</h2>
                <p>우린 이걸 프리미엄이라고 불러요</p>
              </MainTitle>
              <div style={{ marginTop: '4rem' }}>
                <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                  <HomeNftCard nftData={maxPriceNftData} />
                </ul>
                <ButtonArea>
                  <ButtonBox>
                    <div>
                      <i />✨
                    </div>
                    <p>
                      10초 후 업데이트
                    </p>
                  </ButtonBox>
                </ButtonArea>
              </div>
            </HighestPriceBox>
          </div>
        </div>
      </Container>
    </Background>
  );
}

const ButtonArea = styled.div`
  margin-top: 30px;
  ${props => props.theme.variables.flex};
`;
const ButtonBox = styled.div`
  ${props => props.theme.variables.flex};
  gap: 1px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #e2e2e5;
  p {
    font-size: 14px;
    color: #6c707b;
  }
  cursor: pointer;
`;

const ItemWrap = styled.ul`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Item = styled.li`
  ${props => props.theme.variables.flexBetween};
  padding: 8px 10px;
  border-radius: 5px;
  background-color: #2c2d31;
`;
const ItemContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
const ItemRank = styled.div``;
const ItemImg = styled.div`
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 3px;
`;
const ItemName = styled.div``;
const ItemPrice = styled.div`
  font-size: 12px;
  color: #ffffff4d;
`;
const FilterWrap = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border-radius: 3px;
  background-color: #34353a;
`;
const FilterItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34%;
  border-radius: 3px;
  padding: 10px 0;
  &:hover {
    background-color: #6c707b33;
  }
`;
const RankingArea = styled.div`
  width: 50%;
  padding: 3rem 1rem;
`;
const RankingBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #212226;
  border-radius: 8px;
  padding: 1rem;
`;
const RankingTitle = styled.div`
  display: flex;
  padding-bottom: 20px;
  h4 {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #6c707b;  
  }
`;

const HighestPriceBox = styled.div`
  position: relative;
  width: 432px;
  height: 620px;
  padding: 2rem;
  background: linear-gradient(
    to bottom,
    rgba(255, 190, 0, 0.16) 0%,
    rgba(255, 190, 0, 0.024) 30.73%,
    rgba(255, 190, 0, 0) 100%
  ), linear-gradient(to bottom, rgb(247, 247, 250), rgb(247, 247, 250));
  border-radius: 8px;
  color: #101010;
  text-align: center;
`;
const TopPicksBox = styled.div`
  position: relative;
  width: 672px;
  height: 620px;
  padding: 2rem;
  background: linear-gradient(
    to bottom,
    rgba(85, 0, 255, 0.08) 0%,
    rgba(85, 0, 255, 0.01) 30.73%,
    rgba(85, 0, 255, 0) 100%
  ), linear-gradient(to bottom, rgb(247, 247, 250), rgb(247, 247, 250));
  color: #101010;
  border-radius: 8px;
  text-align: center;
  
`;

const MainTitle = styled.div`
  position: absolute;
  width: 100%;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  ${props => props.theme.variables.flexColumn};

  h2 {
    margin-top: 1.5rem;
    font-size: 24px;
  }
  p {
    margin-top: 0.5rem;
    font-size: 14px;
    color: #6c707b;
  }
`;

const TopItemBox = styled.li`
  width: 184px;
`;
const TopImgWrap = styled.div`
  width: 100%;
  height: 184px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

`;
const TopContent = styled.div`
  ${props => props.theme.variables.flexColumn};
  padding-top: 1rem;
  gap: 0.5rem;
  h3 {
    font-size: 16px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    color: #6c707b;
  }
`;
const TopPickImgWrap = styled.div`
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BgTitle = styled.div`
  /* color: #ecebf9; */
  color: #dbd9f9;
  font-size: 64px;
  font-weight: 700;
  margin-top: 1rem;
`;

const HighBgTitle = styled(BgTitle)`
  color: #f4e6bc;
`;


const ImgWrap = styled.div`
  width: 100px;
  height: 148px;
`;
const Img = styled.img`
  width: 100%;
  height: 148px;
  object-fit: cover;
  border-radius: 10px;
  filter: brightness(0.2);
  transition: filter 0.3s ease;

  animation: move-image 30s linear infinite;
  cursor: pointer;
  &:hover {
      filter: brightness(1);
  }

@keyframes move-image {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
`;
const TestWrap = styled.div`
  /* width: 100px; */
  height: 800px;
  background-color: #161618;
`;

const TestMovingBg = styled.div`
  /* display: flex;
  flex-direction: column; */
  ${props => props.theme.variables.flexColumn};
  gap: 2rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-image: url('');
  background-size: cover;
  background-repeat: repeat-y;
  animation: move-background 5s linear infinite;

  @keyframes move-background {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0 ;
      /* background-position: 0 100%; */
`;

const S_Background = styled.div`
  width: 100%;
  background-color: ${props => props.$bgColor ? props.$bgColor : '#ffffff'};
`;

const Background = styled.div`
  /* height: 100%; */
  padding-top: 72px;
  width: 100%;
  background-color: #ffffff;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  color: #f0f0f1;
  /* padding: 0 50px 0 50px; */
`;
// const Background = styled.div`
//   height: 100%;
//   padding-top: 100px;
//   background-image: url(${bgMain});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;
// const Slider = styled.div`
//   height: 300px;
//   background-color: rgba(0, 0, 0, 0.5);
// `;
export default Home;
{/* Button to trigger Metamask connection */ }
{/* <button onClick={() => connectMetamask()}>Connect to Metamask</button> */ }

{/* Display the connected account */ }
{/* <h2>{account}</h2>
      <button onClick={onClickMint}>Mint 버튼</button>
      {nftHash && <NonSaleNftCard nftHash={nftHash} />} */}