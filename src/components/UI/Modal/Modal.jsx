import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.sass';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

class Modal extends Component {

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.element,
    visible: PropTypes.bool,
  };

  state = {
    visible: false
  }

  componentDidMount() {
    this.setState({visible: this.props.visible})
  }

  // componentWillMount() {
  //   document.addEventListener('click', this.onClickOutside, false);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('click', this.onClickOutside, false)
  // }

  // onClickOutside = e => {
  //   const domNode = ReactDOM.findDOMNode(this);

  //   if(!domNode || !domNode.contains(e.target)) {
  //     this.setState({visible: false});
  //   }
  // }

  onModalToggle = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  onModalClose = () => {
    this.setState({
      visible: false  
    });
  }
  
  render() {
    const {visible} = this.state;
    const {title, content, children} = this.props;

    return(
      <div>
        <ModalBtn
          wrappedBtn={children}
          onClick={() => this.onModalToggle()}/>
        
        <div className={`c-modal ${visible ? 'visible' : ''}`}>
          <div className="c-modal__wrap">
            <div className="c-modal__header">
              <p className="c-modal__title">{title}</p>
              <FontAwesomeIcon
                icon={faTimes}
                className="c-modal__close"
                onClick={this.onModalClose}/>
              {/* <img
                src={closeIcon}
                className="c-modal__close"
                onClick={this.onModalClose}/> */}
            </div>
            
            <div className="c-modal__content">{content}</div>
          </div>
        </div>
      </div>
    );
  }
}

const ModalBtn = ({wrappedBtn, ...props}) => {
  return React.cloneElement(wrappedBtn, props)
}

export default Modal;