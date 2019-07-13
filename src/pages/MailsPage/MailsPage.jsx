import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from '../../../utils/compose';
import withApiService from '../../hoc/withApiService';
import {fetchResetExecution ,fetchMails} from '../../../actions/mailsActions';
import './MailsPage.sass';
import MailsHeader from '../../Mails/MailsHeader/MailsHeader';
import MailsList from '../../Mails/MailsList/MailsList';

class MailsPageContainer extends Component {

  static propTypes = {
    fetchResetExecution: PropTypes.func.isRequired,
    fetchMails: PropTypes.func.isRequired
  };

  fetchMailsTimer = setInterval(() => {
    this.props.fetchMails();
  },2000);

  componentDidMount() {
    //Сбрасываем таймер у писем которые не сделали и выгружаем на сервер
    // this.props.fetchResetExecution();

    this.props.fetchMails();
  }

  componentWillUnmount() {
    clearInterval(this.fetchMailsTimer);
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

const mapDispatchToProps = (dispatch, {apiService}) => {
  return {
    fetchResetExecution: fetchResetExecution(dispatch, apiService),
    fetchMails: fetchMails(dispatch, apiService)
  };
}

export default compose(
  withApiService(),
  connect(null, mapDispatchToProps)
)(MailsPageContainer);