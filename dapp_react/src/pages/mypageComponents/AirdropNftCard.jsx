import { useEffect, useState } from "react";
import useGetTokenData from "../../hooks/useGetTokenData";
import styled from "styled-components";
import { MintContract } from "../../../contracts";
import { P_removeMetadataAirdrop, P_updateMetadataAirdrop } from "../../hooks/common";

export default function AirdropNftCard({ collection, account }) {
  const { startAt, tempTokenUrl, ids } = collection;
  const tokenData = useGetTokenData(tempTokenUrl);
  const { name, description, image } = tokenData;
  // const [remainedTime, setRemainedTime] = useState(parseInt(startAt) - Math.floor(Date.now() / 1000));

  const [remainedTimeStr, setRemainedTimeStr] = useState('');
  let remainedTimeSec = 0;

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      remainedTimeSec = parseInt(startAt) - currentTime;

      // 남은 시간을 일, 시, 분, 초로 변환
      const days = Math.floor(remainedTimeSec / (3600 * 24));
      const hours = Math.floor(remainedTimeSec % (3600 * 24) / 3600);
      const minutes = Math.floor(remainedTimeSec % 3600 / 60);
      const seconds = Math.floor(remainedTimeSec % 60);

      // 변환된 남은 시간을 문자열로 설정
      setRemainedTimeStr(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);

    }, 1000);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [startAt]);

  // air drop Controller
  const airdropController = async () => {
    const airdropResult = await MintContract.methods.airdrop(account, tempTokenUrl).send({ from: account });
    console.log('airdropResult: ', airdropResult);
    const collectionIpfs = await MintContract.methods.getTokenUrl(parseInt(ids[0])).call();
    const updateMetadataResult = await P_updateMetadataAirdrop(tempTokenUrl, collectionIpfs);
    console.log('updateMetadataResult: ', updateMetadataResult);
    const removeMetadataResult = P_removeMetadataAirdrop(tempTokenUrl, account);
    console.log('removeMetadataResult: ', removeMetadataResult);
  }

  const airdropHandler = async () => {
    const airdropResult = await MintContract.methods.airdrop(account, tempTokenUrl).send({ from: account });
    return airdropResult;
  }

  // ipfs 메타데이터 덮어쓰기 (tempIpfs -> collectionIpfs)
  const updateMetadataHandler = async () => {
    P_updateMetadataAirdrop(tempTokenUrl)
  }

  return (
    <li key={`air-drop-${collection.tempTokenUrl}`} style={{ display: 'flex' }}>
      <div>
        <img src={image} alt="collection" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
      </div>
      <div>
        <h3 style={{ marginBottom: '5px' }}>collection name {name}</h3>
        <p style={{ marginBottom: '15px' }}>collection description {description}</p>
        {remainedTimeSec > 1 ?
          (<div>남은시간: {remainedTimeStr}</div>) :
          (<AirdropBtn onClick={airdropController}>
            <button>Air drop</button>
          </AirdropBtn>)
        }
      </div>
    </li>
  )
}

const AirdropBtn = styled.div`
  button {
    background: #2081e2;
    border-radius: 10px;
    color: #ffffff;
    padding: 10px 10px;
    font-weight: 700;
  }
`;