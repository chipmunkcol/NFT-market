import { MintContract } from "../../contracts/index";
import styled from "styled-components";
import bgMain from '../assets/images/bg-create-nft.png';
import { useRef } from "react";
import { S_Button } from "../styles/styledComponent";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function CreateNft() {
  const { account } = useContext(GlobalContext);
  const dataRef = useRef({
    name: null,
    desc: null,
  });
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState('');
  const onchangeNameDataRef = (e) => {
    dataRef.current.name = e.target.value;
  }
  const onchangeDescDataRef = (e) => {
    dataRef.current.desc = e.target.value;
  }
  const onchangeHandler = (e) => {
    setFile(e.target.files[0]);
  }
  const inputFileRef = useRef();
  const onClickFileHandler = () => {
    inputFileRef.current.click();
  }


  const validateFormData = () => {
    if (!account) {
      alert("지갑을 연결해주세요");
      return false;
    }
    if (!dataRef.current.name) {
      alert("이름을 입력해주세요");
      return false;
    }
    if (!dataRef.current.desc) {
      alert("설명을 입력해주세요");
      return false;
    }
    if (!file) {
      alert("파일을 선택해주세요");
      return false;
    }
    return true;
  }

  const resetFormData = () => {
    dataRef.current.name = null;
    dataRef.current.desc = null;
    setFile(null);
  }

  const handleSubmission = async () => {
    try {
      const validateResult = validateFormData();
      if (!validateResult) return;
      const formData = new FormData();

      const jsonData = JSON.stringify({
        name: dataRef.current.name,
        keyvalues: {
          description: dataRef.current.desc,
          tags: tags,
        }
      });
      formData.append("pinataMetadata", jsonData);
      formData.append("file", file);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      const ipfsHash = resData.IpfsHash;
      if (ipfsHash) {
        const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
        const mintResult = await MintContract.methods.mintByUser(ipfsUrl).send({ from: account });
        if (mintResult.status) {
          alert("NFT 발행 성공");
          resetFormData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 태그
  const handleTags = (e) => {
    let str = '#';
    str = tags + str + e.target.value + ' ';
    setTags(str);
  }

  const onChangeInputSpecific = (e) => {
    setTags(e.target.value);
  }

  return (
    <Background>
      <Container>
        <TitleBox>
          <h1>NFT 생성</h1>
          <p>아이템이 발행된 후에는 해당 정보를 변경할 수 없습니다.</p>
        </TitleBox>
        <FlexBox>
          <LeftPart>
            <InputFileBox onClick={onClickFileHandler} onDrop={onchangeHandler}>
              <div>svg</div>
              <h2>미디어 파일 끌어다 놓기</h2>
              <h3>파일 찾아보기</h3>
              <h4>최대 크기: 50MB</h4>
              <h4>JPG, PNG, GIF, SVG, MP4</h4>
            </InputFileBox>
            <input type="file" ref={inputFileRef} style={{ display: 'none' }} onChange={onchangeHandler} />
          </LeftPart>
          <RightPart>
            <InputLabel>이름 *</InputLabel>
            <InputText type="text" value={dataRef.current.name} onChange={onchangeNameDataRef} />
            <InputLabel>설명</InputLabel>
            <InputText type="text" value={dataRef.current.name} onChange={onchangeDescDataRef} />
            <InputLabel>태그</InputLabel>
            <p style={{ fontSize: '14px', marginBottom: '0.75rem' }}>태그는 아이템의 속성을 설명합니다. 컬렉션 페이지 내에 필터로 표시되며 아이템 페이지에도 나열됩니다.</p>
            <select style={{ marginBottom: '5px' }} onChange={handleTags}>
              <option style={{ display: 'none' }}>ex</option>
              <option>예술</option>
              <option>유명인</option>
              <option>게임</option>
              <option>음악</option>
              <option>가상자산</option>
              <option>프로필 사진</option>
            </select>
            <InputSpecific placeholder="#예술 #유명인 #게임" value={tags} onChange={onChangeInputSpecific} />
            <S_Button onClick={handleSubmission} >생성</S_Button>
          </RightPart>
        </FlexBox>
      </Container>
    </Background>
  )
}

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
`;

const LeftPart = styled.div`
  width: 47%;

  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
`;
const InputFileBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed rgba(18, 18, 18, 0.32);
  border-radius: 10px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-top: 1rem;
  }
  h3 {
    font-size: 14px;
    font-weight: 600;
    margin-top: 0.5rem;
    color: #fe5050;
  }
  h4 {
    font-size: 11px;
    font-weight: 400;
    margin-top: 0.5rem;
  }


  &:hover {
    border: 1px solid rgba(18, 18, 18, 0.32);
    background-color: rgba(18, 18, 18, 0.1);
    transition: 0.3s;
  }
  cursor: pointer;
`;
const InputText = styled.input`
  width: 100%;
  height: 48px;
  padding: 0.75rem;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const InputSpecific = styled(InputText)`
`;

const RightPart = styled.div`
  width: 44%;

`;
const InputLabel = styled.div`
  margin-bottom: 0.75rem;
`;

const Background = styled.div`
  /* height: 100%; */
  padding-top: 100px;
  width: 100%;
  background-color: #ffffff;
  /* background-image: url(${bgMain});
  background-position: center;
  background-repeat: no-repeat; */
  background-size: cover;
`;


const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  padding: 0 50px 0 30px;
`;
const TitleBox = styled.div`
  width: 100%;
  padding-top: 130px;
  height: 210px;

  p {
    margin-top: 10px;
  }
`;
export default CreateNft;