import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { MintContract } from "../../../contracts";
import NonSaleNftCard from "../../components/NonSaleNftCard";
import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";

const All = () => {
  const { account, myNfts, setMyNfts } = useContext(GlobalContext);

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
  }

  useEffect(() => {
    setMyNfts([]);
    init();
  }, [account]);

  return (
    <div>
      {myNfts.length > 0 && (
        <MyNftsWrap>
          {/* {myNfts.map(nft => ( */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(nft => (
            nft.isOnsale ?
              <NonSaleNftCard key={nft.id} nft={nft} account={account} /> :
              <OnsaleNftCard key={nft.id} nft={nft} account={account} />
          ))}
        </MyNftsWrap>
      )}
      {myNfts.length < 1 && <h2>No NFTs</h2>}
    </div>
  );
}

const MyNftsWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 1rem 0;
`;

export default All;