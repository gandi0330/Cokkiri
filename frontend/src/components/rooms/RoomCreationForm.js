import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';

const RoomCreationForm = () => {
  const navigate = useNavigate();
  const [roomName, onChangeRoomName] = useInput('');
  const [roomContent, onChangeRoomContent] = useInput('');
  const [roomPassword, onChangeRoomPassword] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('방 만들기 디스페치~~', roomName, roomContent, roomPassword);
    navigate(`/roomDetail/${roomName}`, { replace: true });
  }, [roomName, roomContent, roomPassword]);

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="roomName">
        방 제목
        <input type="text" placeholder="방 제목을 입력해 주세요." id="roomName" name="roomName" value={roomName} onChange={onChangeRoomName} />
      </label>
      <label htmlFor="roomContent">
        방 설명
        <input type="text" placeholder="방 설명을 입력해 주세요." id="roomContent" name="roomContent" value={roomContent} onChange={onChangeRoomContent} />
      </label>
      {/* <option></option> */}
      <input type="text" value={roomPassword} onChange={onChangeRoomPassword} />
      <button type="submit">방 만들기</button>
    </form>
  );
};

export default RoomCreationForm;
