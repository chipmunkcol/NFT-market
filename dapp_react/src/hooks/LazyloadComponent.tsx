import { useEffect, useRef, useState } from "react";
import loadingImg from "../assets/images/달팽이로딩.png";
import styled, { keyframes } from "styled-components";

type Css = {
  height: string;
};

/**
 * LazyloadComponent
 * @param {LazyloadComponentProps} // img 태그
 */
interface LazyloadComponentProps {
  children: JSX.Element; // img 태그
}
const LazyloadComponent = ({ children }: LazyloadComponentProps) => {
  const targetRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      });
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    // loading img 대신 스켈레톤 UI가 더 좋을듯
    <div style={{ width: "100%", height: "100%" }} ref={targetRef}>
      {!inView ? <SkeletonLoader /> : children}
    </div>
  );
};

export default LazyloadComponent;

const loadingAnimation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

export const SkeletonLoader = styled.div<{ $css?: Css }>`
  width: 100%;
  height: ${(props) => (props.$css?.height ? props.$css.height : "100%")};
  background-color: #f5f5f5; /* 기본 배경색 */
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%; /* 시작 위치 */
    width: 500px;
    height: 100%;
    /* background-color: #cccccc; */
    background: linear-gradient(
      90deg,
      rgba(245, 245, 245, 1) 0%,
      #ffffffae 10%,
      rgba(245, 245, 245, 1) 20%
    );
    animation: ${loadingAnimation} 2s infinite; /* 애니메이션 설정 */
  }
`;
