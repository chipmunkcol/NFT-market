import { useState } from "react";
import { S_Button } from "../../../styles/styledComponent"
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRef } from "react";

function C_step2() {

  const inputRef = useRef(null);
  const onClickInput = () => {
    inputRef.current.click();
  }

  return (
    <RightPart>
      <div>NFT 총 수량 [10개]</div>
      <InputLabel>NFT당 가격 * (일괄 적용됩니다)</InputLabel>
      <InputText type="number" />
      <InputLabel>민트 시작 날짜 및 시간</InputLabel>
      <InputText type="date" />
      <h1>사전 공개</h1>
      <p>컬렉션의 각 NFT에는 최종 자산을 업로드하고 공개할 때까지 사전 공개 <br />
        미디어가 표시됩니다</p>
      <PreReleaseWrap>
        <div style={{ height: '300px' }}>
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
      <InputLabel>사전 공개 설명</InputLabel>
      <InputTextArea />
      <h1>수익에 대해</h1>
      <p>기본 판매 수익을 받으려면 지갑을 추가하세요.
        스플리터 컨트랙트를 사용하여 여러 개의 지갑을 추가할 수 있습니다.
        OpenSea는 기본 판매에 대해 5%의 수수료를 받습니다.
      </p>
      <div>
        <InputText type="text" />
        <div>
          <div>95</div>
          <div>%</div>
        </div>
      </div>
      <div>
        <div>
          <div>logo</div>
          <div>오픈씨</div>
        </div>
        <div>
          <div>5</div>
          <div>%</div>
        </div>
      </div>



    </RightPart>
  )
}

const PreReleaseWrap = styled.div`
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out 0s;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
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


const InputTextArea = styled.textarea`
  width: 100%;
  height: 48px;
  padding: 0.75rem;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 5px;
  margin-bottom: 1rem;
`;


export default C_step2;