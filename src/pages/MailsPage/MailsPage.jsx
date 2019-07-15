import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import withApiService from 'Components/hoc/withApiService';

import {mailsGet} from 'Redux/mails/mails.actions';

import './MailsPage.sass';
import MailsHeader from 'Components/Mails/MailsHeader/MailsHeader';
import MailsList from 'Components/Mails/MailsList/MailsList';

class MailsPageContainer extends Component {

  static propTypes = {
    mailsGet: PropTypes.func.isRequired
  };

  // mailsGetTimer = setInterval(() => {
  //   this.props.mailsGet();
  // },2000);

  componentDidMount() {
    this.props.mailsGet();
  }

  // componentWillUnmount() {
  //   clearInterval(this.mailsGetTimer);
  // }

  render() {
    return(
      <div className="app__mails">
        <MailsHeader />
        <MailsList />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, {apiService}) => {
  return {
    mailsGet: mailsGet(dispatch, apiService)
  };
}

export default compose(
  withApiService(),
  connect(null, mapDispatchToProps)
)(MailsPageContainer);