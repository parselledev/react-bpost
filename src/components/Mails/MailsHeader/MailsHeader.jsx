import React from 'react';
import './MailsHeader.sass';
import MailsAdd from 'Components/Mails/MailsAdd/MailsAdd';
import MailsFilterSocial from 'Components/Mails/MailsFitlerSocial/MailsFitlerSocial';
import MailsFilterCategory from 'Components/Mails/MailsFilterCategory/MailsFilterCategory';
import MailsSearch from 'Components/Mails/MailsSearch/MailsSearch';
import UserInfo from 'Components/UserInfo/UserInfo';

const MailsHeader = () => {

  return(
    <div className="mails__header">
      <MailsFilterCategory />
      <div className="header__tools">
        <MailsSearch />
        <MailsFilterSocial />
        <MailsAdd />
      </div>
    </div>
  );

}

export default MailsHeader