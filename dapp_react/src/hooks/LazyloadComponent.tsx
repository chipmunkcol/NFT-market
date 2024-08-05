import { useEffect, useRef, useState } from "react";
import loadingImg from "../assets/images/달팽이로딩.png";

/**
 * LazyloadComponent
 * @description LazyloadComponent
 * @param {LazyloadComponentProps} props
 * @returns {JSX.Element} // img 태그
 */
interface LazyloadComponentProps {
  children: JSX.Element;
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
    <div ref={targetRef}>{!inView ? <img src={loadingImg} /> : children}</div>
  );
};

export default LazyloadComponent;
