import { JsonRpcSigner } from "ethers";
import styled from "styled-components";
import {
  purchaseNftHandler,
  validateAccountAndOnsale,
} from "../../hooks/common";
import { Confirm } from "../../hooks/swal";
import useAsyncTask from "../../hooks/useAsyncTask";
import { useNavigate } from "react-router-dom";
import {
  NftMetadata,
  NewOnsaleNft,
  GlobalContextType,
  CollectionNft,
} from "../../../type";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Swal from "sweetalert2";

type Css = {
  btnWidth: string;
  borderRadius: string;
};

interface PurchaseProps {
  css: Css;
  metadata: NftMetadata | NewOnsaleNft | CollectionNft;
  signer: JsonRpcSigner | null;
  account: string | null;
}

const Purchase = ({ css, metadata, signer, account }: PurchaseProps) => {
  const navigate = useNavigate();
  const { balance } = useContext(GlobalContext) as GlobalContextType;
  const { handleWithLoading } = useAsyncTask();
  const { nftPrice, owner, tokenUrl, nftId } = metadata;
  const purchaseController = async () => {
    const validateResult = validateAccountAndOnsale(nftPrice, owner, account);
    if (!validateResult) return;
    if (!signer) return;
    const res = await Confirm(
      "NFT를 구매하시겠습니까?",
      "구매 후에는 취소할 수 없습니다."
    );
    if (!res.isConfirmed) return;
    if (balance < nftPrice) {
      Swal.fire(
        "잔액이 부족합니다.",
        "Faucet에서 충전 후 다시 시도해주세요.",
        "error"
      );
      return;
    }

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

  return (
    <Container $css={css} onClick={purchaseController}>
      지금 구매하기
    </Container>
  );
};

export default Purchase;

const Container = styled.div<{ $css: Css }>`
  width: calc(100% - ${({ $css }) => $css.btnWidth});
  height: 100%;
  background-color: rgba(32, 129, 226, 1);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: ${({ $css }) => $css.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(32, 129, 226, 0.8);
  }
`;
