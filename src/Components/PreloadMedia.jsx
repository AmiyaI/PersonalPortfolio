/*
     FileName: PreloadMedia.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useEffect, useState } from 'react'
import Loader from './Loader';

// Never hold the page behind the loader longer than this, even on a slow network.
const MAX_WAIT_MS = 3000;

const PreloadMedia = ({images, children}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    const finish = () => {
      if (active) setLoaded(true);
    };

    const decodes = images.map((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
      return img.decode().catch(() => {});
    });

    Promise.all(decodes).then(finish);
    const timeout = setTimeout(finish, MAX_WAIT_MS);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [images]);

  return loaded ? children : <Loader />
}

export default PreloadMedia;
