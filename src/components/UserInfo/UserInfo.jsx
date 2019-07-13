import React, {Component} from 'react';
import './UserInfo.sass';
import PropTypes from 'prop-types'
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

const UserInfo = ({userName}) => {
  return(
    <div className="mails__userInfo">
      <FontAwesomeIcon icon={faUser} className="userInfo__icon"/>
      <p className="userInfo__title">{`ID: ${userName}`}</p>
    </div>
  );
}

class UserInfoContainer extends Component {

  static propTypes = {
    userName: PropTypes.string
  };

  render() {

    const {userName} = this.props;

    return(
      <UserInfo
        userName={userName}
      />
    )
  }
}

const mapStateToProps = ({login: {userName}}) => {
  return {userName}
}

export default compose(
  connect(mapStateToProps)
)(UserInfoContainer);