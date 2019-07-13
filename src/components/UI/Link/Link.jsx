import React from 'react';
import './Link.sass';

const Link = ({classMod, text, className, ...props}) => {
  return(
    <a
      className={`${className} c-link c-link--${classMod}`}
      {...props}>
        {text}
    </a>
  );
}

export default Link;