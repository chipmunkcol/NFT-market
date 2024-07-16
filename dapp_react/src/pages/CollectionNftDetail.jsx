import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useGetTokenData from "../hooks/useGetTokenData";
import { useContext, useEffect, useState } from "react";
import { addCartHandler, formatPrice, getCurrentYMD, getImageUrl, getIpfsTokenData, getTargetNftToIpfsData, purchaseNftHandler } from "../hooks/common";
import iconCart from "../assets/images/icon-cart-wh.png";
import sepoliaSymbol from "../assets/images/sepolia-symbol.png";
import { GlobalContext } from "../context/GlobalContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, } from "recharts";
import { ReactComponent as expandIcon } from "../assets/images/icon-expand.svg";
import Swal from "sweetalert2";
import { Confirm, toastSwal } from "../hooks/swal";
import useAsyncTask from "../hooks/useAsyncTask";
import * as Styled from "./NftDetail";

function CollectionNftDetail() {
  const params = useParams();
  const { ipfsHash, nftId } = params;
  const nftIdByParam = Number(nftId);

  // const tokenData = useGetTokenData(ipfsHash);
  const { handleWithLoading } = useAsyncTask();
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState({});
  // const { name, description, image, attributes } = tokenData;
  const { account, signer } = useContext(GlobalContext);
  console.log('tokenData: ', tokenData);
  const [metadata, setMetadata] = useState({
    nftPrice: 0,
    owner: '',
    tokenUrl: '',
    fileName: '',
    nftId: 0,
    isOnsale: "true",
    isCollection: "false",
    isReveal: "false",
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
      const _metadataList = JSON.parse(res.metadata.keyvalues.nftKeyvaluesList);
      const targetMetadata = _metadataList.filter(metadata => metadata.nftId === nftIdByParam);
      // console.log('metadata: ', _metadata);
      const priceHistory = JSON.parse(targetMetadata[0].priceHistory);
      console.log('priceHistory: ', priceHistory);
      const newPriceHistory = getNewPriceHistory(priceHistory);
      setMetadata({ ...targetMetadata[0], tokenUrl: ipfsHash, priceHistory: newPriceHistory });
      // let temp = [{ soldTime: '2024-05-01', nftPrice: 0.1 }, { soldTime: '2024-05-06', nftPrice: 0.7 },
      // { soldTime: '2024-05-11', nftPrice: 1.3 }, { soldTime: '2024-05-20', nftPrice: 3 }];
      // setMetadata({ ..._metadata, tokenUrl: ipfsHash, priceHistory: temp });
    }
    fetchMetadata();
  }, []);

  useEffect(() => {

    async function fetchIpfsData() {
      try {
        let tokenData;
        if (metadata.isReveal) {
          const revealedTokenUrl = `${ipfsHash}/${metadata.fileName}`;
          tokenData = await getIpfsTokenData(revealedTokenUrl);
        } else {
          tokenData = await getIpfsTokenData(ipfsHash);
        }
        setTokenData(tokenData);
      } catch (error) {
        console.error('Error fetching IPFS data:', error);
      }
    }

    fetchIpfsData();
  }, [metadata]);

  const purchaseController = async (nftId, tokenUrl, nftPrice, account) => {
    if (account === '' || !account) {
      toastSwal('메타마스크 지갑을 연결해주세요.', 'warning');
      return;
    }

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
    if (account === '' || !account) {
      toastSwal('메타마스크 지갑을 연결해주세요.', 'warning');
      return;
    }

    if (metadata.owner === account) {
      toastSwal('자신의 NFT는 장바구니에 담을 수 없습니다.', 'warning');
      return;
    }
    const result = await handleWithLoading(() => addCartHandler(metadata, account), '장바구니에 추가중입니다');
    if (result) {
      toastSwal('장바구니에 추가되었습니다.');
    }
  }

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


  return (
    <Styled.Background>
      <Styled.Container>
        <Styled.Flex>
          <Styled.LeftPart>
            <Styled.ImgBox>
              <header>
                <div>
                  {/* 이더리움 등 icon */}
                  <Styled.SymbolImg>
                    <img src={sepoliaSymbol} alt="sepolia-symbol" />
                  </Styled.SymbolImg>
                </div>
                <div>
                  <div>
                    {/* view original (pinata) */}
                    <a href={getImageUrl(tokenData.image)} target="_blank" >
                      <Styled.ExpandImg />
                    </a>
                  </div>
                  <div>
                    {/* like icon */}
                    <icon />
                  </div>
                </div>
              </header>
              <Styled.ImgWrap>
                <img src={getImageUrl(tokenData.image)} />
              </Styled.ImgWrap>
            </Styled.ImgBox>

            <Styled.AttribuesBox style={{ marginTop: '20px' }}>
              <h3>
                Traits
              </h3>
              <p>
                <ul>
                  {
                    (typeof (tokenData?.attributes) === 'object' && tokenData.attributes?.length > 0) ? tokenData.attributes.map(attr => (
                      <li key={`nft-detail-${ipfsHash}-${nftId}`}>
                        <div style={{ fontSize: '12px', color: '#545454' }}>{attr.trait_type}</div>
                        <div style={{ fontSize: '14px', color: '#121212' }}>{attr.value}</div>
                      </li>
                    )) :
                      <li>None</li>
                  }
                </ul>
              </p>

            </Styled.AttribuesBox>
          </Styled.LeftPart>
          <Styled.RightPart>
            <Styled.RightWrap>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h1>{tokenData.name}</h1>
                  <div>Owned by <span style={{ color: "#2081e2cc" }}>{metadata.owner}</span></div>
                </div>
              </div>
              <Styled.PriceBox>
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
                    <Styled.ButtonWrap>
                      <Styled.PurchaseBtn onClick={() => purchaseController(nftIdByParam, ipfsHash, metadata.nftPrice, account)}>지금 구매하기</Styled.PurchaseBtn>
                      <Styled.CartBtn onClick={() => addCartController(metadata, account)} >
                        <Styled.CartImg>
                          <img src={iconCart} alt="장바구니" />
                        </Styled.CartImg>
                      </Styled.CartBtn>
                    </Styled.ButtonWrap>
                  </div>
                </p>
              </Styled.PriceBox>
              <Styled.PriceHistory>
                <h3>
                  Price Info
                </h3>
                <p style={{ fontSize: '11px' }}>
                  {/* <div style={{ display: 'flex' }}> */}
                  <span>Volume (ETH)</span>

                  {/* 그래프 라이브러리 */}
                  {/* 그래프 라이브러리 */}
                  <LineChart width={mobileSize ? 300 : 600} height={200} data={metadata.priceHistory} >
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    {/* <CartesianGrid stroke="#ccc" /> */}
                    <XAxis dataKey="soldTime" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                  {/* </div> */}
                </p>

              </Styled.PriceHistory>
              <Styled.DescriptionBox>
                <h3>
                  Description
                </h3>
                <p style={{ height: '100px', overflow: 'auto' }}>
                  <div style={{ color: '#8a939b' }}>By <span>{name}Deployer</span></div>
                  <div>{tokenData.description}</div>
                </p>
              </Styled.DescriptionBox>
            </Styled.RightWrap>
          </Styled.RightPart>
        </Styled.Flex>
      </Styled.Container>
    </Styled.Background>
  );
}

export default CollectionNftDetail; 