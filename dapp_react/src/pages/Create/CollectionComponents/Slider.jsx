/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import '../../../styles/Library/slider.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import styled from 'styled-components';
import { GlobalContext } from '../../../context/GlobalContext';

export default function Slider({ files, cancelHandler }) {
  const { account, collection, setCollection, setCollectionIndex } = useContext(GlobalContext);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const getIpfsToJsonData = ipfsUrl => {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsUrl}`;
    return url;
  }

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        onSlideChange={(e) => setCollectionIndex(e.activeIndex)}
      >
        {
          files?.map((file, index) => (
            <SwiperSlide>
              <PreviewFile>
                <img src={collection.nfts[index]?.image ? getIpfsToJsonData(collection.nfts[index].image) : URL.createObjectURL(file)} alt="preview" />
                <CancelWrap>
                  <CancelBtn onClick={cancelHandler}>x</CancelBtn>
                </CancelWrap>
              </PreviewFile>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          files?.map((file, index) => (
            <SwiperSlide >
              <img src={collection.nfts[index]?.image ? getIpfsToJsonData(collection.nfts[index].image) : URL.createObjectURL(file)} alt="thumb" />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
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

// const NextSliderWrap = styled.div`
//   position: absolute;
//   top: 45%;
//   right: 1rem;
// `;

// const NextSliderBtn = styled(CancelBtn)`
//   font-size: 40px;
// `;

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