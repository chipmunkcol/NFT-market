import React, { useState, useEffect, useContext } from "react";
import { MintContract, MintAddress, web3 } from "../../contracts/index";
// import NonSaleNftCard from "../components/NonSaleNftCard";
import styled from "styled-components";
import saleNftCard from "../components/NonSaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import { ReactComponent as iconEther } from '../assets/images/icon-ether.svg';
import NonSaleNftCard from "../components/NonSaleNftCard";

const MyPage = () => {
  // const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  // console.log("account: ", account);
  // const [myNfts, setMyNfts] = useState([]);
  const { account, myNfts, setMyNfts } = useContext(GlobalContext);
  const [approvedState, setApprovedState] = useState(false);

  const getApprovedStatus = async () => {
    if (!account) return;

    try {
      const res = await MintContract.methods
        .isApprovedForAll(account, MintAddress).call();
      // console.log('res: ', res);
      setApprovedState(res);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const alertAleadyApproved = () => {
    alert('이미 승인되었습니다');
  }

  const approvedNftHandler = async () => {
    if (!account) {
      alert('Please connect your wallet first!');
      return;
    }
    if (myNfts.length < 1) {
      alert('You have no NFTs to approve');
      return;
    }

    try {
      const res = await MintContract.methods.setApprovalForAll(MintAddress, !approvedState).send({ from: account });
      console.log('res: ', res);
      if (res.status) {
        setApprovedState(!approvedState);
      }
    } catch (err) {
      console.log('err: ', err);
    }
  };
  
  const getMyNfts = async () => {
    if (!account) return;

    try {
      const myNfts = await MintContract.methods.getNftsByOwner(account).call();
      if (myNfts.length < 1) return;

      const newMyNfts = [];
      myNfts.map(myNft => {
        const { id, name, description, image } = myNft;
        const parsedId = parseInt(id, 10);
        // const parsedPrice = parseInt(nftPrice, 10);
        // const etherPrice = Number(web3.utils.fromWei(parsedPrice.toString(), 'ether'));
        newMyNfts.push({ id: parsedId, name, description, image });
      });

      setMyNfts(newMyNfts);
    } catch (error) {
      console.log(error);
    }
  };

  async function init() {
    await getMyNfts();
    await getApprovedStatus();
  }

  useEffect(() => {
    setMyNfts([]);
    init();
  }, [account]);


  // truncate account
  const [truncatedAccount, setTruncatedAccount] = useState(null);
  useEffect(() => {
    if (!account) return;
    setTruncatedAccount(`${account?.substring(0, 6)}...${account?.substring(account?.length - 4)}`);
  }, [account]);


  return (
    <Background>
      <Container>
        <ProfileContainer>
          <P_Background />
          <P_Img>
            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="profile" />
          </P_Img>
          <P_Info>
            <h1>name</h1>
            <FlexWrap>
              <P_IconWrap>
                <IconEther />
              </P_IconWrap>
              <p>{truncatedAccount}</p>
            </FlexWrap>
          </P_Info>
        </ProfileContainer>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '1rem 2rem', gap: '30px', marginTop: "20px" }}>
          <div>
            <NavButton>
              Collected
            </NavButton>
          </div>
          <div>
            <NavButton>
              Favorited
            </NavButton>
          </div>
          <div style={{ position: 'absolute', bottom: '0px', width: 'calc(100% - 2rem)', height: '1px', borderBottom: '1px solid #cccccc' }}></div>

        </div>

        <FlexWrap $justifyContent={'space-between'} style={{ padding: '1rem 2rem' }}>
          <LeftPart>
            <div>
              <NavButton>
                All
              </NavButton>
            </div>
            <div>
              <NavButton>
                Non sale
              </NavButton>
            </div>
            <div>
              <NavButton>
                On sale
              </NavButton>
            </div>
            <div>
              <NavButton>
                Sold
              </NavButton>
            </div>
          </LeftPart>
          <RightPart>
            <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>{myNfts.length > 0 ? myNfts.length : 0} deals</div>
            <Button $isApproved={approvedState} onClick={!approvedState ? approvedNftHandler : alertAleadyApproved} >{approvedState ? 'Approved' : 'Not approved'}</Button>

            {myNfts.length > 0 && (
              <MyNftsWrap>
                {myNfts.map((nft, index) => (
                  <NonSaleNftCard key={index} nft={nft} account={account} />
                ))}
              </MyNftsWrap>
            )}
            {myNfts.length < 1 && <h2>No NFTs</h2>}
          </RightPart>
        </FlexWrap>



      </Container>
    </Background>
  );
};

const NavButton = styled.button`
  padding: 12px 24px;
  display: inline-block;
  border-radius: 0.75rem;

  &:hover {
    background-color: rgba(18, 18, 18, 0.04);
    /* border: 1px solid #f6f6f6; */
  }
`;

const LeftPart = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const RightPart = styled.div`
  width: 70%;
`;

const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
`;
const P_Background = styled.div`
  width: 100%;
  height: 320px;
  background-color: #f5f5f5;
  margin-bottom: 50px;
`;
const P_Img = styled.div`
  position: absolute;
  top: 180px;
  left: 2rem;
  /* transform: translateX(-50%); */
  width: 168px;
  height: 168px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid white;
  box-shadow:rgba(0, 0, 0, 0.08) 0px 4px 16px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const P_Info = styled.div`
  padding: 0 50px 0 2rem;
  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    font-weight: 400;
  }
`;
const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$justifyContent ? props.$justifyContent : ''};
`;

const P_IconWrap = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  /* background-color: #f5f5f5; */
  margin-right: 10px;
  /* i {
    width: 100%;
    height: 100%;
    background-color: #000;
    border-radius: 50%;
  } */
`;
const IconEther = styled(iconEther)`
  width: 20px;
  height: 20px;
`;

const Button = styled.button`
  background-color: ${props => props.$isApproved ? 'green' : 'red'};
  color: white;
  border: none;
  border-radius: 3px;
  height: 45px;
  cursor: pointer;
`;

const MyNftsWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 1rem 0;
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

export default MyPage;


  // smartcontract 에서 가져오는게 맞는가?

  
  // const getMyNftByIpfs = async () => {
  //   if (!account) return;

  //   const options = { method: 'GET', headers: { Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}` } };
  //   const metadataQuery = encodeURIComponent(`{"value":"${account}", "op":"iLike"}`);
  //   fetch(`https://api.pinata.cloud/data/pinList?metadata[keyvalues][owner]=${metadataQuery}`, options)
  //     // fetch('https://api.pinata.cloud/data/pinList', options)
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response);

  //     })
  //     .catch(err => console.error(err));
  // };

  
  // const getMyNftByIpfs = async () => {
  //   if (!account) return;

  //   const options = { method: 'GET', headers: { Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}` } };
  //   const metadataQuery = encodeURIComponent(`{"value":"${account}", "op":"iLike"}`);
  //   fetch(`https://api.pinata.cloud/data/pinList?metadata[keyvalues][owner]=${metadataQuery}`, options)
  //     // fetch('https://api.pinata.cloud/data/pinList', options)
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response);

  //     })
  //     .catch(err => console.error(err));
  // };