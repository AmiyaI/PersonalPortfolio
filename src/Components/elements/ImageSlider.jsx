/*
     FileName: ImageSlider.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useEffect, useState, useRef } from "react";
import { m, LazyMotion, domAnimation } from "motion/react";

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isInViewport) {
        setIndex((i) => (i + 1) % images.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images, isInViewport]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        ref={imageRef}
        initial={{ x: 200 }}
        whileInView={{ x: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="w-full h-full blob overflow-hidden"
      >
        <img src={images[index]} alt="Amiya Islam" className="h-full w-full object-cover" />
      </m.div>
    </LazyMotion>
  );
};

export default ImageSlider;
