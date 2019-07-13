import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from '../../../utils/compose';
import withApiService from '../../hoc/withApiService';
import './MailsList.sass';
import MailsListItem from '../MailsListItem/MailsListItem';
import {fetchStartMail, fetchCancelMail, fetchCompleteMail,fetchDeleteMail} from '../../../actions/mailsActions';
import Spin from '../../UI/Spin/Spin';

const MailsList = ({
  userName,
  mails,
  fetching,
  filter,
  search,
  category,
  onStartMail,
  onCancelMail,
  onCompleteMail,
  onDeleteMail}) => {
  
  if(mails == null || (!fetching && Object.keys(mails).length == 0)) return <p>Писем нет</p>
  if(fetching && Object.keys(mails).length == 0) return <Spin />

  const processMails = (mails, filter, search, category) => {
    let result = {};
    let isCategory = true;

    for(let key in mails) {
      const mail = mails[key];

      switch(category) {
        case 'ACTIVE':
          isCategory = !mail.completed && (userName == mail.postman || !mail.postman);
          break;
        
        case 'MINE':
          isCategory = userName == mail.postman || userName == mail.owner;
          break;

        case 'COMPLETED':
          isCategory = mail.completed == true;
          break;
      }

      if(
        mail &&
        // (mail.text.toLowerCase().indexOf(search.toLowerCase()) > -1) &&
        (mail.text.toLowerCase().includes(search.toLowerCase())) &&
        (mail.social === filter || filter === 'ALL') &&
        isCategory) {
        result[key] = mail;
      }
    }
    return result;
  }

  const visibleMails = processMails(mails, filter, search, category);

  return(
    Object.keys(visibleMails).length != 0 ?
      <ul className="mails__list">
        {
          Object.keys(visibleMails).map(key => {
            return(
              <MailsListItem
                key={key}
                id={key}
                fetching={fetching}
                userName={userName}
                mail={visibleMails[key]}
                onStartMail={onStartMail}
                onCancelMail={onCancelMail}
                onCompleteMail={onCompleteMail}
                onDeleteMail={onDeleteMail}
              />
            );
          })
        }
      </ul>
    :
    <p>Нет подходящих результатов</p>
  );
}

class MailsListContainer extends Component {

  static propTypes = {
    userName: PropTypes.string,
    mails: PropTypes.object,
    filter: PropTypes.string,
    search: PropTypes.string,
    category: PropTypes.string,
    onStartMail: PropTypes.func,
    onCancelMail: PropTypes.func,
    onCompleteMail: PropTypes.func,
    onDeleteMail: PropTypes.func
  };

  render() {
    const {
      userName,
      mails,
      fetching,
      filter,
      search,
      category,
      onStartMail,
      onCancelMail,
      onCompleteMail,
      onDeleteMail} = this.props;

    return(
      <MailsList
        userName={userName}
        mails={mails}
        fetching={fetching}
        filter={filter}
        search={search}
        category={category}
        onStartMail={onStartMail}
        onCancelMail={onCancelMail}
        onCompleteMail={onCompleteMail}
        onDeleteMail={onDeleteMail}
      />
    );
  }

}

const mapStateToProps = ({
  login:{userName},
  mails:{data: mails, fetching,  filter, search, category}
}) => {
  return {userName, mails, fetching, filter, search, category};
}

const mapDispatchToProps = (dispatch, {apiService}) => {
  return {
    onStartMail: (id, userName, startTimestamp, mail) => dispatch(fetchStartMail(dispatch, apiService, id, userName, startTimestamp, mail)),
    onCancelMail: (id, mail) => dispatch(fetchCancelMail(dispatch, apiService, id, mail)),
    onCompleteMail: (id, screenshot, mail) => dispatch(fetchCompleteMail(dispatch, apiService, id, screenshot, mail)),
    onDeleteMail: (id) => dispatch(fetchDeleteMail(dispatch, apiService, id))
  }
}

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MailsListContainer);