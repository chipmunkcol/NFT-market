import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Css = {
  color: string;
};

/**
 * LazyloadComponent
 * @description LazyloadComponent
 * @param {LazyloadComponentProps} props
 * @returns {JSX.Element} // img 태그
 */
interface LazyloadComponentProps {
  css: Css;
  children: JSX.Element;
}
const LazyLoadFlipedComponet = ({ css, children }: LazyloadComponentProps) => {
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
    <div ref={targetRef}>
      <FlipedBox $inView={inView}>
        <LoadingWrap $css={css} />
        <ContentWrap>{inView && children}</ContentWrap>
      </FlipedBox>
    </div>
  );
};

export default LazyLoadFlipedComponet;

const FlipedBox = styled.div<{ $inView: boolean }>`
  width: 100%;
  height: 100%;
  display: inline-grid;
  transition: transform 1s;
  transform: perspective(800px)
    ${(props) => (props.$inView ? "rotateX(0deg)" : "rotateX(180deg)")};
  transform-style: preserve-3d;
`;

const LoadingWrap = styled.div<{ $css: Css }>`
  width: 100%;
  height: 100%;

  background-color: ${(props) => props.$css.color};

  grid-area: 1 / 1 / 1 / 1;
  backface-visibility: hidden;
  transform: rotateX(180deg);
`;

const ContentWrap = styled.div`
  width: 100%;
  height: 100%;

  grid-area: 1 / 1 / 1 / 1;
`;
