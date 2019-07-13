import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Dropdown.sass';

class Dropdown extends Component {

  static propTypes = {
    content: PropTypes.array
  };

  state = {
    visible: false
  };

  componentWillMount() {
    document.addEventListener('click', this.onClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside, false);
  }

  onClickOutside = e => {
    const domNode = ReactDOM.findDOMNode(this);

    if(!domNode || !domNode.contains(e.target)) {
      this.setState({visible: false});
    }
  }

  onDropdownChange = () => {
    this.setState(state => {
      return {
        visible: !state.visible
      }
    });
  }

  render() {
    const {visible} = this.state;
    const {content, children} = this.props;

    return(
      <div className="c-dropdown">
        <DropdownBtn wrappedBtn={children} onClick={()=>this.onDropdownChange()}/>
        <ul className={`c-dropdown__list ${visible ? 'visible' : ''}`}>
          {content}
        </ul>
      </div>
    );
  }
}

const DropdownBtn = ({wrappedBtn, ...props}) => {
  return React.cloneElement(wrappedBtn, props)
}

const DropdownItem = ({text, disabled, ...props}) => {
  return(
    <li className={`c-dropdown__item ${disabled ? 'disabled' : ''}`} {...props}>
      {text}
    </li>
  );
}

Dropdown.Item = DropdownItem;
export default Dropdown;