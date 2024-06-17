import styled from "styled-components";
import * as Styled from '../../components/NftCard'
import useGetTokenData from "../../hooks/useGetTokenData";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../hooks/common";
// import { getTruncatedAccount } from "../../hooks/common";

export default function OnsaleNftCard({ nft, account }) {
  const { nftId, nftName, tokenUrl, nftPrice, collectionIpfs, fileName } = nft;
  const toeknUrlRevealedCheck = (collectionIpfs && tokenUrl !== collectionIpfs) ? `${tokenUrl}/${fileName}` : tokenUrl;
  const tokenData = useGetTokenData(toeknUrlRevealedCheck);
  const { description, image, attributes } = tokenData;

  const navigate = useNavigate();
  const navigateDetailPage = () => {
    if (collectionIpfs) {
      navigate(`/nft-detail/collection/${tokenUrl}/${nftId}`);
    }
    else {
      navigate(`/nft-detail/${tokenUrl}/${nftId}`);
    }
  }

  const truncatedDes = description?.length > 15 ? description?.slice(0, 15) + '...' : description;


  return (
    <Styled.Container>
      {/* <NonSaleNftCard nftHash={nftHash} /> */}
      <ImgWrap onClick={navigateDetailPage}>
        {/* <Styled.Img src={imageUrl} alt="NFT image" /> */}
        <BgImg $src={image} alt="NFT image" />
      </ImgWrap>
      <Content>
        <Styled.Name>{nftName}</Styled.Name>
        <OnsalePriceWrap>
          Price : {nftPrice} ETH ($
          {formatPrice(Number(nftPrice) * 2928)}
          )
        </OnsalePriceWrap>
      </Content>
      {/* {
        account &&
        <div style={{ color: '#cccccc' }}>Ownered by: {getTruncatedAccount(account)}</div>
      } */}
      <div>
        {truncatedDes && truncatedDes}
      </div>
      {/* <div>
        {attributes && typeof (attributes) === 'object' &&
          attributes.map(attr => (
            <div key={attr.trait_type}>{attr.trait_type} : {attr.value}</div>
          ))
        }
      </div> */}
    </Styled.Container>
  );
}


const BgImg = styled.div`
  width: 100%;
  height: 100%;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  /* object-fit: cover; */
  background-image: url(${props => props.$src});
  background-size: 100%;
  background-position: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-size: 110%;
  }
`;

const Content = styled.div`
  /* height: 100px; */
  padding-top: 10px;
  padding-bottom: 20px;
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
    border-radius: 0 0 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: rgba(32, 129, 226, 0.8);
    }
`;

const CartBtn = styled(PurchaseBtn)`
  width: 40px;
  border-radius: 0 0 10px 0;
  height: 30px;
`;

const ImgWrap = styled.div`
  width: ${props => props.$gridCss?.cardWidth ? props.$gridCss.cardWidth : '193px'};
  height: ${props => props.$gridCss?.cardWidth ? props.$gridCss.cardWidth : '193px'};
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;

  cursor: pointer;
`;

const ButtonWrap = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: white;
`;

const OnsalePriceWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;
