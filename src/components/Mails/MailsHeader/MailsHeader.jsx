import React from 'react';
import './MailsHeader.sass';
import MailsAdd from '../MailsAdd/MailsAdd';
import MailsFilter from '../MailsFitler/MailsFitler';
import MailsSearch from '../MailsSearch/MailsSearch';
import UserInfo from '../../UserInfo/UserInfo';
import MailsCategory from '../MailsCategory/Mailscategory';

const MailsHeader = () => {

  return(
    <div className="mails__header">
      <div className="header__top">
        <div className="header__topLeft">
          <MailsAdd />
          <MailsFilter />
        </div>
        <div className="header__topRight">
          <MailsSearch />
          <UserInfo />
        </div>
      </div>
      
      <MailsCategory />
    </div>
  );

}

export default MailsHeader