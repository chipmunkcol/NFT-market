/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
// import detectEthereumProvider from "@metamask/detect-provider";
import styled from "styled-components";
import goodHand from "../assets/images/good-hand.png";
import premiumCrown from "../assets/images/premium-crown.png";

import Slider from "../components/Slider";
import {
  findNftsSoldExpensively,
  findTop10NumberOfSales,
  findTopCollectorNfts,
  getCollectionListToIpfsToHome,
  getCurrentDate,
  getNftListToIpfsToHome,
} from "../hooks/common";
import Top10NftCard from "./homeComponents/Top10NftCard";
import TopCollectorNftCard from "./homeComponents/TopCollectorNftCard";
import Spinner from "../components/Spinner";
import { dummyNfts } from "../components/dummyNfts";
import MoveBgNftCard from "./homeComponents/MoveBgNftCard";
import { useQuery } from "@tanstack/react-query";
import ExpensiveNftCard from "./homeComponents/ExpensiveNftCard";
import LazyloadComponent from "../hooks/LazyloadComponent";
import SkeletonUI from "../components/skeletonUI/Top10NftCard";

// Detect the MetaMask Ethereum provider
function Home() {
  const {
    data: nfts,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["home-nfts"],
    queryFn: getNftListToIpfsToHome,
    retry: 3,
  });

  const {
    data: collections,
    isPending: isPendingCollection,
    isSuccess: isSuccessCollection,
  } = useQuery({
    queryKey: ["home-collections"],
    queryFn: getCollectionListToIpfsToHome,
    retry: 3,
  });

  const [nftsSoldExpensivelyIndex, setNftsSoldExpensivelyIndex] = useState(0);

  const [topCollectorNftsIndex, setTopCollectorNftsIndex] = useState(0);

  const refreshTopCollectorNfts = () => {
    if (!collections || collections.length < 1) return;
    if (
      (topCollectorNftsIndex + 1) * 3 <
      findTopCollectorNfts(collections).length - 1
    ) {
      setTopCollectorNftsIndex((prev) => prev + 3);
    } else {
      setTopCollectorNftsIndex(0);
    }
  };

  const refreshNftsSoldExpensively = () => {
    if (!nfts || nfts.length < 1) return;
    if (nftsSoldExpensivelyIndex < findNftsSoldExpensively(nfts).length - 1) {
      setNftsSoldExpensivelyIndex((prev) => prev + 1);
    } else {
      setNftsSoldExpensivelyIndex(0);
    }
  };

  return (
    <Background>
      <Container>
        <S_Background $bgColor="#161618">
          <Slider />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "1rem",
              padding: "2rem 0",
            }}
          >
            <TestWrap>
              <TestMovingBg>
                {[...dummyNfts].splice(0, 6).map((nft) => (
                  <MoveBgNftCard
                    key={`home-bg-left-1-${nft.image}`}
                    nft={nft}
                    direction={"down"}
                  />
                ))}
              </TestMovingBg>
            </TestWrap>
            <TestWrap>
              <TestMovingBg>
                {[...dummyNfts]
                  .splice(7, 13)
                  .reverse()
                  .map((nft) => (
                    <MoveBgNftCard
                      key={`home-bg-left-2-${nft.image}`}
                      nft={nft}
                      direction={"up"}
                    />
                  ))}
              </TestMovingBg>
            </TestWrap>
            <RankingArea>
              <RankingTitle>
                <h2>NFT 랭킹</h2>
                <h4>{getCurrentDate()} 기준</h4>
              </RankingTitle>
              <RankingBox>
                <FilterWrap>
                  <FilterItem>실시간</FilterItem>
                  <FilterItem>7일</FilterItem>
                  <FilterItem>30일</FilterItem>
                </FilterWrap>
                <ItemWrap>
                  {isPending && <SkeletonUI />}
                  {isSuccess &&
                    nfts.length > 0 &&
                    findTop10NumberOfSales(nfts).map((nft, index) => (
                      <Top10NftCard
                        key={`top10Nfts-${nft.nftId}`}
                        nft={nft}
                        index={index}
                      />
                    ))}
                </ItemWrap>
              </RankingBox>
            </RankingArea>
            <TestWrap>
              <TestMovingBg>
                {[...dummyNfts]
                  .splice(0, 6)
                  .reverse()
                  .map((nft) => (
                    <MoveBgNftCard
                      key={`home-bg-right-1-${nft.image}`}
                      nft={nft}
                      direction={"down"}
                    />
                  ))}
              </TestMovingBg>
            </TestWrap>
            <TestWrap>
              <TestMovingBg>
                {[...dummyNfts].splice(7, 13).map((nft) => (
                  <MoveBgNftCard
                    key={`home-bg-right-2-${nft.image}`}
                    nft={nft}
                    direction={"up"}
                  />
                ))}
              </TestMovingBg>
            </TestWrap>
          </div>
        </S_Background>
        <div style={{ marginTop: "-2rem" }}>
          <FlexBox>
            <TopPicksBox>
              <BgTitle>
                TOP <br /> COLLECTOR
              </BgTitle>
              <MainTitle>
                <TopPickImgWrap>
                  <LazyloadComponent>
                    <img src={goodHand} alt="good-hand" />
                  </LazyloadComponent>
                </TopPickImgWrap>
                <h2>TOP 컬렉터의 NFT</h2>
                <p>가장 인기있는 컬렉터의 NFT를 만나보세요</p>
              </MainTitle>
              <div style={{ marginTop: "4rem" }}>
                <ul
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  {isPendingCollection && <Spinner />}
                  {isSuccessCollection &&
                    collections.length > 0 &&
                    findTopCollectorNfts(collections)
                      .slice(topCollectorNftsIndex, topCollectorNftsIndex + 3)
                      .map((nft) => (
                        <TopCollectorNftCard
                          key={`home-topCollectNfts-${nft.nftId}`}
                          nft={nft}
                        />
                      ))}
                </ul>
                <ButtonArea>
                  <ButtonBox onClick={refreshTopCollectorNfts}>
                    <div>
                      <i />✨
                    </div>
                    <p>다른 NFT 보기</p>
                  </ButtonBox>
                </ButtonArea>
              </div>
            </TopPicksBox>
            <HighestPriceBox>
              <HighBgTitle>
                PREMIUM <br /> NFT
              </HighBgTitle>
              <MainTitle>
                <TopPickImgWrap>
                  <LazyloadComponent>
                    <img src={premiumCrown} alt="premiun-crown" />
                  </LazyloadComponent>
                </TopPickImgWrap>
                <h2>100만원 이상으로 거래됐어요</h2>
                <p>우린 이걸 프리미엄이라고 불러요</p>
              </MainTitle>
              <div style={{ marginTop: "4rem" }}>
                <ul
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  {isPending && <Spinner />}
                  {isSuccess &&
                    nfts.length > 0 &&
                    findNftsSoldExpensively(nfts)
                      .slice(
                        nftsSoldExpensivelyIndex,
                        nftsSoldExpensivelyIndex + 1
                      )
                      .map((nft) => (
                        <ExpensiveNftCard
                          key={`expensive-nft-${nft.nftId}`}
                          nft={nft}
                        />
                      ))}
                </ul>
                <ButtonArea>
                  <ButtonBox onClick={refreshNftsSoldExpensively}>
                    <div>
                      <i />✨
                    </div>
                    <p>다른 NFT 보기</p>
                  </ButtonBox>
                </ButtonArea>
              </div>
            </HighestPriceBox>
          </FlexBox>
        </div>
      </Container>
    </Background>
  );
}

