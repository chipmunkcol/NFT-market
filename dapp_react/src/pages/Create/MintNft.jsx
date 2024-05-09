import { MintContract } from "../../../contracts/index";
import styled from "styled-components";
import { useRef } from "react";
import { S_Button } from "../../styles/styledComponent";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import iconUpload from "../../assets/images/icon-upload.png";

function MintNft() {
  const { account } = useContext(GlobalContext);
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
  const [tags, setTags] = useState("");
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

  const validateFormData = () => {
    if (!account) {
      alert("지갑을 연결해주세요");
      return false;
    }
    if (!jsonData.name) {
      alert("이름을 입력해주세요");
      return false;
    }
    if (!jsonData.description) {
      alert("설명을 입력해주세요");
      return false;
    }
    if (!file) {
      alert("파일을 선택해주세요");
      return false;
    }
    return true;
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
    setTags("");
  };

  const getImageIpfsHash = async file => {
    const formData = new FormData();
    formData.append("file", file);
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
    return resData.IpfsHash;
  }

  const pinFileToIPFS = async (metaData) => {
    const formData = new FormData();
    const options = JSON.stringify({
      cidVersion: 0,
    });

    formData.append("file", file);
    formData.append("pinataMetadata", metaData);
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
    const result = await res.json();
    return result.IpfsHash;
  }

  const pinJsonToIPFS = async (imageIpfsHash, metaData) => {
    const jsonContent = JSON.stringify({
      name: jsonData.name,
      description: jsonData.description,
      image: imageIpfsHash,
      attributes: tags
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

  // 판매등록 함수
  const handleSubmission = async () => {
    try {
      const validateResult = validateFormData();
      if (!validateResult) return;

      let imageIpfsHash = jsonData.image;
      if (!imageIpfsHash) {
        imageIpfsHash = await getImageIpfsHash(file);
      }

      const metaData = JSON.stringify({
        name: jsonData.name,
        keyvalues: {
          owner: account,
          description: jsonData.description,
          isOnsale: String(false),
        },
      });


      let tokenUrl;
      if (file.type === "application/json") {
        tokenUrl = await pinFileToIPFS(metaData);
      } else {
        tokenUrl = await pinJsonToIPFS(imageIpfsHash, metaData);
      }

      if (tokenUrl) {
        const mintResult = await MintContract.methods
          .userMintNft(jsonData.name, tokenUrl)
          .send({ from: account });
        if (mintResult.status) {
          alert("NFT 발행 성공");
          resetFormData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 태그
  const handleTags = (e) => {
    let str = "#";
    str = tags + str + e.target.value + " ";
    setTags(str);
  };

  const onChangeInputSpecific = (e) => {
    setTags(e.target.value);
  };

  const cancelHandler = () => {
    setFile(null);
    inputFileRef.current.value = "";
  };

  const getIpfsToJsonData = ipfsUrl => {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsUrl}`;
    return url;
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
            {!file ? (
              <InputFileBox
                onClick={onClickFileHandler}
                onDrop={onchangeHandler}
              >
                <div style={{ width: "40px", height: "40px" }}>
                  <IconUpload />
                </div>
                <h2>미디어 파일 끌어다 놓기</h2>
                <h3>파일 찾아보기</h3>
                <h4>최대 크기: 50MB</h4>
                <h4>JPG, PNG, GIF, SVG, MP4</h4>
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
            <select style={{ marginBottom: "5px" }} onChange={handleTags}>
              <option style={{ display: "none" }}>ex</option>
              <option>예술</option>
              <option>유명인</option>
              <option>게임</option>
              <option>음악</option>
              <option>가상자산</option>
              <option>프로필 사진</option>
            </select>
            <InputSpecific
              placeholder="#예술 #유명인 #게임"
              value={tags}
              onChange={onChangeInputSpecific}
            />
            <S_Button onClick={handleSubmission}>생성</S_Button>
          </RightPart>
        </FlexBox>
      </Container>
    </Background>
  );
}

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
`;

const LeftPart = styled.div`
  width: 47%;

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

const InputSpecific = styled(InputText)``;

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
export default MintNft;
