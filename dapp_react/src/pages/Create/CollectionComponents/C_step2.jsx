import { MintContract, SaleNftContract, SaleNftAddress } from "../../../../contracts/index";
import { useEffect, useState } from "react";
import { S_Button } from "../../../styles/styledComponent"
import styled from "styled-components";
import { Link, json, useNavigate, useOutletContext } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { C_setOnsaleNft, P_AddNftIdOnCollection, getImageIpfsHash, getImageUrl, pinFileToIPFS, pinJsonToIPFS, validateFormData } from "../../../hooks/common";

function C_step2() {

  const navigate = useNavigate();
  const { collection, setCollection, account } = useContext(GlobalContext);
  const files = useOutletContext();
  const [progress, setProgress] = useState(0);

  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState({
    name: "",
    description: "",
    image: "",
    attributes: [
      {
        trait_type: "",
        value: "",
      }
    ],
  });

  const resetFormData = () => {
    setJsonData({
      name: "",
      description: "",
      image: "",
      attributes: [
        {
          trait_type: "",
          value: "",
        }
      ],
    });
    setFile(null);
  }

  const handleSubmisstion = async () => {
    // const formData = new FormData();
    const validatedResult = validateFormData(account, jsonData, file);
    if (!validatedResult) return;

    let fileNameList = [];
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
        nftPrice: perPriceRef.current,
        numberOfSales: 0,
        priceHistory: JSON.stringify([]),
      };
      nftKeyvaluesList.push(nftKeyvaluesObject);
    })

    let imageIpfsHash = jsonData.image;
    if (!imageIpfsHash) {
      imageIpfsHash = await getImageIpfsHash(file);
    }


    const metaData = JSON.stringify({
      name: collection.name,
      keyvalues: {
        owner: account,
        description: collection.description,
        attributes: JSON.stringify(collection.attributes),
        isOnsale: String(true),
        nftKeyvaluesList: JSON.stringify(nftKeyvaluesList),
        isCollection: String(true),
        numberOfSales: 0
      }
    });

    let tempIpfsHash;
    if (file.type === "application/json") {
      tempIpfsHash = await pinFileToIPFS(metaData);
    } else {
      tempIpfsHash = await pinJsonToIPFS(imageIpfsHash, metaData, jsonData);
    }

    if (tempIpfsHash) {
      const isHide = true;
      // const startAt = new Date(startAtRef.current).getTime() - Date.now();
      const startAt = 120;
      const mintResult = await MintContract.methods.userMintCollection(fileNameList, tempIpfsHash, isHide, tempIpfsHash, startAt).send({ from: account });
      if (!mintResult.status) return;
      const getCollectionResult = await MintContract.methods.getCollectionData(tempIpfsHash).call();
      console.log('result: ', getCollectionResult);

      const updateMetadataResult = await P_AddNftIdOnCollection(tempIpfsHash, getCollectionResult.ids);
      console.log('updateMetadataResult: ', updateMetadataResult);

      getCollectionResult.ids.forEach(async (nftId) => {
        const parsedId = parseInt(nftId);
        const approveResult = await MintContract.methods.approve(SaleNftAddress, parsedId).send({ from: account });
        console.log('result: ', approveResult);
        if (!approveResult.status) return;

        const onsaleResult = await C_setOnsaleNft(parsedId, perPriceRef.current, account);
        console.log('onsaleResult: ', onsaleResult);
        if (!onsaleResult.status) return;
      });
      resetFormData();
      navigate('/create-collection/step-1');
    }
  }

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  const perPriceRef = useRef(null);
  const startAtRef = useRef(null);
  const onChangePerPrice = (e) => {
    perPriceRef.current = e.target.value;
    // setCollection((prev) => ({
    //   ...prev,
    //   perPrice: e.target.value
    // }))
  }

  const onChangeStartAtData = (e) => {
    console.log('e.target.value: ', e.target.value);
    startAtRef.current = e.target.value;
    // setCollection((prev) => ({
    //   ...prev,
    //   startAt: e.target.value
    // }));
  };

  const onchangeDescData = (e) => {
    setJsonData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const onchangeNameData = (e) => {
    setCollection((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const onchangeHandler = async (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = () => {
        const res = JSON.parse(reader.result);

        const name = res.name ? res.name : "";
        const description = res.description ? res.description : "";
        const image = res.image ? res.image : "";
        const attributes = res.attributes ? res.attributes : [
          {
            trait_type: "",
            value: "",
          }
        ];
        const newJsonData = {
          name,
          description,
          image,
          attributes,
        };
        setJsonData(prev => (
          {
            ...prev,
            ...newJsonData
          }
        ));
      }
      reader.readAsText(file);
    }
  };
  const inputFileRef = useRef();
  const onClickFileHandler = () => {
    inputFileRef.current.click();
  };

  const cancelHandler = () => {
    setFile(null);
    inputFileRef.current.value = "";
  };


  return (
    <RightPart>
      <div>NFT 총 수량 {collection.filesLength}개</div>
      <InputLabel>Collection Name</InputLabel>
      <InputText type="text" onChange={onchangeNameData} />
      <InputLabel>NFT당 가격 * (일괄 적용됩니다)</InputLabel>
      <InputText type="number" onChange={onChangePerPrice} />
      <InputLabel>민트 시작 날짜 및 시간</InputLabel>
      <InputText type="date" onChange={onChangeStartAtData} />
      <div>
        <h2 style={{ marginBottom: '10px' }}>사전 공개</h2>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '70%' }}>
            <div style={{ marginBottom: '10px' }}>컬렉션의 각 NFT에는 최종 자산을 업로드하고 <br />
              공개할 때까지 사전 공개 미디어가 표시됩니다
            </div>
            <div style={{ marginBottom: '10px', color: 'blue', cursor: 'pointer' }}>더 알아보기</div>
            <InputLabel>사전 공개 설명</InputLabel>
            <InputTextArea
              style={{ width: '80%', height: '100px' }}
              placeholder="Bycl monkey is Comming soon!"
              value={jsonData.description}
              onChange={onchangeDescData}
            />

          </div>
          <PreReleaseWrap>
            <div style={{ height: '150px' }}>
              <div style={{ height: '100%', backgroundColor: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={onClickFileHandler}>
                {!file ? (
                  <>
                    <div style={{ width: '20px', height: '20px', fontSize: '20px' }}>
                      +
                    </div>
                    <input
                      ref={inputFileRef}
                      type="file"
                      style={{ display: 'none' }}
                      onChange={onchangeHandler}
                    />
                  </>) : (
                  <PreviewFile>
                    <img src={jsonData.image ? getImageUrl(jsonData.image) : URL.createObjectURL(file)} alt="preview" />
                    <CancelWrap>
                      <CancelBtn onClick={cancelHandler}>x</CancelBtn>
                    </CancelWrap>
                  </PreviewFile>
                )
                }
              </div>
            </div>
            <div style={{ height: '52px', padding: '1rem' }}>myCollection</div>
          </PreReleaseWrap>
        </div>
      </div>
      <h2 style={{ marginBottom: '10px' }}>수익에 대해</h2>
      <p style={{ marginBottom: '10px' }}>기본 판매 수익을 받으려면 지갑을 추가하세요.
        OpenSea는 기본 판매에 대해 5%의 수수료를 받습니다.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <InputText type="text" style={{ width: '80%', marginBottom: '5px' }} />
          <RateBox>
            <div>95</div>
            <div>%</div>
          </RateBox>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <MyAddressBox>
            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'blueviolet' }}></div>
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
            <S_Button onClick={handleSubmisstion}>저장</S_Button>
          </div>
        </div>
      </div>

    </RightPart>
  )
}

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

const PreReleaseWrap = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  width: 30%;
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
`;

// const InputSpecific = styled(InputText)``;

const RightPart = styled.div`
  width: 44%;
`;
const InputLabel = styled.div`
  margin-bottom: 0.75rem;
`;


const InputTextArea = styled.textarea`
  width: 100%;
  height: 48px;
  padding: 0.75rem;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 5px;
  margin-bottom: 1rem;
`;


export default C_step2;