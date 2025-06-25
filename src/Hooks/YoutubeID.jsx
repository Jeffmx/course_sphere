import { useState, useEffect } from 'react';

export function useYoutubeID(url) {
  const [youtubeID, setYoutubeID] = useState(null);

  useEffect(() => {
    if (!url) {
      setYoutubeID(null);
      return;
    }

    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    if (match && match[1]) {
      setYoutubeID(match[1]);
    } else {
      setYoutubeID(null);
    }
  }, [url]);

  return youtubeID;
}
