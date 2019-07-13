import React, {Component} from 'react';
import PropTypes from 'prop-types'
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import withApiService from '../hoc/withApiService';
import {loginOldUser, loginNewUser} from '../../actions/loginActions';

class Login extends Component {

  static propTypes = {
    loginOldUser: PropTypes.func,
    loginNewUser: PropTypes.func
  };

  componentDidMount() {
    const lsUserName = localStorage.getItem('userName');

    lsUserName ?
      this.props.loginOldUser(lsUserName)
      :
      this.props.loginNewUser();
  }

  render() {

    const {children} = this.props;

    return(
      {...children}
    );
  }

}

const mapDispatchToProps = (dispatch, {apiService}) => {
  return {
    loginOldUser: userName => dispatch(loginOldUser(userName)),
    loginNewUser: () => dispatch(loginNewUser(dispatch, apiService))
  };
}

export default compose(
  withApiService(),
  connect(null, mapDispatchToProps)
)(Login);