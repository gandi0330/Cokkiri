import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import RoomCreationForm from './RoomCreationForm';
import Modal from '../layout/Modal';

import classes from './SearchBar.module.css';

const SearchBar = (
  // { rooms, onSearchedRooms },
  { rooms, onSearchHandler },
) => {
  const searchRef = useRef();
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

  return (
    <div className={classes.searchBar}>
      <input
        type="text"
        ref={searchRef}
        placeholder="스터디를 검색해보세요."
        value={enteredInput}
        onChange={searchHandler}
      />
      <button type="button" onClick={() => setIsModalOpen(true)}>
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
