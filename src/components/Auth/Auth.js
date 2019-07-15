import {Component} from 'react';
import PropTypes from 'prop-types'
import compose from 'Utils/compose';
import {connect} from 'react-redux';
import withApiService from 'Components/hoc/withApiService';
import {authSignIn, authSignUp} from 'Redux/auth/auth.actions';

class Auth extends Component {

  static propTypes = {
    authSignIn: PropTypes.func,
    authSignUp: PropTypes.func
  };

  componentWillMount() {
    const lsUserName = localStorage.getItem('userName');
    lsUserName ?
      this.props.authSignIn(lsUserName)
      :
      this.props.authSignUp();
  }

  render() {
    return(
      {...this.props.children}
    );
  }

}

const mapDispatchToProps = (dispatch, {apiService}) => ({
  authSignIn: userName => dispatch(authSignIn(userName)),
  authSignUp: () => dispatch(authSignUp(dispatch, apiService))
});

export default compose(
  withApiService(),
  connect(null, mapDispatchToProps)
)(Auth);