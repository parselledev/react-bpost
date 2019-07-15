import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';

import {selectMailsFilterSocial} from 'Redux/mails/mails.selectors';
import {mailsFilterSocial} from 'Redux/mails/mails.actions';

import Dropdown from 'Components/UI/Dropdown/Dropdown';
import Button from 'Components/UI/Button/Button';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

const MailsFilterSocial = ({social, onFilterChange}) => {

  const socialList = {
    'ALL': 'Все',
    'vk': 'VK',
    'tg': 'Telegram'
  };

  const filterItems = (
    Object.keys(socialList).map(key => {
      const disabled = key == social;
      return(
        <Dropdown.Item
          key={key}
          text={socialList[key]}
          disabled={disabled}
          onClick={()=>onFilterChange(key)}
        />
      );
    })
  );

  return(
    <div className="mails__filter">
      <Dropdown content={filterItems}>
        <Button
          className="mails__filterBtn"
          classMod="medium--icon--grey"
          icon={faFilter}
          title="Фильтр"/>
      </Dropdown>
    </div>
  );

}

class MailsFilterSocialContainer extends Component {

  static propTypes = {
    social: PropTypes.string,
    mailsFilterSocial: PropTypes.func
  };

  onFilterChange = query => {
    this.props.mailsFilterSocial(query)
  }

  render() {
    return(
      <MailsFilterSocial
        social={this.props.social}
        onFilterChange={this.onFilterChange}
      />
    );
  }

}

const mapStateToProps = createStructuredSelector({
  social: selectMailsFilterSocial
});

const mapDispatchToProps = (dispatch) => ({
  mailsFilterSocial: query => dispatch(mailsFilterSocial(query))
});

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MailsFilterSocialContainer)