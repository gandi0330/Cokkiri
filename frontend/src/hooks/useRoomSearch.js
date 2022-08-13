import { useEffect, useState } from 'react';

import axios from 'axios';

const useRoomSearch = (query, lastItemIdx) => {
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
      url: '/room/list',
      params: { cursor: lastItemIdx, limit: 15, keyword: query },
      signal: controller.signal,

    }).then((res) => {
      setRooms((prevRooms) => {
        if (res.data?.findRoomList) {
          return [...new Set([...prevRooms, ...res.data.findRoomList])];
        }
        return [...prevRooms];
      });
      setHasMore(res.data !== '');
      setLoading(false);
    }).catch((err) => {
      if (axios.isCancel(err)) return;
      setError(err);
    });

    return () => controller.abort();
  }, [query, lastItemIdx]);

  return { 
    loading, error, rooms, hasMore,
  };
};

export default useRoomSearch;

// import { useEffect, useState } from 'react';

// import axios from 'axios';

// const useRoomSearch = (query, lastItemIdx) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [rooms, setRooms] = useState([]);
//   const [hasMore, setHasMore] = useState(false);

//   useEffect(() => {
//     setRooms([]);
//   }, [query]);

//   useEffect(() => {
//     setLoading(true);
//     setError(null); 
    
//     const controller = new AbortController();

//     axios({
//       method: 'GET',
//       url: 'http://openlibrary.org/search.json',
//       params: { q: query, page: lastItemIdx },
//       signal: controller.signal,

//     }).then((res) => {
//       setRooms((prevRooms) => {
//         return [...new Set([...prevRooms, ...res.data.docs.map((book) => book.title)])];
//       });
//       setHasMore(res.data.docs.length > 0);
//       setLoading(false);
//     }).catch((err) => {
//       if (axios.isCancel(err)) return;
//       setError(err);
//     });

//     return () => controller.abort();
//   }, [query, lastItemIdx]);

//   return { 
//     loading, error, rooms, hasMore,
//   };
// };

// export default useRoomSearch;
