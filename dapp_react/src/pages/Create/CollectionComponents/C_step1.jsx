import { useState } from "react";
import { S_Button } from "../../../styles/styledComponent"
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

function C_step() {

  const { collection, setCollection } = useContext(GlobalContext);
  // const [data, setData] = useState({
  //   name: "",
  //   desc: "",
  // });
  // const [tags, setTags] = useState("");
  const onchangeNameData = (e) => {
    setCollection((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  const onchangeDescData = (e) => {
    setCollection((prev) => ({
      ...prev,
      desc: e.target.value,
    }));
  };

  // 태그
  const handleTags = (e) => {
    let str = "#";
    str = collection.tags + str + e.target.value + " ";
    setCollection(prev => ({
      ...prev,
      tags: str
    }));
  };

  const onChangeInputSpecific = (e) => {
    setCollection(prev => ({
      ...prev,
      tags: e.target.value
    }));
  };

  return (
    <RightPart>
      <InputLabel>이름 *</InputLabel>
      <InputText
        type="text"
        value={collection.name}
        onChange={onchangeNameData}
      />
      <InputLabel>설명</InputLabel>
      {/* <InputText
              type="text"
              value={data.desc}
              onChange={onchangeDescData}
            /> */}
      <InputTextArea
        value={collection.desc}
        onChange={onchangeDescData}>
      </InputTextArea>
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
        value={collection.tags}
        onChange={onChangeInputSpecific}
      />
      {/* <S_Button onClick={handleSubmission}>생성</S_Button> */}
      <Link to={"/create-collection/step-2"}>
        <S_Button >다음</S_Button>
      </Link>
    </RightPart>
  )
}


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


const InputTextArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 0.75rem;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 5px;
  margin-bottom: 1rem;
`;


export default C_step;