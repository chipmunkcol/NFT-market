import { useState, useEffect, useContext } from "react";
import { MintContract, web3 } from "../../contracts/index";
// import NonSaleNftCard from "../components/NonSaleNftCard";
import styled from "styled-components";
import { GlobalContext } from "../context/GlobalContext";
// import iconEther from '../assets/images/icon-ether.svg';
import iconEther from "../assets/images/icon-ether.png";
import { Link, Outlet } from "react-router-dom";
import AirdropNftCard from "./mypageComponents/AirdropNftCard";
import { toastSwal } from "../hooks/swal";
import { MyCollection, MyNft } from "../../types/contract";
import { GlobalContextType } from "../../type";
import { MatchPrimitiveType } from "web3";

const MyPage = () => {
  const { account, setMyNfts } = useContext(GlobalContext) as GlobalContextType;

  const getEthPrice = (weiPrice: MatchPrimitiveType<"uint256", unknown>) => {
    return web3.utils.fromWei(weiPrice, "ether");
  };

  const getMyNfts = async () => {
    if (!account) return;

    try {
      const myNfts = await MintContract.methods.getMyNfts(account).call();
      // console.log('myNfts: ', myNfts);
      if (!myNfts) return;

      const newMyNfts: MyNft[] = [];
      myNfts.map((myNft) => {
        const { nftId, nftName, tokenUrl, nftPrice, tempTokenUrl, fileName } =
          myNft;
        const parsedId = parseInt(nftId.toString());
        const parsedEthPrice = Number(getEthPrice(nftPrice));
        newMyNfts.push({
          nftId: parsedId,
          nftName,
          tokenUrl,
          nftPrice: parsedEthPrice,
          collectionIpfs: tempTokenUrl,
          fileName,
        });
      });

      setMyNfts(newMyNfts);
      console.log("newMyNfts: ", newMyNfts);
    } catch (error) {
      console.log(error);
    }
  };

  // air drop
  const [myCollections, setMyCollections] = useState<MyCollection[]>([]);
  const getMyCollections = async () => {
    if (!account) return;

    try {
      const myCollections = await MintContract.methods
        .getMyCollections(account)
        .call();
      // console.log('myCollection: ', myCollection);
      const notRevealedCollections = myCollections.filter(
        (collection) => collection.isReveal === false
      );
      const newCollections = notRevealedCollections.map((collection) => {
        return {
          ...collection,
          ids: collection.ids.map((id) => parseInt(id.toString())),
        };
      });

      setMyCollections(newCollections);
    } catch (error) {
      console.log(error);
    }
  };

  async function init() {
    await getMyNfts();
    await getMyCollections();
  }

  useEffect(() => {
    init();
  }, [account]);

  // truncate account
  const [truncatedAccount, setTruncatedAccount] = useState<null | string>(null);
  useEffect(() => {
    if (!account) return;
    setTruncatedAccount(
      `${account?.substring(0, 6)}...${account?.substring(account?.length - 4)}`
    );
  }, [account]);

  const copyHandler = async () => {
    if (account) {
      await navigator.clipboard.writeText(account);
      toastSwal("Copied to clipboard");
    }
  };

  return (
    <Background>
      <Container>
        <ProfileContainer>
          <P_Background />
          <P_Img>
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt="profile"
            />
          </P_Img>
          <P_Info>
            <h1>name</h1>
            <FlexWrap>
              <P_IconWrap>
                <EtherImg>
                  <img src={iconEther} alt="ether-icon" />
                </EtherImg>
              </P_IconWrap>
              <p onClick={copyHandler} style={{ cursor: "pointer" }}>
                {truncatedAccount}
              </p>
            </FlexWrap>
          </P_Info>
        </ProfileContainer>

        <NavContainer>
          <div
            style={{
              position: "absolute",
              top: "0px",
              width: "calc(100% - 2rem)",
              height: "1px",
              borderBottom: "1px solid #cccccc",
            }}
          ></div>
          <div style={{ display: "flex" }}>
            <NavButton>Air drop</NavButton>
            <div style={{ width: "100%" }}>
              <ul style={{ padding: "0 7rem" }}>
                {myCollections.length > 0 &&
                  myCollections.map((collection) => (
                    <AirdropNftCard collection={collection} account={account} />
                  ))}
              </ul>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              width: "calc(100% - 2rem)",
              height: "1px",
              borderBottom: "1px solid #cccccc",
            }}
          ></div>
        </NavContainer>

        <MainBox>
          <LeftPart>
            <div>
              <Link to={""}>
                <NavButton>All</NavButton>
              </Link>
            </div>
            <div>
              <Link to={"non-sale"}>
                <NavButton>Non sale</NavButton>
              </Link>
            </div>
            <div>
              <Link to={"on-sale"}>
                <NavButton>On sale</NavButton>
              </Link>
            </div>
            {/* <div>
                <Link to={"sold"}>
              <NavButton>
                  Sold
              </NavButton>
                </Link>
            </div> */}
          </LeftPart>
          <RightPart>
            <Outlet />
          </RightPart>
        </MainBox>
      </Container>
    </Background>
  );
};

const EtherImg = styled.div`
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const NavContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  min-height: 100px;
  gap: 30px;
  margin-top: 20px;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    padding: 1rem 1rem;
  }
`;

const MainBox = styled.div`
  /* $justifyContent={'space-between'} style={{ padding: '1rem 2rem', maxHeight:'500px' }} */
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-height: 500px;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    flex-direction: column;
    padding: 1rem 0rem;
  }
`;

const NavButton = styled.button`
  padding: 12px 24px;
  display: inline-block;
  border-radius: 0.75rem;
  min-width: 180px;

  &:hover {
    background-color: rgba(18, 18, 18, 0.04);
    /* border: 1px solid #f6f6f6; */
  }
`;

const LeftPart = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const RightPart = styled.div`
  width: 80%;
  overflow-y: auto;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
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
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
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
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    padding: 0 1rem;
  }
`;
const FlexWrap = styled.div<{ $justifyContent?: string }>`
  display: flex;
  /* align-items: center; */
  justify-content: ${(props) =>
    props.$justifyContent ? props.$justifyContent : ""};
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
// const IconEther = styled(iconEther)`
//   width: 20px;
//   height: 20px;
// `;
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

// const alertAleadyApproved = () => {
//   toastSwal('이미 승인되었습니다');
// }

// const approvedNftHandler = async () => {
//   if (!account) {
//     toastSwal('Please connect your wallet first!');
//     return;
//   }
//   if (myNfts.length < 1) {
//     toastSwal('You have no NFTs to approve');
//     return;
//   }

//   try {
//     const res = await MintContract.methods.setApprovalForAll(MintAddress, !approvedState).send({ from: account });
//     console.log('res: ', res);
//     if (res.status) {
//       setApprovedState(!approvedState);
//     }
//   } catch (err) {
//     console.log('err: ', err);
//   }
// };
