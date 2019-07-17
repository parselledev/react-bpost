import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import './Spin.sass';

const Spin = () => {
  return(
    <div className='c-spin__wrapper'>
      <div className='c-spin visible'>
        <FontAwesomeIcon className="c-spin__icon" icon={faSpinner}/>
      </div>
    </div>
  );
}


const SpinOverlay = ({children, loading}) => {
  return(
    <div className='c-spin__wrapper'>
      <div className={`c-spin ${loading ? 'visible' : ''}`}>
        <img src={Icon} className="c-spin__icon"/>
      </div>
      {children}
    </div>
  );
}

Spin.Overlay = SpinOverlay;
export default Spin;