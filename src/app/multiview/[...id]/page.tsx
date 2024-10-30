"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from "./page.module.scss";

async function fetchStreams(soopIds: string[]) {
  const response = await fetch(`http://localhost:3000/api/multiview/${soopIds.join('/')}`);
  return await response.json();
}

function HomePage() {
  const [streams, setStreams] = useState<{ name: string; player: string }[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const loadStreams = async () => {
      const pathParts = pathname.split('/'); 
      const soopIds = pathParts.slice(2);
      
      if (soopIds.length > 0) {
        const data = await fetchStreams(soopIds);
        setStreams(data);
      }
    };
    loadStreams();
  }, [pathname]);

  useEffect(() => {
    const adjustLayout = () => {
      const streamFrames = document.querySelectorAll<HTMLIFrameElement>("#streams iframe");

      const width = window.innerWidth - 8;
      const height = window.innerHeight - 8;

      let bestWidth = 1, bestHeight = 1;
      const n = streamFrames.length;

      for (let cols = 1; cols <= n; cols++) {
        const rows = Math.ceil(n / cols);
        let maxWidth = Math.floor(width / cols);
        let maxHeight = Math.floor(height / rows);

        if ((maxWidth * 9) / 16 < maxHeight) {
          maxHeight = Math.floor((maxWidth * 9) / 16);
        } else {
          maxWidth = Math.floor((maxHeight * 16) / 9);
        }

        if (maxWidth > bestWidth) {
          bestWidth = maxWidth;
          bestHeight = maxHeight;
        }
      }

      streamFrames.forEach(frame => {
        frame.style.flexGrow = "0";
        frame.style.width = `${bestWidth}px`;
        frame.style.height = `${bestHeight}px`;
      });
    };

    adjustLayout();
    window.addEventListener("resize", adjustLayout);
    return () => window.removeEventListener("resize", adjustLayout);
  }, []);

  return (
    <div className={styles.container}>
      <div id="streams" className={styles.streams}>
        {streams.map((stream) => (
          <div key={stream.name}>
            <iframe
              src={stream.player}
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              className={styles.iframe}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;