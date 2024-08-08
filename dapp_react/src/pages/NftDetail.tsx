import { useParams } from "react-router-dom";
import styled from "styled-components";
import useGetTokenData from "../hooks/useGetTokenData";
import { useContext, useEffect, useState } from "react";
import {
  formatPrice,
  getCurrentYMD,
  getImageUrl,
  getResizeImageUrl,
  getTargetNftToIpfsData,
} from "../hooks/common";
import sepoliaSymbol from "../assets/images/sepolia-symbol.png";
import { GlobalContext } from "../context/GlobalContext";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
// import ExpandIcon from "../assets/images/icon-expand.svg?react";
import ExpandIcon from "../assets/images/icon-expand.png";
import {
  GlobalContextType,
  NewOnsaleNftByDetailPage,
  PriceHistoryT,
} from "../../type";
import loadingImg from "../assets/images/달팽이로딩.png";
import Cart from "../components/button/Cart";
import Purchase from "../components/button/Purchase";

function NftDetail() {
  const params = useParams();
  const { ipfsHash, nftId } = params;
  const tokenData = useGetTokenData(ipfsHash || "");
  const { name, description, image, attributes } = tokenData;
  const { account, signer } = useContext(GlobalContext) as GlobalContextType;
  const [metadata, setMetadata] = useState<NewOnsaleNftByDetailPage>({
    nftName: "",
    nftId: 0,
    nftPrice: 0,
    owner: "",
    tokenUrl: "",
    isCollection: "false",
    numberOfSales: 0,
    ext: "",
    tags: "",
    priceHistory: [
      {
        owner: "",
        price: 0,
        soldTime: "",
      },
    ],
  });

  const getNewPriceHistory = (priceHistory: PriceHistoryT[]) => {
    const newPriceHistory = priceHistory.reverse().map((price) => {
      return {
        ...price,
        soldTime: getCurrentYMD(price.soldTime),
      };
    });
    return newPriceHistory;
  };

  useEffect(() => {
    async function fetchMetadata() {
      if (ipfsHash && name) {
        const res = await getTargetNftToIpfsData(ipfsHash);
        const _metadata = res.metadata.keyvalues;

        let priceHistory = [];
        if (_metadata.priceHistory) {
          priceHistory = JSON.parse(_metadata.priceHistory);
        }
        const newPriceHistory = getNewPriceHistory(priceHistory);
        setMetadata({
          ..._metadata,
          nftName: name,
          tokenUrl: ipfsHash,
          priceHistory: newPriceHistory,
        });
      }
    }
    fetchMetadata();
  }, [name]);

  // chart mobie CSS
  const [mobileSize, setMobileSize] = useState(false);
  useEffect(() => {
    // const handleResize = () => {
    if (window.innerWidth <= 480) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
  }, []);

  const purchaseProps = {
    nftId: Number(nftId),
    tokenUrl: ipfsHash,
    metadata,
    nftPrice: metadata.nftPrice,
    signer,
    account,
  };

  return (
    <Background>
      <Container>
        <Flex>
          <LeftPart>
            <ImgBox>
              <header>
                <div>
                  {/* 이더리움 등 icon */}
                  <SymbolImg>
                    <img src={sepoliaSymbol} alt="sepolia-symbol" />
                  </SymbolImg>
                </div>
                <div>
                  <div>
                    {/* view original (pinata) */}
                    <a
                      href={`${import.meta.env.VITE_IPFS_URL}/${image}`}
                      target="_blank"
                    >
                      {/* <ExpandImg /> */}
                      <ExpandImg>
                        <img src={ExpandIcon} alt="expand-icon" />
                      </ExpandImg>
                    </a>
                  </div>
                  <div>
                    {/* like icon */}
                    {/* <icon /> */}
                  </div>
                </div>
              </header>
              <ImgWrap>
                {metadata?.ext ? (
                  <img
                    src={`${getResizeImageUrl(
                      image,
                      metadata?.ext
                    )}?w=600&h=600`}
                    onError={(e) => (e.currentTarget.src = getImageUrl(image))}
                    alt="NFT image"
                  />
                ) : (
                  <img src={loadingImg} alt="loading..." />
                )}
              </ImgWrap>
            </ImgBox>

            <AttribuesBox style={{ marginTop: "20px" }}>
              <h3>Traits</h3>
              <PaddingWrap>
                <ul>
                  {typeof attributes === "object" && attributes?.length > 0 ? (
                    attributes.map((attr) => (
                      <li key={`nft-detail-${ipfsHash}-${nftId}`}>
                        <div style={{ fontSize: "12px", color: "#545454" }}>
                          {attr.trait_type}
                        </div>
                        <div style={{ fontSize: "14px", color: "#121212" }}>
                          {attr.value}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </PaddingWrap>
            </AttribuesBox>
          </LeftPart>
          <RightPart>
            <RightWrap>
              <div style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <h1>{name}</h1>
                  <div>
                    Owned by{" "}
                    <span style={{ color: "#2081e2cc" }}>{metadata.owner}</span>
                  </div>
                </div>
              </div>
              <PriceBox>
                <h3>Price Info</h3>
                <PaddingWrap>
                  <div style={{ color: "#8a939b" }}>Current price</div>
                  <div>
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: "700",
                        color: "#121212",
                        marginRight: "5px",
                      }}
                    >
                      {metadata.nftPrice} ETH
                    </span>
                    <span style={{ fontSize: "15px", color: "#545454" }}>
                      ($
                      {formatPrice(Number(metadata.nftPrice) * 2928)})
                    </span>
                  </div>
                  <div>
                    <ButtonWrap>
                      <Purchase
                        {...purchaseProps}
                        tokenUrl={purchaseProps.tokenUrl ?? ""}
                        signer={purchaseProps.signer ?? null}
                        account={purchaseProps.account ?? ""}
                      />
                      <Cart
                        css={{ btnWidth: "55px", imgWidth: "20px" }}
                        metadata={metadata}
                        account={account ?? ""}
                      />
                    </ButtonWrap>
                  </div>
                </PaddingWrap>
              </PriceBox>
              <PriceHistory>
                <h3>Price Info</h3>
                <div style={{ fontSize: "11px", padding: "1rem" }}>
                  {/* <div style={{ display: 'flex' }}> */}
                  <span>Volume (ETH)</span>

                  {/* 그래프 라이브러리 */}
                  {/* 그래프 라이브러리 */}
                  {metadata.priceHistory.length > 0 ? (
                    <LineChart
                      width={mobileSize ? 300 : 600}
                      height={200}
                      data={metadata.priceHistory}
                    >
                      <Line type="monotone" dataKey="price" stroke="#8884d8" />
                      {/* <CartesianGrid stroke="#ccc" /> */}
                      <XAxis dataKey="soldTime" />
                      <YAxis />
                      <Tooltip />
                    </LineChart>
                  ) : (
                    <NoSold>판매된 기록이 없습니다</NoSold>
                  )}
                  {/* </div> */}
                </div>
              </PriceHistory>
              <DescriptionBox>
                <h3>Description</h3>
                <PaddingWrap style={{ height: "100px", overflow: "auto" }}>
                  <div style={{ color: "#8a939b" }}>
                    By <span>{name} Deployer</span>
                  </div>
                  <div>{description}</div>
                </PaddingWrap>
              </DescriptionBox>
            </RightWrap>
          </RightPart>
        </Flex>
      </Container>
    </Background>
  );
}

export const ButtonWrap = styled.div`
  width: 300px;
  height: 45px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  color: white;
`;

export const NoSold = styled.div`
  height: 200px;
  font-size: 24px;
  ${(props) => props.theme.variables.flex}
`;

export const DescriptionBox = styled.div`
  ${(props) => props.theme.variables.flexGap("column", "0px")}
  border: 1px solid rgba(18, 18, 18, 0.12);
  color: rgb(18, 18, 18);
  background-color: rgb(253, 253, 253);
  border-radius: 10px;
  margin-bottom: 10px;

  h3 {
    border-bottom: 1px solid rgba(18, 18, 18, 0.12);
    padding: 10px;
  }
`;

export const PaddingWrap = styled.div`
  ${(props) => props.theme.variables.flexGap("column", "10px")}
  padding: 20px;
  font-size: 16px;
`;

export const PriceBox = styled(DescriptionBox)``;
export const PriceHistory = styled(DescriptionBox)``;
export const AttribuesBox = styled(DescriptionBox)`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
  li {
    ${(props) => props.theme.variables.flexColumn}
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #f4f4f4;
    font-weight: bold;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding: 10px 30px;
  flex-direction: row;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    flex-direction: column;
    padding: 10px 10px;
  }
`;
export const LeftPart = styled.div`
  width: 45%;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
`;
export const ImgBox = styled.div`
  width: 100%;
  height: 550px;
  border: 1px solid rgba(18, 18, 18, 0.12);
  border-radius: 12px;
  background-color: rgb(242, 244, 245);
  header {
    width: 100%;
    height: 40px;
    ${(props) => props.theme.variables.flexBetween};
    gap: 10px;
    padding: 5px 10px;
  }
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    height: auto;
  }
`;
export const ImgWrap = styled.div`
  width: 100%;
  height: calc(550px - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    height: auto;
  }
`;
export const RightPart = styled.div`
  width: 55%;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
`;

export const RightWrap = styled.div`
  /* {{ padding: '5px 0 0 20px' }} */
  padding: 5px 0 0 20px;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    padding: 0;
  }
`;

export const Background = styled.div`
  /* height: 100%; */
  padding-top: 72px;
  width: 100%;
  background-color: #ffffff;
  background-size: cover;
`;

export const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  /* padding: 0 50px 0 30px; */
`;

export const SymbolImg = styled.div`
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const ExpandImg = styled.div`
  width: 14px;
  height: 14px;
  img {
    width: 100%;
    height: 100%;
  }
`;
// export const ExpandImg = styled(ExpandIcon)`
//   width: 14px;
//   height: 14px;
//   fill: rgba(32, 129, 226, 0.8);
// `;

export const CartImg = styled.div`
  width: 20px;
  height: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const PurchaseBtn = styled.div`
  width: calc(100% - 56px);
  height: 100%;
  background-color: rgba(32, 129, 226, 1);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px 0 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(32, 129, 226, 0.8);
  }
`;

export const CartBtn = styled(PurchaseBtn)`
  width: 55px;
  border-radius: 0 10px 10px 0;
  height: 100%;
`;

export default NftDetail;
