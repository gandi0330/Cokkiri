import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineKeyboardArrowDown as Arrow } from 'react-icons/md';

import classes from './QuestionDropdown.module.css';

const QuestionDropdown = ({ selected, setSelected, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const clickHandler = (event) => {
    setSelected(event.target.textContent);
    setIsOpen(false);
  };

  return (
    <div className={classes.dropdown}>
      <div className={classes.dropdownTitle} onClick={() => setIsOpen((prevState) => !prevState)}>
        {selected}
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
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

QuestionDropdown.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QuestionDropdown;
