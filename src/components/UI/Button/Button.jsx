import React, {Component} from 'react';
import './Button.sass';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Button = ({className = '', classMod, text='', icon, ...props}) => {
  const content = icon ?
    <React.Fragment>
      <FontAwesomeIcon icon={icon} className="c-btn__icon"/>
      <span>{text}</span>
    </React.Fragment>
    :
    text;

  return(
    <button
      className={`${className} c-btn c-btn--${classMod}`}
      {...props}>
        <div className="c-btn__content">
          {content}
        </div>
    </button>
  );
}


class ButtonClipboard extends Component {

  state = {
    textValue: this.props.text
  }

  handleClick = (e) => {
    const {text, clipboardtext, temptext} = this.props

    this.setState({textValue: temptext})
    navigator.clipboard.writeText(clipboardtext);
    setTimeout(() => {
      this.setState({textValue: text});
    }, 1000);
  }

  render() {
    const {classMod, className, ...props} = this.props;
    const {textValue} = this.state

    return(
      <button
        className={`${className} c-btn c-btn--${classMod}`}
        onClick={this.handleClick}
        {...props}>
          {textValue}
      </button>
    );
  }
}

Button.Clipboard = ButtonClipboard;

export default Button;