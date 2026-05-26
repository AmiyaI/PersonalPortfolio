/*
     FileName: PreloadMedia.jsx
     @version: I
     Creation: 10/23/2023
     Last modification: 10/23/2023
*/

import { useState, useEffect } from 'react';
import Loader from './Loader';

const PreloadMedia = ({ images, children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) {
      setLoaded(true);
      return undefined;
    }

    let settled = 0;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setLoaded(true);
    };
    const onSettle = () => {
      settled += 1;
      if (settled >= images.length) finish();
    };

    const imgs = images.map((src) => {
      const img = new Image();
      img.onload = onSettle;
      img.onerror = onSettle;
      img.src = src;
      return img;
    });

    // Safety net: never block the UI for more than 3s
    const timer = setTimeout(finish, 3000);

    return () => {
      clearTimeout(timer);
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [images]);

  return loaded ? children : <Loader />;
};

export default PreloadMedia;
