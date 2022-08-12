import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineKeyboardArrowDown as Arrow } from 'react-icons/md';

import classes from './Dropdown.module.css';

const Dropdown = ({ selected, setSelected, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const clickHandler = (event) => {
    setSelected(event.target.textContent);
    setIsOpen(false);
  };

  return (
    <div className={classes.dropdown}>
      <div className={classes.dropdownTitle} onClick={() => setIsOpen((prevState) => !prevState)}>
        {`${selected}`.includes('명') ? selected : `${selected}명`}
        <span><Arrow /></span>
      </div>
      {isOpen && (
        <div className={classes.dropdownContent}>
          {options.map((item) => (
            <div
              key={item}
              className={classes.dropdownItem}
              onClick={clickHandler}
            >
              {`${item}명`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Dropdown;
