import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useGetTokenData from "../hooks/useGetTokenData";
import { useContext, useEffect, useState } from "react";
import { P_updateMetadataPurchase, addCartHandler, getTargetNftToIpfsData, purchaseNftHandler } from "../hooks/common";
import iconCart from "../assets/images/icon-cart.png";
import { GlobalContext } from "../context/GlobalContext";

function NftDetail() {
  const params = useParams();
  const { ipfsHash, nftId } = params;
  const tokenData = useGetTokenData(ipfsHash);
  const { name, description, image, attributes } = tokenData;
  const { account } = useContext(GlobalContext);
  console.log('tokenData: ', tokenData);
  const [metadata, setMetadata] = useState({
    nftPrice: 0,
    owner: '',
    tokenUrl: '',
    isOnsale: "true",
    isCollection: "false",
    numberOfSales: 0,
    priceHistory: [],
  });

  useEffect(() => {
    async function fetchMetadata() {
      const res = await getTargetNftToIpfsData(ipfsHash);
      const _metadata = res.metadata.keyvalues;
      console.log('metadata: ', _metadata);
      setMetadata({ ..._metadata, tokenUrl: ipfsHash, priceHistory: JSON.parse(_metadata.priceHistory) });
    }
    fetchMetadata();
  }, []);

  const purchaseController = async (nftId, tokenUrl, nftPrice, account) => {
    const result = await purchaseNftHandler(nftId, tokenUrl, nftPrice, account);
    if (result) {
      alert('NFT 구매에 성공했습니다.');
    }
  }

  return (
    <Background>
      <Container>
        <Flex>
          <LeftPart>
            <ImgBox>
              <header>
                <div>
                  {/* 이더리움 등 icon */}
                  <icon />
                </div>
                <div>
                  {/* view original (pinata) */}
                  <icon />
                </div>
                <div>
                  {/* like icon */}
                  <icon />
                </div>
              </header>
              <ImgWrap>
                <img src={image} />
              </ImgWrap>
            </ImgBox>
          </LeftPart>
          <RightPart>
            <div style={{ padding: '5px 0 0 20px' }}>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h1>{name}</h1>
                  <div>Owned by <span style={{ color: "#2081e2cc" }}>{metadata.owner}</span></div>
                </div>
              </div>
              <PriceBox>
                <h3>
                  Price Info
                </h3>
                <p>
                  <span style={{ color: "#8a939b" }}>Current price</span> <br />
                  {metadata.nftPrice} ETH
                  <div>
                    <ButtonWrap>
                      <PurchaseBtn onClick={() => purchaseController(nftId, ipfsHash, metadata.nftPrice, account)}>지금 구매하기</PurchaseBtn>
                      <CartBtn onClick={() => addCartHandler(metadata, account)} >
                        <CartImg>
                          <img src={iconCart} alt="장바구니" />
                        </CartImg>
                      </CartBtn>
                    </ButtonWrap>
                  </div>
                </p>
              </PriceBox>
              <DescriptionBox>
                <h3>
                  Description
                </h3>
                <p>
                  <span style={{ color: "#8a939b" }}>By</span> <span>{name}Deployer</span> <br />
                  {description}
                </p>
              </DescriptionBox>
              <AttribuesBox>
                <h3>
                  Traits
                </h3>
                <p>
                  <ul>
                    {
                      attributes && attributes.map(attr => (
                        <li key={`nft-detail-${ipfsHash}-${nftId}`}>
                          <span>{attr.trait_type}</span>: {attr.value}
                        </li>
                      ))
                    }
                  </ul>
                </p>

              </AttribuesBox>
            </div>
          </RightPart>
        </Flex>
      </Container>
    </Background>
  );
}

const DescriptionBox = styled.div`
  ${props => props.theme.variables.flexGap('column', '0px')}
  border: 1px solid rgba(18, 18, 18, 0.12);
  color: rgb(18, 18, 18);
  background-color: rgb(253, 253, 253);
  border-radius: 10px;
  margin-bottom: 10px;

  h3 {
    border-bottom: 1px solid rgba(18, 18, 18, 0.12);
    padding: 10px;
  }
  p {
    padding: 20px;
    overflow: auto;
    height: 80px;
    font-size: 16px;
    span {
      /* font-weight: 600; */
    }
  }
`;

const PriceBox = styled(DescriptionBox)`
  p {
  }
`;
const AttribuesBox = styled(DescriptionBox)``;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding: 10px 30px;
`;
const LeftPart = styled.div`
  width: 45%;
`;
const ImgBox = styled.div`
  width: 100%;
  height: 550px;
  border: 1px solid rgba(18, 18, 18, 0.12);
  border-radius: 12px;
  background-color: rgb(242, 244, 245);
  header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
`;
const ImgWrap = styled.div`
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
`;
const RightPart = styled.div`
  width: 55%;
`;

const Background = styled.div`
  /* height: 100%; */
  padding-top: 72px;
  width: 100%;
  background-color: #ffffff;
  background-size: cover;
`;


const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  /* padding: 0 50px 0 30px; */
`;


const CartImg = styled.div`
  width: 16px;
  height: 16px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const PurchaseBtn = styled.div`
  width: calc(100% - 41px);
    height: 30px;
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

const CartBtn = styled(PurchaseBtn)`
  width: 40px;
  border-radius: 0 10px 10px 0;
  height: 30px;
`;

const ButtonWrap = styled.div`
  /* position: absolute;
  bottom: 0; */
  /* width: 100%; */
  width: 300px;
  display: flex;
  justify-content: space-between;
  color: white;
`;

export default NftDetail; 