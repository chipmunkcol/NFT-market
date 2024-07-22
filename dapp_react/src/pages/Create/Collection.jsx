import { MintContract } from "../../../contracts/index";
import styled from "styled-components";
import { useRef } from "react";
import { S_Button } from "../../styles/styledComponent";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import iconUpload from "../../assets/images/icon-upload.png";
import { useEffect } from "react";
import Slider from "./CollectionComponents/Slider";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";

function Collection() {
  const { account, collection, setCollection, resetCollection } = useContext(GlobalContext);

  const [files, setFiles] = useState(null);
  const onchangeHandler = (e) => {
    const fileList = Object.values(e.target.files);
    if (fileList.length !== 10) {
      Swal.fire('업로드 에러', '현재 버전에서는 파일 업로드 시 정확히 10개의 파일만 업로드 가능합니다. 감사합니다👩‍💻');
      setFiles(null);
      return;
    }
    setFiles(fileList);

    fileList.forEach(file => {
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
        setCollection((prev) => ({
          ...prev,
          nfts: [...prev.nfts, newJsonData],
        }));
      }
      reader.readAsText(file);
    });
  };

  // useEffect(() => {
  //   console.log('collection: ', collection.nfts);
  // }, [collection]);

  const inputFileRef = useRef();
  const onClickFileHandler = () => {
    inputFileRef.current.click();
  };


  const cancelHandler = () => {
    resetCollection();
    setFiles(null);
    inputFileRef.current.value = "";
  };

  return (
    <Background>
      <Container>
        <TitleBox>
          <h1>Collection 업로드</h1>
          <p>아이템이 발행된 후에는 해당 정보를 변경할 수 없습니다.</p>
        </TitleBox>
        <FlexBox>
          <LeftPart>
            {!files ? (
              <InputFileBox
                onClick={onClickFileHandler}
                onDrop={onchangeHandler}
                accept="application/json"
              >
                <div style={{ width: "40px", height: "40px" }}>
                  <IconUpload />
                </div>
                <h2>클릭해서 폴더 업로드</h2>
                <h3>폴더 찾아보기</h3>
                <h4>최대 크기: 50MB</h4>
                <h4>JSON</h4>
              </InputFileBox>
            ) : (
              <div style={{ width: '100%', height: '100%', minHeight: '425px', maxHeight: '555px' }}>
                <Slider files={files} cancelHandler={cancelHandler} />
              </div>
            )}
            <input
              type="file"
              ref={inputFileRef}
              webkitdirectory="true"
              multiple
              style={{ display: "none" }}
              onChange={onchangeHandler}
            />
          </LeftPart>

          <RightPart>
            {/* router_Outlet */}
            <Outlet context={{ files, setFiles }} />
          </RightPart>
        </FlexBox>
      </Container>
    </Background>
  );
}


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

const LeftPart = styled.div`
  width: 47%;

  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
`;

const RightPart = styled.div`
  width: 44%;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
`;


const InputFileBox = styled.div`
  width: 100%;
  height: 100%;
  max-height: 555px;
  min-height: 250px;
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

const TitleBox = styled.div`
  width: 100%;
  padding-bottom: 20px;
  /* padding-top: 130px; */
  /* height: 210px; */

  p {
    margin-top: 10px;
  }
`;

const Background = styled.div`
  /* height: 100%; */
  padding-top: 100px;
  width: 100%;
  background-color: #ffffff;
  background-size: cover;
`;

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  padding: 0 50px 0 30px;
`;

export default Collection;
