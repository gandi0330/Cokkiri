import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import RoomCreationForm from './RoomCreationForm';
import Modal from '../layout/Modal';

import classes from './SearchBar.module.css';

const SearchBar = (
  // { rooms, onSearchedRooms },
  { rooms, onSearchHandler },
) => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [enteredInput, setEnteredInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchHandler = () => {
    setEnteredInput(searchRef.current.value);
  };

  useEffect(() => {
    // Dummy data 용
    // const filteredResult = rooms.filter((room) => {
    //   return room.title.toLowerCase().includes(enteredInput.toLowerCase());
    // });
    // onSearchedRooms(filteredResult);

    // api 용
    onSearchHandler(enteredInput);
  }, [enteredInput, rooms]);

  const handleMakeRoomBtn = () => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className={classes.searchBar}>
      <input
        type="text"
        ref={searchRef}
        placeholder="스터디를 검색해보세요."
        value={enteredInput}
        onChange={searchHandler}
      />
      <button type="button" onClick={handleMakeRoomBtn}>
        방 만들기
      </button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RoomCreationForm />
      </Modal>
    </div>
  );
};

SearchBar.propTypes = {
  rooms: PropTypes.array.isRequired,
  // onSearchedRooms: PropTypes.func.isRequired,
  onSearchHandler: PropTypes.func.isRequired,
};

export default SearchBar;
