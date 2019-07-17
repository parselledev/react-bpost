import React from 'react';
import './Modal.sass';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const Modal = ({title, content, handleModalClose}) => {
  return(
    <div className="c-modal">
      <div className="c-modal__wrap">
        <div className="c-modal__header">
          <p className="c-modal__title">{title}</p>
          <div className="c-modal__close" onClick={handleModalClose}>
            <FontAwesomeIcon
              icon={faTimes}
              className="c-modal__closeIcon"/>
          </div>
        </div>
        
        <div className="c-modal__content">{content}</div>
      </div>
    </div>
  );
}

export default Modal;