import { MintABI, MintAddress, MintContract, web3 } from "../../../contracts/index";
import { transactWithUserMintNft } from '../../../contracts/interface';
import styled from "styled-components";
import { useCallback, useEffect, useRef } from "react";
import { S_Button } from "../../styles/styledComponent";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import iconUpload from "../../assets/images/icon-upload.png";
import { getImageIpfsHash, validateFormData } from "../../hooks/common";
import { useDropzone } from "react-dropzone";
import useAsyncTask from "../../hooks/useAsyncTask";
import { useNavigate } from "react-router-dom";
import { Confirm } from "../../hooks/swal";
import Web3 from "web3";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import useS3Upload from "../../hooks/useS3Upload";
import exclamationMark from "../../assets/images/exclamation-mark.png"

function MintNft() {
  const { account, signer } = useContext(GlobalContext);
  const { handleWithLoading } = useAsyncTask();
  const { uploadImageTos3 } = useS3Upload();
  const navigate = useNavigate();
  const onDropHandler = useCallback(e => {
    const file = e[0];
    const files = [file];
    const target = { files: files };
    const temp = { target: target };
    onchangeHandler(temp);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropHandler })
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
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const onchangeNameData = (e) => {
    setJsonData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  const onchangeDescData = (e) => {
    setJsonData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };


  const onchangeHandler = async (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB 제한
    const fileSize = file.size;
    if (fileSize > maxSize) {
      Swal.fire("파일 사이즈는 5MB 이하로 업로드해주세요.");
      return;
    }
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
    setTags([]);
    // inputFileRef.current.value = "";
  };


  const pinJsonToIPFS = async (imageIpfsHash, metaData) => {
    const jsonContent = JSON.stringify({
      name: jsonData.name,
      description: jsonData.description,
      image: imageIpfsHash,
      attributes: JSON.stringify(jsonData.attributes)
    });

    const options = {
      method: 'POST',
      headers: { Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`, 'Content-Type': 'application/json' },
      body: `{"pinataContent":${jsonContent},"pinataMetadata":${metaData}}`
    };

    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options);
    const result = await res.json();
    return result.IpfsHash;
  }

  const mintNftController = async () => {
    const res = await handleWithLoading(() => handleSubmission(), 'NFT 발행 중입니다');
    if (res) {
      resetFormData();
      const result = await Confirm('NFT 발행 성공✨', 'MyPage로 확인하러 가기');
      if (result.isConfirmed) {
        navigate(`/mypage/${account}`)
      }
    }
  }
  const handleSubmission = async () => {
    try {
      const validateResult = validateFormData(account, jsonData, file);
      if (!validateResult) return;

      let imageIpfsHash = jsonData.image;
      if (!imageIpfsHash) {
        imageIpfsHash = await getImageIpfsHash(file);
        uploadImageTos3(imageIpfsHash, file);
      }

      const metaData = JSON.stringify({
        name: jsonData.name,
        keyvalues: {
          owner: account,
          isCollection: String(false),
          tags: tags.join(''),
          ext: file.type.split('/')[1],
        },
      });


      const tokenUrl = await pinJsonToIPFS(imageIpfsHash, metaData);
      if (tokenUrl) {

        const mintResult = await transactWithUserMintNft(signer, jsonData.name, tokenUrl);
        if (mintResult.status) {
          return true;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const cancelHandler = () => {
    resetFormData();
  };

  const getIpfsToJsonData = ipfsUrl => {
    const url = `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${ipfsUrl}?pinataGatewayToken=${import.meta.env.VITE_GATEWAY_TOKEN}`;
    return url;
  }

  // 태그
  const addTagHandler = e => {
    const value = e.target.value;
    if (tags.includes(value)) {
      return;
    }
    setTags(prev => [...prev, value]);
  }

  const removeTagHandler = (tag) => {
    setTags(prev => prev.filter(item => item !== tag));
  }

  const helpText = `
JSON 파일로 업로드 시, 
아래 형식 준수

※image: only ipfsHash cid (string)
아래 예시 ipfsHash cid
{
  "name": string,
  "description": string,
  "image": "QmZEPe3V5hB6SiJ3Nc2ECcKVQCXZbsUEba3rRbVse6MgXy",
  "attributes": [
    {
      "trait_type": string,
      "value": string
    }
  ]
}
  `;

  return (
    <Background>
      <Container>
        <TitleBox>
          <h1>NFT 생성</h1>
          <Flex style={{ position: 'relative' }}>
            <p>아이템이 발행된 후에는 해당 정보를 변경할 수 없습니다.</p>
            <HelpMark>
              <img src={exclamationMark} width={30} height={30} alt="느낌표" />
            </HelpMark>
            <HelpBox>
              <pre>
                {helpText}
              </pre>
            </HelpBox>
          </Flex>
        </TitleBox>
        <FlexBox>
          <LeftPart>
            {!file ? (
              <InputFileBox
                id="inputFileBox"
                onClick={onClickFileHandler}
                $isDragActive={isDragActive}
                // onDrop={onDropHandler}
                {...getRootProps()}
              >
                <div style={{ width: "40px", height: "40px" }} >
                  <IconUpload />
                </div>
                <h2>이미지 파일 끌어다 놓기</h2>
                <h3>파일 찾아보기</h3>
                <h4>최대 크기: 5MB</h4>
                <h4>JPG, JPEG, PNG or JSON</h4>
              </InputFileBox>
            ) : (
              <PreviewFile>
                <img src={jsonData.image ? getIpfsToJsonData(jsonData.image) : URL.createObjectURL(file)} alt="preview" />
                <CancelWrap>
                  <CancelBtn onClick={cancelHandler}>x</CancelBtn>
                </CancelWrap>
              </PreviewFile>
            )}
            <input
              type="file"
              ref={inputFileRef}
              style={{ display: "none" }}
              onChange={onchangeHandler}
              accept="image/jpg, image/jpeg, image/png, application/json"
              {...getInputProps()}
            />
          </LeftPart>
          <RightPart>
            <InputLabel>이름 *</InputLabel>
            <InputText
              type="text"
              value={jsonData.name}
              onChange={onchangeNameData}
            />
            <InputLabel>설명</InputLabel>
            <InputText
              type="text"
              value={jsonData.description}
              onChange={onchangeDescData}
            />
            <InputLabel>태그</InputLabel>
            <p style={{ fontSize: "14px", marginBottom: "0.75rem" }}>
              태그는 아이템의 속성을 설명합니다. 컬렉션 페이지 내에 필터로
              표시되며 아이템 페이지에도 나열됩니다.
            </p>
            <select style={{ marginBottom: "5px" }} onChange={addTagHandler}>
              <option style={{ display: "none" }}>ex</option>
              <option>예술</option>
              <option>유명인</option>
              <option>게임</option>
              <option>음악</option>
              <option>가상자산</option>
              <option>프로필 사진</option>
            </select>
            <TagBox>
              {
                tags.map(tag => (
                  <Tag key={`tag-${tag}`}>
                    {tag}
                    <span onClick={() => removeTagHandler(tag)}>X</span>
                  </Tag>
                ))
              }
            </TagBox>
            <div>
              <S_Button onClick={mintNftController}>생성</S_Button>
            </div>
          </RightPart>
        </FlexBox>
      </Container>
    </Background >
  );
}

export const HelpBox = styled.div`
position: absolute;
display: none;
/* display: block; */

top: 50px;
left: 24%;
background-color: #f7f7f7;
border-radius: 10px;
border: #2081e2cc solid 3px;
padding: 0 10px;
@media (max-width: ${({ theme }) => theme.size.mobile}) {
  left: 0;
}

  /* pre::after {
    content: '';
position: absolute;
border-style: solid;
border-width: 0 15px 15px;
border-color: #f7f7f7 transparent;
display: block;
width: 0;
z-index: 1;
top: -14px;
left: 374px;
  }
  pre::before {
    content: '';
position: absolute;
border-style: solid;
border-width: 0 17px 17px;
border-color: #2081e2cc transparent;
display: block;
width: 0;
z-index: 0;
top: -19px;
left: 372px;
  } */
`;

export const HelpMark = styled.div`
display: inline-block;
cursor: pointer;

&:hover + ${HelpBox} {
  display: block;
}
`;

const Tag = styled.div`
    background-color: darkgray;
    color: white;
    border-radius: 40px;
    padding: 4px 9px;
    font-size: 11px;
    margin-right: 5px;

    span {
        margin-left: 5px;
        cursor: pointer;
    }
`;

const TagBox = styled.div`
  height: 30px;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 20px;
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

const IconUpload = styled.div`
  background-image: url(${iconUpload});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const Flex = styled.div`
  width: 47%;
  ${(props) => props.theme.variables.flexBetween}
  padding-right: 20px;
  
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
`;

const LeftPart = styled.div`
  width: 47%;

  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
    height: 300px;
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

const InputFileBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px dashed rgba(18, 18, 18, 0.32); */
  border: ${props => props.$isDragActive ? '1px solid #1D8DFF' : '1px dashed rgba(18, 18, 18, 0.32)'};
  box-shadow: ${props => props.$isDragActive ? '0px 0px 8px 0px #2390FF' : 'none'};
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

const InputSpecific = styled(InputText)``;

const RightPart = styled.div`
  width: 44%;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
`;
const InputLabel = styled.div`
  margin-bottom: 0.75rem;
`;

const Background = styled.div`
  /* height: 100%; */
  padding-top: 100px;
  width: 100%;
  background-color: #ffffff;
`;

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  padding: 0 50px 0 30px;
`;
const TitleBox = styled.div`
  width: 100%;
  padding-bottom: 20px;

  p {
    margin-top: 10px;
  }
`;
export default MintNft;
