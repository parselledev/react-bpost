import {Component} from 'react';
import PropTypes from 'prop-types'
import compose from 'Utils/compose';
import {connect} from 'react-redux';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';

import {selectAuthUsername} from 'Redux/auth/auth.selectors';
import {authSignUp} from 'Redux/auth/auth.actions';

class Auth extends Component {

  static propTypes = {
    username: PropTypes.string,
    authSignUp: PropTypes.func
  };

  componentWillMount() {
    const {username, authSignIn, authSignUp} = this.props;

    if(!username) authSignUp();
  }

  render() {
    return(
      {...this.props.children}
    );
  }

}

const mapStateToProps = createStructuredSelector({
  username: selectAuthUsername
});

const mapDispatchToProps = (dispatch, {apiService}) => ({
  authSignUp: () => dispatch(authSignUp(dispatch, apiService))
});

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Auth);