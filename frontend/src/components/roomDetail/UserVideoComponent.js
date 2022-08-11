import OvVideo from './OvVideo';

// eslint-disable-next-line react/prop-types
const UserVideoComponent = ({ streamManager }) => {
  // const getNicknameTag = () => {
  //   // eslint-disable-next-line react/prop-types
  //   return JSON.parse(streamManager.stream.connection.data).clientData; 
  // };
  // return (
  //   <div>
  //     {streamManager && (
  //       <div>
  //         <OvVideo streamManager={streamManager} />
  //         {/* <p>{getNicknameTag()}</p> */}
  //       </div>
  //     )}
  //   </div>
  // );
  return <OvVideo streamManager={streamManager} />;
};

export default UserVideoComponent;
