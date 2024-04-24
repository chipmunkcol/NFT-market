import { MintContract } from "../../../../contracts/index";
import { useEffect, useState } from "react";
import { S_Button } from "../../../styles/styledComponent"
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

function C_step2() {

  const { collection, account } = useContext(GlobalContext);
  const inputRef = useRef(null);
  const onClickInput = () => {
    inputRef.current.click();
  }
  const [progress, setProgress] = useState(0);

  const handleSubmisstion = async () => {
    const formData = new FormData();
    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });

    let collectionFiles = [];
    Array.from(collection.files).forEach((file) => {
      formData.append("file", file);
      collectionFiles.push(file.name);
    });

    const jsonData = JSON.stringify({
      name: collection.name,
      keyvalues: {
        owner: account,
        description: collection.desc,
        tags: collection.tags,
        files: collectionFiles,
      }
    });
    formData.append("pinataMetadata", jsonData);
    formData.append("pinataOptions", pinataOptions);

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`
      },
      body: formData
    }

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", options);
    const resData = await res.json();
    const ipfsHash = resData.IpfsHash;
    console.log('ipfsHash: ', ipfsHash);

    if (ipfsHash) {
      try {
        collectionFiles.forEach(async (file) => {
          const mintResult = await MintContract.methods
            .mintByUser(collection.name, ipfsHash, file, collection.desc, collection.tags)
            .send({ from: account });
          if (mintResult.status) {
            setProgress(progress + 1);
          }
        });
        alert("NFT 발행 성공");
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    console.log(progress);
  }, [progress]);


  return (
    <RightPart>
      <div>NFT 총 수량 {collection.filesLength}개</div>
      <InputLabel>NFT당 가격 * (일괄 적용됩니다)</InputLabel>
      <InputText type="number" />
      <InputLabel>민트 시작 날짜 및 시간</InputLabel>
      <InputText type="date" />
      <div>
        <h2 style={{ marginBottom: '10px' }}>사전 공개</h2>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '70%' }}>
            <div style={{ marginBottom: '10px' }}>컬렉션의 각 NFT에는 최종 자산을 업로드하고 <br />
              공개할 때까지 사전 공개 미디어가 표시됩니다
            </div>
            <div style={{ marginBottom: '10px', color: 'blue', cursor: 'pointer' }}>더 알아보기</div>
            <InputLabel>사전 공개 설명</InputLabel>
            <InputTextArea style={{ width: '80%', height: '100px' }} placeholder="Bycl monkey is Comming soon!" />

          </div>
          <PreReleaseWrap>
            <div style={{ height: '150px' }}>
              <div style={{ height: '100%', backgroundColor: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={onClickInput}>
                <div style={{ width: '20px', height: '20px', fontSize: '20px' }}>
                  {/* <img src={iconUpload} alt="upload" /> */}
                  +
                </div>
              </div>
              <input ref={inputRef} type="file" style={{ display: 'none' }} />
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