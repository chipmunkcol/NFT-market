/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, EffectCube, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cube';
import Banner1 from "../assets/images/banner-main1.png";
import Banner2 from "../assets/images/banner-main2.png";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";


const Slider = () => {

  return (
    <Container>
      <Box>
        <Swiper
          // modules={[Navigation, Pagination, Scrollbar, A11y]}
          modules={[Autoplay]}
          // effect="cube"
          style={{ height: '100%' }}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          speed={2000}
          autoplay={{ delay: 5000 }}
        >
          <SwiperSlide>
            <BannerWrap>
              <BannerImg />
            </BannerWrap>
          </SwiperSlide>
          <SwiperSlide>
            <BannerWrap>
              <BannerImg2 />
            </BannerWrap>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Container>
  );
}

const BannerWrap = styled.div`
  width: 100%;
  height: 100%;
  /* position: absolute;
  left: 50%;
  transform: translate(-50%, 0%); */
`;

const BannerImg = styled.div`
background-image: url(${Banner1});
background-position: center;
background-size: cover;
height: 100%;
width: 100%;
`;
const BannerImg2 = styled.div`
background-image: url(${Banner2});
background-position: center;
background-size: cover;
height: 100%;
width: 100%;
`;
const Container = styled.div`
  padding: 2rem 0 0 0;
  user-select: none;
`;
const Box = styled.div`
  width: 858px;
  height: 130px;
  margin: 0 auto;
`;

export default Slider;