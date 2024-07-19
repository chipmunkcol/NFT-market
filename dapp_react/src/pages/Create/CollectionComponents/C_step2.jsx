import { MintContract, SaleNftContract, SaleNftAddress } from "../../../../contracts/index";
import { useEffect, useState } from "react";
import { S_Button } from "../../../styles/styledComponent"
import styled from "styled-components";
import { Link, json, useNavigate, useOutletContext } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { C_setOnsaleNft, C_setOnsaleNfts, P_AddNftIdOnCollection, getImageIpfsHash, getImageUrl, pinFileToIPFS, pinJsonToIPFS, validateCollectionData, validateFormData } from "../../../hooks/common";
// import openseaSymbol from "../../../assets/images/opensea-symbol.svg"
import openseaSymbol from "../../../assets/images/opensea-symbol.png";
import useAsyncTask from "../../../hooks/useAsyncTask";
import { Confirm, toastSwal } from "../../../hooks/swal";
import Swal from "sweetalert2";
import { transactWithApprove, transactWithApproveCollection, transactWithMintCollection } from "../../../../contracts/interface";

function C_step2() {

  const navigate = useNavigate();
  const { handleWithLoading } = useAsyncTask();
  const { collection, setCollection, resetCollection, account, signer } = useContext(GlobalContext);
  const { files, setFiles } = useOutletContext();
  const [progress, setProgress] = useState(0);

  // const [file, setFile] = useState(null);
  const resetFormData = () => {
    resetCollection();
    setFiles(null);
  }

  const getRemainedTimestamp = (inputDate) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    if (inputDate === todayStr) {
      return 600;
    } else {
      const dateKST = new Date(`${inputDate}T23:59:59+09:00`);
      const remainedTimestamp = dateKST.getTime() - Date.now();
      return remainedTimestamp;
    }
  }

  const submissionController = async () => {
    const result = await handleWithLoading(() => handleSubmisstion(), 'Collection을 생성하는 중입니다');
    if (result) {
      resetFormData();
      const confirmResult = await Confirm('Collection 발행 성공', 'MyPage로 확인하러 가기');
      if (confirmResult.isConfirmed) {
        navigate(`/mypage/${account}`);
        // window.location.reload();
      }
    }
  }

  const handleSubmisstion = async () => {
    try {
      const validatedResult = validateCollectionData(account, collection);
      if (!validatedResult) return;

      const imageIpfsHash = await getImageIpfsHash(collection.preReleaseJsonData.file);

      let fileNameList = [];
      let nftNameList = collection.nfts.map(nft => nft.name);
      let nftKeyvaluesList = [];
      Array.from(files).forEach(async (file, index) => {
        // formData.append("file", file);
        const fileName = file.name
        fileNameList.push(fileName);
        const nftKeyvaluesObject = {
          name: collection.nfts[index].name,
          fileName,
          owner: account,
          isOnsale: String(true),
          isCollection: String(true),
          nftPrice: collection.perPrice,
          numberOfSales: 0,
          priceHistory: JSON.stringify([]),
          tags: collection.tags.join('')
        };
        nftKeyvaluesList.push(nftKeyvaluesObject);
      })

      const metaData = JSON.stringify({
        name: collection.name,
        keyvalues: {
          owner: account,
          isOnsale: String(true),
          nftKeyvaluesList: JSON.stringify(nftKeyvaluesList),
          isCollection: String(true),
          numberOfSales: 0,
          tags: collection.tags.join(''),
          isHide: String(true)
        }
      });
      const jsonData = {
        name: collection.name,
        description: collection.preReleaseJsonData.description,
        image: imageIpfsHash,
      };
      const tempIpfsHash = await pinJsonToIPFS(imageIpfsHash, metaData, jsonData);
      if (!tempIpfsHash) return;

      const collectionMetadata = JSON.stringify({
        name: collection.name,
        keyvalues: {
          owner: account,
        }
      });

      const collectionIpfsHash = await pinFileToIPFS(files, collectionMetadata);
      if (!collectionIpfsHash) return;

      const remainedSeconds = getRemainedTimestamp(collection.startAt);
      // const mintResult = await MintContract.methods.userMintCollection(account, nftNameList, fileNameList, collectionIpfsHash, isHide, tempIpfsHash, remainedSeconds).send({ from: account });
      const mintResult = await transactWithMintCollection(signer, nftNameList, fileNameList, collectionIpfsHash, tempIpfsHash, remainedSeconds);
      if (!mintResult.status) return;
      const getCollectionResult = await MintContract.methods.getCollectionData(account, tempIpfsHash).call();
      console.log('getCollectionResult: ', getCollectionResult);

      const updateMetadataResult = await P_AddNftIdOnCollection(tempIpfsHash, getCollectionResult.ids);
      if (!updateMetadataResult.ok) return;

      const collectionIds = getCollectionResult.ids.map(id => parseInt(id));
      // await 
      // const promises = getCollectionResult.ids.map(async (nftId) => {
      //   const parsedId = parseInt(nftId);
      //   // const approveResult = await MintContract.methods.approve(SaleNftAddress, parsedId).send({ from: account });
      const approveResult = await transactWithApproveCollection(signer, collectionIds);
      if (!approveResult.status) return null;

      const onsaleResult = await C_setOnsaleNfts(signer, collectionIds, collection.perPrice);
      if (!onsaleResult.status) return null;

      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
  }

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  // const perPriceRef = useRef(null);
  // const startAtRef = useRef(null);
  const onChangePerPrice = (e) => {
    // perPriceRef.current = e.target.value;
    setCollection((prev) => ({
      ...prev,
      perPrice: e.target.value
    }))
  }

  const onChangeStartAtData = (e) => {
    // 오늘 날자를 선택하면 10분 뒤로 설정된다는 알람 띄워준다
    const inputDate = e.target.value;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환
    if (inputDate === todayStr) {
      Swal.fire('Air drop', 'Collection 발행 뒤 10분 후 부터 에어드랍이 가능합니다');
    } else {
      Swal.fire('Air drop', `${inputDate} AM 00:00 부터 에어드랍이 가능합니다`)
    }
    setCollection((prev) => ({
      ...prev,
      startAt: inputDate
    }));

  };

  const onchangePreReleaseDesc = (e) => {
    setCollection((prev) => ({
      ...prev,
      preReleaseJsonData: {
        ...prev.preReleaseJsonData,
        description: e.target.value
      }
    }));
  };

  const onchangeNameData = (e) => {
    setCollection((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const onChangePreReleaseImage = async (e) => {
    const file = e.target.files[0];
    setCollection((prev) => ({
      ...prev,
      preReleaseJsonData: {
        ...prev.preReleaseJsonData,
        file: file
      }
    }));

  };
  const inputFileRef = useRef();
  const onClickFileHandler = () => {
    inputFileRef.current.click();
  };

  const cancelHandler = () => {
    setCollection((prev) => ({
      ...prev,
      preReleaseJsonData: {
        ...prev.preReleaseJsonData,
        file: null
      }
    }));
    inputFileRef.current.value = "";
  };


  return (
    <Container>
      <div style={{ marginBottom: '20px', }}>NFT 총 수량 {files?.length}개</div>
      <InputLabel>Collection Name</InputLabel>
      <InputText type="text" onChange={onchangeNameData} value={collection.name} />
      <InputLabel>NFT당 가격 (단위: ETH *일괄 적용됩니다)</InputLabel>
      <InputText type="number" onChange={onChangePerPrice} placeholder="ex) 0.1" value={collection.perPrice} />
      <InputLabel>Air drop 시작 날짜 및 시간</InputLabel>
      <InputText type="date" onChange={onChangeStartAtData} value={collection.startAt} />
      <div>
        <h2 style={{ marginBottom: '10px' }}>사전 공개</h2>
        <PreviewWrap>
          <ContentWrap>
            <div style={{ marginBottom: '10px' }}>컬렉션의 각 NFT에는 최종 자산을 업로드하고 <br />
              공개할 때까지 사전 공개 미디어가 표시됩니다
            </div>
            <div style={{ marginBottom: '10px', color: 'blue', cursor: 'pointer' }}>더 알아보기</div>
            <InputLabel>사전 공개 설명</InputLabel>
            <InputTextArea
              placeholder="Bycl monkey is Comming soon!"
              onChange={onchangePreReleaseDesc}
              value={collection.preReleaseJsonData.description}
            />

          </ContentWrap>
          <ImageWrap>
            <div style={{ height: '150px' }}>
              <div style={{ height: '100%', backgroundColor: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={onClickFileHandler}>
                {!collection.preReleaseJsonData.file ? (
                  <>
                    <div style={{ width: '20px', height: '20px', fontSize: '20px' }}>
                      +
                    </div>
                    <input
                      ref={inputFileRef}
                      type="file"
                      style={{ display: 'none' }}
                      onChange={onChangePreReleaseImage}
                    />
                  </>) : (
                  <PreviewFile>
                    <img src={URL.createObjectURL(collection.preReleaseJsonData.file)} alt="preview" />
                    <CancelWrap>
                      <CancelBtn onClick={cancelHandler}>x</CancelBtn>
                    </CancelWrap>
                  </PreviewFile>
                )
                }
              </div>
            </div>
            <div style={{ height: '52px', padding: '1rem' }}>myCollection</div>
          </ImageWrap>
        </PreviewWrap>
      </div>
      <h2 style={{ marginBottom: '10px' }}>수익에 대해</h2>
      <p style={{ marginBottom: '10px' }}>
        OpenSea는 기본 판매에 대해 5%의 수수료를 받습니다.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <UserAddressBox style={{ width: '80%', marginBottom: '5px' }}>
            {account}
          </UserAddressBox>
          <RateBox>
            <div>95</div>
            <div>%</div>
          </RateBox>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <MyAddressBox>
            {/* <OpenseaSymbol /> */}
            <SymbolImg >
              <img src={openseaSymbol} alt="openseaSymbol" />
            </SymbolImg>
            <div>오픈씨</div>
          </MyAddressBox>
          <RateBox>
            <div>5</div>
            <div>%</div>
          </RateBox>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <Link to={"/create-collection/step-1"} >
              <S_Button>이전</S_Button>
            </Link>
          </div>
          <div style={{ padding: '4px 0px' }}>
            <div style={{ height: '100%', borderRight: '1px solid gray' }} />
          </div>
          <div>
            <S_Button onClick={submissionController}>저장</S_Button>
          </div>
        </div>
      </div>

    </Container>
  )
}


const SymbolImg = styled.div`
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`;
// const OpenseaSymbol = styled(openseaSymbol)`
//   width: 20px;
//   height: 20px;
// `;

const ContentWrap = styled.div`
  width: 67%;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
`;

const PreviewFile = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 425px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.75rem;
  }
`;

const CancelWrap = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
const CancelBtn = styled.button`
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  &:hover {
    color: #cccccc;
  }
`;

const MyAddressBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 80%;
  padding: 12px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(18, 18, 18, 0.12);
  background-color: rgb(242, 244, 245);
`;
const UserAddressBox = styled(MyAddressBox)``;

const RateBox = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  height: 48px;
  background-color: rgb(242, 244, 245);
  border-radius: 12px;
  border: 1px solid rgba(18, 18, 18, 0.12);
`;

const PreviewWrap = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    flex-direction: column;
    margin-bottom: 2rem;
    gap: 0;
  }
`;

const ImageWrap = styled.div`
  width: 30%;
  min-width: 160px;
  height: 202px;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out 0s;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
`;


const InputText = styled.input`
  width: 100%;
  padding: 12px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(18, 18, 18, 0.12);
  margin-bottom: 1rem;
  /* background-color: rgb(242, 244, 245); */
`;

// const InputSpecific = styled(InputText)``;

const Container = styled.div`
`;
const InputLabel = styled.div`
  margin-bottom: 0.75rem;
`;


const InputTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.75rem;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 5px;
  margin-bottom: 1rem;
`;


export default C_step2;