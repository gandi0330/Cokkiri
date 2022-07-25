import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className={classes.overlay} />
      <div className={classes.modal}>
        <button type="button" onClick={onClose} className={classes.modal__btn}>
          &times;
        </button>
        {children}
      </div>
    </>,
    document.getElementById('portal'),
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
