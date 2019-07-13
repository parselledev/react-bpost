import React from 'react';
import './Form.sass';

const Form = ({children, ...props}) => {
  return(
    <form className='c-form' {...props}>
      {children}
    </form>
  );
}

export default Form;