import { Helmet } from "react-helmet-async";

export default function Index() {
  return (
    <Helmet>
      <title>My NFT Page</title>
      <meta name="description" content="나의 NFT 컬렉션과 관련된 정보를 확인하세요. 에어드롭 및 판매 상태를 관리할 수 있습니다." />
      <meta name="keywords" content="NFT, 에어드롭, 블록체인, 암호화폐, 디지털 자산" />
      <meta name="author" content="사용자 이름" />
      <meta property="og:title" content="My NFT Page" />
      <meta property="og:description" content="나의 NFT 컬렉션과 관련된 정보를 확인하세요. 에어드롭 및 판매 상태를 관리할 수 있습니다." />
      <meta property="og:image" content="https://example.com/og-image.jpg" />
      <meta property="og:url" content="https://example.com/mynftpage" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="My NFT Page" />
      <meta name="twitter:description" content="나의 NFT 컬렉션과 관련된 정보를 확인하세요." />
      <meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
    </Helmet>
  )
}   
