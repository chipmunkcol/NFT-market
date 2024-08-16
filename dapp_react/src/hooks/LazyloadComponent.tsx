import { useEffect, useRef, useState } from "react";
import loadingImg from "../assets/images/달팽이로딩.png";

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
    <div ref={targetRef}>{!inView ? <img src={loadingImg} /> : children}</div>
  );
};

export default LazyloadComponent;
