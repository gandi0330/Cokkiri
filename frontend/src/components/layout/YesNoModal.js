import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

import classes from './YesNoModal.module.css';

const YesNoModal = ({
  yes, no, onYesClick, onNoClick, onClose, open, children,
  // children expected to be <p> tags with Warning Msgs
}) => {
  return (
    <Modal onClose={onClose} open={open}>
      <div className={classes.modal__contents}>
        <div className={classes.modal__children}>
          {children}
        </div>
        <div className={classes.modal__btns}>
          <button className={classes.modal__no} type="button" onClick={onNoClick}>{no}</button>
          <button className={classes.modal__yes} type="button" onClick={onYesClick}>{yes}</button>
        </div>
      </div>
    </Modal>
  );
};

YesNoModal.propTypes = {
  yes: PropTypes.string.isRequired,
  no: PropTypes.string.isRequired,
  onYesClick: PropTypes.func.isRequired,
  onNoClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default React.memo(YesNoModal);
