import React, { useState, useEffect, useContext } from "react";
import { MintContract, SaleAddress, web3 } from "../../contracts/index";
// import NftCard from "../components/NftCard";
import styled from "styled-components";
import SaleNftCard from "../components/SaleNftCard";
import { GlobalContext } from "../context/GlobalContext";

const MyPage = ({ account }) => {
  // const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  // console.log("account: ", account);
  // const [myNfts, setMyNfts] = useState([]);
  const { myNfts, setMyNfts } = useContext(GlobalContext);
  const [approvedState, setApprovedState] = useState(false);

  const getApprovedStatus = async () => {
    if (!account) return;

    try {
      const res = await MintContract.methods
        .isApprovedForAll(account, SaleAddress).call();
      // console.log('res: ', res);
      setApprovedState(res);
    } catch (err) {
      console.log('err: ', err);
    }
  };

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
      const res = await MintContract.methods.setApprovalForAll(SaleAddress, !approvedState).send({ from: account });
      console.log('res: ', res);
      if (res.status) {
        setApprovedState(!approvedState);
      }
    } catch (err) {
      console.log('err: ', err);
    }
  };


  const getNft = async () => {
    if (!account) return;

    try {
      const myNfts = await MintContract.methods.getNfts(account).call();
      if (myNfts.length < 1) return;

      const newMyNfts = [];
      myNfts.map(myNft => {
        const { nftId, nftUrl, nftPrice } = myNft;
        const parsedId = parseInt(nftId, 10);
        const parsedType = parseInt(nftUrl, 10);
        const parsedPrice = parseInt(nftPrice, 10);
        const etherPrice = web3.utils.fromWei(parsedPrice.toString(), 'ether');
        newMyNfts.push({ nftId: parsedId, nftUrl: parsedType, nftPrice: etherPrice });
      });

      setMyNfts(newMyNfts);
    } catch (error) {
      console.log(error);
    }
  };

  async function connectSaleNftOnMintContract() {
    await MintContract.methods.setSaleNft(SaleAddress).send({ from: account });
  }

  async function init() {
    await connectSaleNftOnMintContract();
    await getNft();
    await getApprovedStatus();
  }

  useEffect(() => {
    init();
    setMyNfts([]);
  }, [account]);


  return (
    <div>
      <h1>My Page</h1>
      <div>
        <h2>판매 승인 상태</h2>
        <S_Button $isApproved={approvedState} onClick={approvedNftHandler} >{approvedState ? 'Approved' : 'Not approved'}</S_Button>
      </div>
      {myNfts.length > 0 && (
        <MyNftsWrap>
          {myNfts.map((nft, index) => (
            <SaleNftCard key={index} nft={nft} account={account} />
          ))}
        </MyNftsWrap>
      )}
      {myNfts.length < 1 && <h2>No NFTs</h2>}
    </div>
  );
};


// interface IsApprovedState {
//   readonly approvedState: boolean;
// };

const S_Button = styled.button`
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
`;

export default MyPage;


