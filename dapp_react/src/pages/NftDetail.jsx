import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useGetTokenData from "../hooks/useGetTokenData";
import { useContext, useEffect, useState } from "react";
import { P_updateMetadataPurchase, addCartHandler, formatPrice, getCurrentYMD, getTargetNftToIpfsData, purchaseNftHandler } from "../hooks/common";
import iconCart from "../assets/images/icon-cart-wh.png";
import sepoliaSymbol from "../assets/images/sepolia-symbol.png";
import { GlobalContext } from "../context/GlobalContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, } from "recharts";
import { ReactComponent as expandIcon } from "../assets/images/icon-expand.svg";
import { Confirm, toastSwal } from "../hooks/swal";
import useAsyncTask from "../hooks/useAsyncTask";

function NftDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { handleWithLoading } = useAsyncTask();
  const { ipfsHash, nftId } = params;
  const tokenData = useGetTokenData(ipfsHash);
  const { name, description, image, attributes } = tokenData;
  const { account, signer } = useContext(GlobalContext);
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

  const getNewPriceHistory = (priceHistory) => {
    const newPriceHistory = priceHistory.reverse().map(price => {
      return {
        ...price,
        soldTime: getCurrentYMD(price.soldTime),
      }
    });
    return newPriceHistory;
  }

  useEffect(() => {
    async function fetchMetadata() {
      const res = await getTargetNftToIpfsData(ipfsHash);
      const _metadata = res.metadata.keyvalues;
      console.log('metadata: ', _metadata);
      const priceHistory = JSON.parse(_metadata.priceHistory);
      console.log('priceHistory: ', priceHistory);
      const newPriceHistory = getNewPriceHistory(priceHistory);
      setMetadata({ ..._metadata, tokenUrl: ipfsHash, priceHistory: newPriceHistory });
      // let temp = [{ soldTime: '2024-05-01', nftPrice: 0.1 }, { soldTime: '2024-05-06', nftPrice: 0.7 },
      // { soldTime: '2024-05-11', nftPrice: 1.3 }, { soldTime: '2024-05-20', nftPrice: 3 }];
      // setMetadata({ ..._metadata, tokenUrl: ipfsHash, priceHistory: temp });
    }
    fetchMetadata();
  }, []);

  const purchaseController = async (nftId, tokenUrl, nftPrice, account) => {
    if (metadata.owner.toLowerCase() === account.toLowerCase()) {
      toastSwal('자신의 NFT는 구매할 수 없습니다.', 'warning');
      return;
    }

    if (metadata.nftPrice === 0) {
      toastSwal('판매등록 되지 않은 NFT입니다', 'warning');
      return;
    }

    const result = await handleWithLoading(() => purchaseNftHandler(nftId, tokenUrl, nftPrice, signer), 'NFT 구매중입니다');
    if (!result) return;

    const confirmResult = await Confirm('NFT 구매 성공', 'MyPage로 확인하러 가기');
    if (confirmResult.isConfirmed) {
      navigate(`/mypage/${account}`)
    } else {
      window.location.reload();
    }
  }

  const addCartController = async (metadata, account) => {
    if (metadata.owner === account) {
      toastSwal('자신의 NFT는 장바구니에 담을 수 없습니다.', 'warning');
      return;
    }
    const result = await handleWithLoading(() => addCartHandler(metadata, account), '장바구니에 추가중입니다');
    if (result) {
      toastSwal('장바구니에 추가되었습니다.');
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
                  <SymbolImg>
                    <img src={sepoliaSymbol} alt="sepolia-symbol" />
                  </SymbolImg>
                </div>
                <div>
                  <div>
                    {/* view original (pinata) */}
                    <a href={image} target="_blank" >
                      <ExpandImg />
                    </a>
                  </div>
                  <div>
                    {/* like icon */}
                    <icon />
                  </div>
                </div>
              </header>
              <ImgWrap>
                <img src={image} />
              </ImgWrap>
            </ImgBox>

            <AttribuesBox style={{ marginTop: '20px' }}>
              <h3>
                Traits
              </h3>
              <p>
                <ul>
                  {
                    (typeof (attributes) === 'object' && attributes?.length > 0) ? attributes.map(attr => (
                      <li key={`nft-detail-${ipfsHash}-${nftId}`}>
                        <div style={{ fontSize: '12px', color: '#545454' }}>{attr.trait_type}</div>
                        <div style={{ fontSize: '14px', color: '#121212' }}>{attr.value}</div>
                      </li>
                    )) :
                      <li>None</li>
                  }
                </ul>
              </p>

            </AttribuesBox>
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
                  <div style={{ color: "#8a939b" }}>Current price</div>
                  <div>
                    <span style={{ fontSize: '30px', fontWeight: '700', color: '#121212', marginRight: '5px' }}>{metadata.nftPrice} ETH</span>
                    <span style={{ fontSize: '15px', color: '#545454' }}>($
                      {formatPrice(Number(metadata.nftPrice) * 2928)}
                      )</span>
                  </div>
                  <div>
                    <ButtonWrap>
                      <PurchaseBtn onClick={() => purchaseController(nftId, ipfsHash, metadata.nftPrice, account)}>지금 구매하기</PurchaseBtn>
                      <CartBtn onClick={() => addCartController(metadata, account)} >
                        <CartImg>
                          <img src={iconCart} alt="장바구니" />
                        </CartImg>
                      </CartBtn>
                    </ButtonWrap>
                  </div>
                </p>
              </PriceBox>
              <PriceHistory>
                <h3>
                  Price Info
                </h3>
                <p style={{ fontSize: '11px' }}>
                  {/* <div style={{ display: 'flex' }}> */}
                  <span>Volume (ETH)</span>

                  {/* 그래프 라이브러리 */}
                  {/* 그래프 라이브러리 */}
                  <LineChart width={600} height={200} data={metadata.priceHistory} >
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    {/* <CartesianGrid stroke="#ccc" /> */}
                    <XAxis dataKey="soldTime" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                  {/* </div> */}
                </p>

              </PriceHistory>
              <DescriptionBox>
                <h3>
                  Description
                </h3>
                <p style={{ height: '100px', overflow: 'auto' }}>
                  <div style={{ color: '#8a939b' }}>By <span>{name} Deployer</span></div>
                  <div>{description}</div>
                </p>
              </DescriptionBox>
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
    ${props => props.theme.variables.flexGap('column', '10px')}
    padding: 20px;
    font-size: 16px;
  }
`;

const PriceBox = styled(DescriptionBox)`
`;
const PriceHistory = styled(DescriptionBox)``;
const AttribuesBox = styled(DescriptionBox)`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
  li {
    ${props => props.theme.variables.flexColumn}
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #f4f4f4;
    font-weight: bold;
  }
`;

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
    ${props => props.theme.variables.flexBetween};
    gap: 10px;
    padding: 5px 10px;
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

const SymbolImg = styled.div`
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const ExpandImg = styled(expandIcon)`
  width: 14px;
  height: 14px;
  fill: rgba(32, 129, 226, 0.8);
`;


const CartImg = styled.div`
  width: 20px;
  height: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const PurchaseBtn = styled.div`
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

const CartBtn = styled(PurchaseBtn)`
  width: 55px;
  border-radius: 0 10px 10px 0;
  height: 100%;
`;

const ButtonWrap = styled.div`
  /* position: absolute;
  bottom: 0; */
  /* width: 100%; */
  width: 300px;
  height: 45px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  color: white;
`;

export default NftDetail; 