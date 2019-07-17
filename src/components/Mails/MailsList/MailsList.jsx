import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';

import {selectAuthUsername} from 'Redux/auth/auth.selectors';
import {
  selectMailsData,
  selectMailsFetching,
  selectMailsFilterSocial,
  selectMailsFilterCategory,
  selectMailsSearch
} from 'Redux/mails/mails.selectors';
import {mailsStart, mailsCancel, mailsComplete, mailsDelete} from 'Redux/mails/mails.actions';

import './MailsList.sass';
import MailsListItem from 'Components/Mails/MailsListItem/MailsListItem';
import Spin from 'Components/UI/Spin/Spin';
import Empty from 'Components/UI/Empty/Empty';

const MailsList = ({
  username,
  mails,
  fetching,
  filterSocial,
  filterCategory,
  search,
  mailsStart,
  mailsCancel,
  mailsComplete,
  mailsDelete
}) => {

  if(mails == null || (!fetching && Object.keys(mails).length == 0)) return <Empty text="Новые письма появятся автоматически"/>
  if(fetching && Object.keys(mails).length == 0) return <Spin />

  const processMails = (mails, filterSocial, filterCategory, search) => {
    let result = {};
    let isCategory = true;

    for(let key in mails) {
      const mail = mails[key];
      
      switch(filterCategory) {
        case 'ACTIVE':
          isCategory = !mail.completed && (username == mail.postman || !mail.postman);
          break;
        case 'MINE':
          isCategory = (username == mail.postman && !mail.completed) || username == mail.owner;
          break;
        case 'COMPLETED':
          isCategory = mail.completed == true;
          break;
      }

      if(
        mail &&
        (mail.text.toLowerCase().includes(search.toLowerCase())) &&
        (mail.social === filterSocial || filterSocial === 'ALL') &&
        isCategory) {
        result[key] = mail;
      }
    }
    return result;
  }

  const visibleMails = processMails(mails, filterSocial, filterCategory, search);

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
                username={username}
                mail={visibleMails[key]}
                mailsStart={mailsStart}
                mailsCancel={mailsCancel}
                mailsComplete={mailsComplete}
                mailsDelete={mailsDelete}
              />
            );
          })
        }
      </ul>
    :
    <Empty text="Попробуйте изменить категорию или фильтр"/>
  );
}

MailsList.propTypes = {
  username: PropTypes.string,
  mails: PropTypes.object,
  filterSocial: PropTypes.string,
  filterCategory: PropTypes.string,
  search: PropTypes.string,
  mailsStart: PropTypes.func,
  mailsCancel: PropTypes.func,
  mailsComplete: PropTypes.func,
  mailsDelete: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  username: selectAuthUsername,
  mails: selectMailsData,
  fetching: selectMailsFetching,
  filterSocial: selectMailsFilterSocial,
  filterCategory: selectMailsFilterCategory,
  search: selectMailsSearch
});

const mapDispatchToProps = (dispatch, {apiService}) => ({
  mailsStart: (id, username, startTimestamp) => dispatch(mailsStart(dispatch, apiService, id, username, startTimestamp)),
  mailsCancel: id => dispatch(mailsCancel(dispatch, apiService, id)),
  mailsComplete: (id, screenshot, endTimestamp) => dispatch(mailsComplete(dispatch, apiService, id, screenshot, endTimestamp)),
  mailsDelete: id => dispatch(mailsDelete(dispatch, apiService, id))
});

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MailsList);