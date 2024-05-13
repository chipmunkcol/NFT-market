import styled from "styled-components";
import useGetImgaeUrl from "../../../hooks/useGetImageUrl";

const HomeNftCard = ({ nftData }) => {
  const { name, tokenUrl, keyvalues } = nftData;
  const imageUrl = useGetImgaeUrl(tokenUrl);

  return (
    <TopItemBox>
      <TopImgWrap>
        {imageUrl && <img src={imageUrl} />}
      </TopImgWrap>
      <TopContent>
        <h3>{name}</h3>
        {
          nftData.soldPrice ? (
            <p>{nftData.soldPrice} ETH</p>
          ) : <p>{keyvalues.nftPrice} ETH</p>
        }
      </TopContent>
    </TopItemBox>
  )
}

export default HomeNftCard;


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