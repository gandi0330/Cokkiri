// import { useEffect } from 'react';
// import { axiosPrivate } from '../api/axios';
// import useRefreshToken from './useRefreshToken';
// // import useAuth from './useAuth';

// const useAxiosPrivate = () => {
//   const refresh = useRefreshToken();
//   // const { auth } = useAuth();

//   useEffect(() => {
//     const requestIntercept = axiosPrivate.interceptors.request.use((config) => {
//       console.log('sdfsfsd');
//       // if (!config.headers?.jwt) {
//       //   console.log('sdfsdf');
//       //   config.headers.jwt = auth?.accessToken;
//       //   config.headers.jwt = localStorage.getItem('token') ? 
// localStorage.getItem('token') : '';
//       // } 
//       const accessToken = localStorage.getItem('token');
//       if (accessToken) {
//         config.headers.jwt = accessToken;
//         console.log('headers.jwt', config.headers.jwt);
//       }
//       return config;
//     }, (error) => Promise.reject(error)); 

//     // response interceptor

//     const responseIntercept = axiosPrivate.interceptors.response.use(
//       (response) => response,
//       async (error) => { 
//         const prevRequest = error?.config;
//         if (error?.response?.status === 403 && !prevRequest?.sent) {
//           prevRequest.sent = true;
//           const newAccessToken = await refresh();
//           prevRequest.headers.jwt = newAccessToken;
//           return axiosPrivate(prevRequest); 
//         }
//         return Promise.reject(error);
//       },
//     );

//     return () => {
//       axiosPrivate.interceptors.request.eject(requestIntercept);
//       axiosPrivate.interceptors.response.eject(responseIntercept);
//     };
//   }, [auth, refresh]);

//   return axiosPrivate;
// };

// export default useAxiosPrivate;
