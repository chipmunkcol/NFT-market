import { useContext, useState } from "react";
import styled from "styled-components";
import { S_Button } from "../../styles/styledComponent";
import { useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { P_updateMetadataPurchase, P_updateMetadataRemoveAllCart, P_updateMetadataRemoveCart, getRemovedNftListByPurchase, getTargetNftToIpfsData } from "../../hooks/common";
import CartNftCard from "./CartNftCard";
import { SaleNftContract, web3 } from "../../../contracts";
import Spinner from "../../components/Spinner";
import useAsyncTask from "../../hooks/useAsyncTask";

function Cart({ cartModalClose }) {
  const { account } = useContext(GlobalContext);
  const cartIpfsHash = localStorage.getItem(`cart-${account}`);
  const [nftsInCart, setNftsInCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleWithLoading } = useAsyncTask();
  const onclick = e => {
    e.stopPropagation();
  }

  useEffect(() => {
    const getCartData = async () => {
      if (!cartIpfsHash) return;
      setIsLoading(true);
      const parsedCartIpfsHash = JSON.parse(cartIpfsHash);
      const res = await getTargetNftToIpfsData(parsedCartIpfsHash);
      const cartList = JSON.parse(res.metadata.keyvalues.cart);
      const newCartList = cartList.map(nft => ({ ...nft, checked: true }));
      setNftsInCart(newCartList);
      console.log('newCartList: ', newCartList);
      setIsLoading(false);
    }
    getCartData();
  }, [account]);

  // cart price
  const [cartPrice, setCartPrice] = useState(0);
  const [checkedList, setCheckedList] = useState([]);

  const calculateCartPrice = () => {
    const _cartPrice = nftsInCart?.reduce((acc, cur) => {
      if (cur.checked) {
        return acc + Number(cur.nftPrice);
      }
      return acc;
    }, 0) || 0;

    setCartPrice(_cartPrice);
  }
  const calculateCheckedList = () => {
    const _checkedList = nftsInCart?.filter(nft => nft.checked);
    setCheckedList(_checkedList);
  }

  useEffect(() => {
    calculateCartPrice();
    calculateCheckedList();
  }, [nftsInCart]);

  // file check

  const removeCheckdNft = (nft) => {
    const newNfts = [...nftsInCart];
    const removedNfts = newNfts.map(n => n.nftId === nft.nftId ? { ...n, checked: false } : n);
    setNftsInCart(removedNfts);
  }

  const addCheckedNft = (nft) => {
    const newNfts = [...nftsInCart];
    const addedNfts = newNfts.map(n => n.nftId === nft.nftId ? { ...n, checked: true } : n);
    setNftsInCart(addedNfts);
  }

  const R_removeCartHandler = (nft) => {
    const newNfts = [...nftsInCart];
    const removedNfts = newNfts.filter(n => n.nftId !== nft.nftId);
    setNftsInCart(removedNfts);
  }

  const R_removeAllCartHandler = () => {
    setNftsInCart([]);
  }

  const propsFunction = {
    removeCheckdNft,
    addCheckedNft,
    R_removeCartHandler
  };

  const removeAllCartHandler = async () => {
    let cartIpfsHash = localStorage.getItem(`cart-${account}`);
    if (!cartIpfsHash) return;

    const paredCartIpfsHash = JSON.parse(cartIpfsHash);

    const updateMetadataResult = await handleWithLoading(P_updateMetadataRemoveAllCart(paredCartIpfsHash), '장바구니에서 삭제 중입니다');
    if (updateMetadataResult.ok) {
      R_removeAllCartHandler();
    }
  }

  const purchaseNftHandler = async (nft) => {
    const { nftId, nftPrice, tokenUrl } = nft;
    try {
      const ipfsData = await getTargetNftToIpfsData(tokenUrl);
      const updateResult = await P_updateMetadataPurchase(nftId, ipfsData, account);
      if (!updateResult.ok) return;

      const weiPrice = web3.utils.toWei(nftPrice, 'ether');
      const res = await SaleNftContract.methods.purchaseNft(nftId).send({ from: account, value: weiPrice });
      // console.log('res: ', res);
      if (res.status) {
        // 로딩 스피너 걸어주자
      }
      return true;
    } catch (err) {
      console.log('err: ', err);
      return false;
    }
  }

  const purchaseNftController = () => {
    const promises = checkedList.map(nft => purchaseNftHandler(nft));

    Promise.all(promises).then(() => {
      alert('NFT 구매가 완료되었습니다.');
    });
  }

  return (
    <Overlay onClick={cartModalClose}>
      <Container onClick={onclick}>
        <div style={{ width: '100%', padding: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #cccccc' }}>
          <h2>Your cart</h2>
          <h4>Price : {cartPrice} ETH</h4>
          <CloseBtnWrap onClick={cartModalClose}>
            <button>x</button>
          </CloseBtnWrap>
        </div>
        <ItemBox>
          {/* {nftsInCart.length > 0 ? (
            <> */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>

            <div style={{ marginLeft: '8px', fontSize: '14px', fontWeight: '600' }}>
              {checkedList.length} items
            </div>
            {nftsInCart.length > 0 &&
              <DeleteAll onClick={removeAllCartHandler}>
                <span>전체 삭제</span>
              </DeleteAll>
            }
          </div>
          {isLoading ? <Spinner _custom={{
            color: '#3498db',
            size: '20px',
            height: '150px'
          }} /> :
            nftsInCart.length > 0 &&
            <ItemWrap>
              {nftsInCart.map((nft) => {
                return (
                  <CartNftCard key={`cart-${nft.nftId}`} nft={nft} propsFunction={propsFunction} />
                )
              })}
            </ItemWrap>
          }
          {
            !isLoading && nftsInCart.length === 0 && <div style={{ textAlign: 'center' }}>장바구니가 비어있습니다.</div>
          }
        </ItemBox>
        <CartBottom>
          <BtnWrap onClick={purchaseNftController}>
            <button>구매하기</button>
          </BtnWrap>
        </CartBottom>
      </Container>
    </Overlay>
  )
}

const DeleteAll = styled.div`
font-size: 11px;
  cursor: pointer;
    &:hover {
      color: #e25120;
      text-decoration: underline;
    }
`;

const SelectBox = styled.div`
  width: 17px;
  height: 17px;
  input {
    width: 100%;
    height: 100%;
  }
`;

const CartBottom = styled.div`
  width: 100%;
  height: 45px;
  background-color: rgba(32, 129, 226, 1);
  
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const BtnWrap = styled.div`
  button {
    color: #ffffff;
    font-weight: 700;
  }
`;

const CloseBtnWrap = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  &:hover {
    background-color: #cccccc;
  }
  cursor: pointer;
`;

const ItemWrap = styled.ul`
  display: flex;
  /* align-items: center; */
  gap: 1rem;
  flex-direction: column;
`;

const ItemBox = styled.div`
  width: 100%;
  padding: 1rem 1.3rem 1.3rem 1rem;
  height: calc(100% - 105px);
  overflow: auto;
  /* display: flex; */
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const Container = styled.div`
      width: 360px;
    height: 380px;
    z-index: 150;
    /* position: absolute; */
    position: relative;
    top: 45%;
    left: 84%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    background-color: white;
    justify-content: center;
    overflow: hidden;
`;

export default Cart;


// const toggleCheckAll = e => {
//   let newNfts = [...nftsInCart];
//   if (e.target.checked) {
//     newNfts = newNfts.map(nft => ({ ...nft, checked: true }));
//     setNftsInCart(newNfts);
//   } else {
//     newNfts = newNfts.map(nft => ({ ...nft, checked: false }));
//     setNftsInCart(newNfts);
//   }
// }