import { JsonRpcSigner } from "ethers";
import styled from "styled-components";
import {
  purchaseNftHandler,
  validateAccountAndOnsale,
} from "../../hooks/common";
import { Confirm } from "../../hooks/swal";
import useAsyncTask from "../../hooks/useAsyncTask";
import { useNavigate } from "react-router-dom";

interface PurchaseProps {
  nftId: number;
  tokenUrl: string;
  nftPrice: number;
  metadata: any;
  signer: JsonRpcSigner | null;
  account: string;
}

const Purchase = (props: PurchaseProps) => {
  const navigate = useNavigate();
  const { handleWithLoading } = useAsyncTask();
  const { nftId, metadata, tokenUrl, nftPrice, signer, account } = props;
  const purchaseController = async () => {
    if (!signer) return;
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

  return <Container onClick={purchaseController}>지금 구매하기</Container>;
};

export default Purchase;

const Container = styled.div`
  width: calc(100% - 56px);
  height: 100%;
  background-color: rgba(32, 129, 226, 1);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px 0 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(32, 129, 226, 0.8);
  }
`;
