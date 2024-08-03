import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  addCartHandler,
  formatPrice,
  getCurrentYMD,
  getImageUrl,
  getIpfsTokenData,
  getTargetCollectionToIpfsData,
  purchaseNftHandler,
  validateAccountAndOnsale,
} from "../hooks/common";
import iconCart from "../assets/images/icon-cart-wh.png";
import sepoliaSymbol from "../assets/images/sepolia-symbol.png";
import { GlobalContext } from "../context/GlobalContext";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import ExpandIcon from "../assets/images/icon-expand.png";
import { Confirm, toastSwal } from "../hooks/swal";
import useAsyncTask from "../hooks/useAsyncTask";
import * as Styled from "./NftDetail";
import {
  CollectionNft,
  CollectionNftByJson,
  GlobalContextType,
  Nft,
  PriceHistoryT,
} from "../../type";
import { JsonRpcSigner } from "ethers";

function CollectionNftDetail() {
  const params = useParams();
  const { ipfsHash, nftId } = params;
  const nftIdByParam = Number(nftId);

  // const tokenData = useGetTokenData(ipfsHash);
  const { handleWithLoading } = useAsyncTask();
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState<Nft>({
    name: "",
    description: "",
    image: "",
    attributes: [],
  });
  // const { name, description, image, attributes } = tokenData;
  const { account, signer } = useContext(GlobalContext) as GlobalContextType;
  const [metadata, setMetadata] = useState<CollectionNft>({
    name: "",
    fileName: "",
    owner: "",
    isCollection: "",
    nftPrice: 0,
    numberOfSales: 0,
    tags: "",
    nftId: 0,
    tokenUrl: "",
    isReveal: false,
    priceHistory: [],
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
      if (!ipfsHash) return;
      const res = await getTargetCollectionToIpfsData(ipfsHash);
      const _metadataList: CollectionNftByJson[] = JSON.parse(
        res.metadata?.keyvalues.nftKeyvaluesList
      );
      const targetMetadata = _metadataList.filter(
        (metadata) => metadata?.nftId === nftIdByParam
      );
      // console.log('metadata: ', _metadata);
      const priceHistory = JSON.parse(targetMetadata[0].priceHistory);
      // console.log("priceHistory: ", priceHistory);
      const newPriceHistory = getNewPriceHistory(priceHistory);
      setMetadata({
        ...targetMetadata[0],
        tokenUrl: ipfsHash,
        priceHistory: newPriceHistory,
      });
    }
    fetchMetadata();
  }, []);

  useEffect(() => {
    async function fetchIpfsData() {
      try {
        if (!ipfsHash || !metadata?.name) return;
        let tokenData;
        if (metadata?.isReveal) {
          const revealedTokenUrl = `${ipfsHash}/${metadata?.fileName}`;
          tokenData = await getIpfsTokenData(revealedTokenUrl);
        } else {
          tokenData = await getIpfsTokenData(ipfsHash);
        }
        setTokenData(tokenData);
      } catch (error) {
        console.error("Error fetching IPFS data:", error);
      }
    }

    fetchIpfsData();
  }, [metadata]);

  const purchaseController = async (
    nftId: number,
    tokenUrl: string,
    nftPrice: number,
    signer: JsonRpcSigner,
    account: string
  ) => {
    const validateResult = validateAccountAndOnsale(metadata, account);
    if (!validateResult) return;

    const result = await handleWithLoading(
      () => purchaseNftHandler(nftId, tokenUrl, nftPrice, signer),
      "NFT 구매중입니다"
    );
    if (!result) return;

    const confirmResult = await Confirm(
      "NFT 구매 성공",
      "MyPage로 확인하러 가기"
    );
    if (confirmResult.isConfirmed) {
      navigate(`/mypage/${account}`);
    } else {
      window.location.reload();
    }
  };

  const addCartController = async (
    metadata: CollectionNft,
    account: string
  ) => {
    const validateResult = validateAccountAndOnsale(metadata, account);
    if (!validateResult) return;

    const result = await handleWithLoading(
      () => addCartHandler(metadata, account),
      "장바구니에 추가중입니다"
    );
    if (result) {
      toastSwal("장바구니에 추가되었습니다.");
    }
  };

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
                    <a
                      href={`${import.meta.env.VITE_IPFS_URL}/${
                        tokenData?.image
                      }`}
                      target="_blank"
                    >
                      <Styled.ExpandImg>
                        <img src={ExpandIcon} alt="expand-icon" />
                      </Styled.ExpandImg>
                    </a>
                  </div>
                  <div>
                    {/* like icon */}
                    {/* <icon /> */}
                  </div>
                </div>
              </header>
              <Styled.ImgWrap>
                <img src={getImageUrl(tokenData?.image)} />
              </Styled.ImgWrap>
            </Styled.ImgBox>

            <Styled.AttribuesBox style={{ marginTop: "20px" }}>
              <h3>Traits</h3>
              <Styled.PaddingWrap>
                <ul>
                  {typeof tokenData?.attributes === "object" &&
                  tokenData?.attributes?.length > 0 ? (
                    tokenData?.attributes.map((attr) => (
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
              </Styled.PaddingWrap>
            </Styled.AttribuesBox>
          </Styled.LeftPart>
          <Styled.RightPart>
            <Styled.RightWrap>
              <div style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <h1>{tokenData?.name}</h1>
                  <div>
                    Owned by{" "}
                    <span style={{ color: "#2081e2cc" }}>
                      {metadata?.owner}
                    </span>
                  </div>
                </div>
              </div>
              <Styled.PriceBox>
                <h3>Price Info</h3>
                <Styled.PaddingWrap>
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
                      {metadata?.nftPrice} ETH
                    </span>
                    <span style={{ fontSize: "15px", color: "#545454" }}>
                      ($
                      {formatPrice(Number(metadata?.nftPrice) * 2928)})
                    </span>
                  </div>
                  <div>
                    <Styled.ButtonWrap>
                      <Styled.PurchaseBtn
                        onClick={() => {
                          if (ipfsHash && nftId && signer && account) {
                            purchaseController(
                              Number(nftId),
                              ipfsHash,
                              metadata?.nftPrice,
                              signer,
                              account
                            );
                          }
                        }}
                      >
                        지금 구매하기
                      </Styled.PurchaseBtn>
                      <Styled.CartBtn
                        onClick={() =>
                          account && addCartController(metadata, account)
                        }
                      >
                        <Styled.CartImg>
                          <img src={iconCart} alt="장바구니" />
                        </Styled.CartImg>
                      </Styled.CartBtn>
                    </Styled.ButtonWrap>
                  </div>
                </Styled.PaddingWrap>
              </Styled.PriceBox>
              <Styled.PriceHistory>
                <h3>Price Info</h3>
                <div style={{ fontSize: "11px", padding: "1rem" }}>
                  {/* <div style={{ display: 'flex' }}> */}
                  <span>Volume (ETH)</span>

                  {/* 그래프 라이브러리 */}
                  {/* 그래프 라이브러리 */}
                  <LineChart
                    width={mobileSize ? 300 : 600}
                    height={200}
                    data={metadata?.priceHistory}
                  >
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    {/* <CartesianGrid stroke="#ccc" /> */}
                    <XAxis dataKey="soldTime" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                  {/* </div> */}
                </div>
              </Styled.PriceHistory>
              <Styled.DescriptionBox>
                <h3>Description</h3>
                <Styled.PaddingWrap
                  style={{ height: "100px", overflow: "auto" }}
                >
                  <div style={{ color: "#8a939b" }}>
                    By <span>{tokenData?.name}Deployer</span>
                  </div>
                  <div>{tokenData?.description}</div>
                </Styled.PaddingWrap>
              </Styled.DescriptionBox>
            </Styled.RightWrap>
          </Styled.RightPart>
        </Styled.Flex>
      </Styled.Container>
    </Styled.Background>
  );
}

export default CollectionNftDetail;
