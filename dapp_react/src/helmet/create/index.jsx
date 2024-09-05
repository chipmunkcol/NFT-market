import { Helmet } from "react-helmet-async";

export default function Index() {
  return (
    <Helmet>
      <title>NFT Create</title>
      <meta name="description" content="이미지 파일만 있으면 누구나 NFT를 만들 수 있습니다. NFT 생성 및 컬렉션 드롭에 대한 정보를 제공합니다." />
      <meta name="keywords" content="NFT 생성, 이미지 파일, 디지털 자산, 블록체인, 에어드랍, NFT 컬렉션" />
      <meta property="og:title" content="NFT 생성 페이지" />
      <meta property="og:description" content="이미지 파일을 통해 NFT를 쉽게 생성하고, 컬렉션 NFT를 드롭할 수 있습니다." />
      <meta property="og:image" content="https://opensea.io/static/images/logos/opensea-logo.svg?react" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:url" content="https://dztwi6z9vov5x.cloudfront.net/create" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="NFT 생성 페이지" />
      <meta name="twitter:description" content="이미지 파일을 통해 NFT를 쉽게 생성하고, 컬렉션 NFT를 드롭할 수 있습니다." />
      <meta name="twitter:image" content="https://opensea.io/static/images/logos/opensea-logo.svg?react" />
    </Helmet>
  )
}   