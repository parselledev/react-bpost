import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';

import {selectMailsData} from 'Redux/mails/mails.selectors';
import {mailsGet, mailsResetNonCompleted, mailsDeleteOld} from 'Redux/mails/mails.actions';

import './MailsPage.sass';
import MailsHeader from 'Components/Mails/MailsHeader/MailsHeader';
import MailsList from 'Components/Mails/MailsList/MailsList';

class MailsPageContainer extends Component {

  static propTypes = {
    mails: PropTypes.object,
    mailsGet: PropTypes.func.isRequired,
    mailsResetNonCompleted: PropTypes.func.isRequired
  };

  mailsGetTimer = setInterval(() => {
    this.props.mailsGet();
    this.props.mailsResetNonCompleted(this.props.mails);
    this.props.mailsDeleteOld(this.props.mails);
  },3000);

  componentDidMount() {
    this.props.mailsGet();
  }

  componentWillUnmount() {
    clearInterval(this.mailsGetTimer);
  }

  render() {
    return(
      <div className="app__mails">
        <MailsHeader />
        <MailsList />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  mails: selectMailsData
});

const mapDispatchToProps = (dispatch, {apiService}) => ({
  mailsGet: mailsGet(dispatch, apiService),
  mailsResetNonCompleted: mails => dispatch(mailsResetNonCompleted(dispatch, apiService, mails)),
  mailsDeleteOld: mails => dispatch(mailsDeleteOld(dispatch, apiService, mails))
})

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MailsPageContainer);