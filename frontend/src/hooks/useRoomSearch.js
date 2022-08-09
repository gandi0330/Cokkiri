import { useEffect, useState } from 'react';

import axios from 'axios';

const useRoomSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setRooms([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(null); 
    
    const controller = new AbortController();

    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      signal: controller.signal,

    }).then((res) => {
      setRooms((prevRooms) => {
        return [...new Set([...prevRooms, ...res.data.docs.map((book) => book.title)])];
      });
      setHasMore(res.data.docs.length > 0);
      setLoading(false);
    }).catch((err) => {
      if (axios.isCancel(err)) return;
      setError(err);
    });

    return () => controller.abort();
  }, [query, pageNumber]);

  return { 
    loading, error, rooms, hasMore,
  };
};

export default useRoomSearch;
