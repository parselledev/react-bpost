import React, {Component} from 'react';
import './UserInfo.sass';
import PropTypes from 'prop-types'
import compose from 'Utils/compose';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

const UserInfo = ({username}) => {
  return(
    <div className="mails__userInfo">
      <FontAwesomeIcon icon={faUser} className="userInfo__icon"/>
      <p className="userInfo__title">{`ID: ${username}`}</p>
    </div>
  );
}

class UserInfoContainer extends Component {

  static propTypes = {
    username: PropTypes.string
  };

  render() {

    const {username} = this.props;

    return(
      <UserInfo
        username={username}
      />
    )
  }
}

const mapStateToProps = ({auth: {username}}) => {
  return {username}
}

export default compose(
  connect(mapStateToProps)
)(UserInfoContainer);