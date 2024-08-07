import React, { ChangeEvent } from "react";
import { S_Button } from "../../../styles/styledComponent";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { GlobalContextType } from "../../../../type";

function C_step() {
  const { collection, setCollection, collectionIndex } = useContext(
    GlobalContext
  ) as GlobalContextType;
  // collection 의 nfts[collectionIndex]의 name, desc, tags를 변경
  const onchangeNameData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollection((prev) => ({
      ...prev,
      nfts: prev.nfts.map((nft, index) => {
        if (index === collectionIndex) {
          return {
            ...nft,
            name: e.target.value,
          };
        }
        return nft;
      }),
    }));
  };
  const onchangeDescData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCollection((prev) => ({
      ...prev,
      nfts: prev.nfts.map((nft, index) => {
        if (index === collectionIndex) {
          return {
            ...nft,
            description: e.target.value,
          };
        }
        return nft;
      }),
    }));
  };

  // 태그
  const addTagHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (collection.tags.includes(value)) {
      return;
    }
    setCollection((prev) => ({
      ...prev,
      tags: [...prev.tags, value],
    }));
  };

  const removeTagHandler = (tag: string) => {
    setCollection((prev) => ({
      ...prev,
      tags: prev.tags.filter((item) => item !== tag),
    }));
  };

  return (
    <Container>
      <div style={{ marginBottom: "20px" }}>
        <h2>No. #{collectionIndex + 1} </h2>
        <h3>총 수량 {collection.nfts.length} 개</h3>
      </div>
      <InputLabel>이름 *</InputLabel>
      <InputText
        type="text"
        value={collection.nfts[collectionIndex]?.name}
        onChange={onchangeNameData}
      />
      <InputLabel>설명</InputLabel>
      <InputTextArea
        value={collection.nfts[collectionIndex]?.description}
        onChange={onchangeDescData}
      ></InputTextArea>
      <InputLabel>태그</InputLabel>
      <p style={{ fontSize: "14px", marginBottom: "0.75rem" }}>
        태그는 아이템의 속성을 설명합니다. 컬렉션 페이지 내에 필터로 표시되며
        아이템 페이지에도 나열됩니다.
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
        {collection.tags.map((tag) => (
          <Tag>
            {tag}
            <span onClick={() => removeTagHandler(tag)}>X</span>
          </Tag>
        ))}
      </TagBox>
      <Link to={"/create-collection/step-2"}>
        <S_Button>다음</S_Button>
      </Link>
    </Container>
  );
}

const Container = styled.div``;

const InputText = styled.input`
  width: 100%;
  height: 48px;
  padding: 0.75rem;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 5px;
  margin-bottom: 1rem;
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
