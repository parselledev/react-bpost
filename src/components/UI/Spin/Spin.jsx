import React from 'react';
import './Spin.sass';
import Icon from 'Assets/img/spin-icon.svg'

const Spin = () => {
  return(
    <div className='c-spin__wrapper'>
      <div className='c-spin visible'>
        <img src={Icon} className="c-spin__icon"/>
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