const ButtonArea = styled.div`
  margin-top: 30px;
  ${(props) => props.theme.variables.flex};
`;
const ButtonBox = styled.div`
  ${(props) => props.theme.variables.flex};
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
const FlexBox = styled.div`
  /* style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }} */
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    flex-direction: column;
    gap: 0;
  }
`;

const ItemWrap = styled.ul`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
  padding: 3rem 1rem;
  width: 50%;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
    padding: 1rem 1rem;
  }
`;
const RankingBox = styled.div`
  width: 100%;
  /* height: 100%; */
  height: 692px;
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
    ),
    linear-gradient(to bottom, rgb(247, 247, 250), rgb(247, 247, 250));
  border-radius: 8px;
  color: #101010;
  text-align: center;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
    border-radius: 0;
  }
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
    ),
    linear-gradient(to bottom, rgb(247, 247, 250), rgb(247, 247, 250));
  color: #101010;
  border-radius: 8px;
  text-align: center;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
    border-radius: 0;
  }
`;

const MainTitle = styled.div`
  position: absolute;
  width: 100%;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  ${(props) => props.theme.variables.flexColumn};

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

const TestWrap = styled.div`
  /* width: 100px; */
  height: 800px;
  background-color: #161618;

  display: block;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
  }
`;

const TestMovingBg = styled.div`
  ${(props) => props.theme.variables.flexColumn};
  gap: 2rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const S_Background = styled.div<{ $bgColor: string }>`
  width: 100%;
  background-color: ${(props) => (props.$bgColor ? props.$bgColor : "#ffffff")};
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
