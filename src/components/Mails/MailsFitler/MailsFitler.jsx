import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from '../../../utils/compose';
import withApiService from '../../hoc/withApiService';
import {filterMails} from '../../../actions/mailsActions';
import Dropdown from '../../UI/Dropdown/Dropdown';
import Button from '../../UI/Button/Button';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

const MailsFilter = ({filter, onFilterChange}) => {

  const social = {
    'ALL': 'Все',
    'vk': 'VK',
    'tg': 'Telegram'
  };

  const filterItems = (
    Object.keys(social).map(key => {
      const disabled = key == filter;
      return(
        <Dropdown.Item
          key={key}
          text={social[key]}
          disabled={disabled}
          onClick={()=>onFilterChange(key)}
        />
      );
    })
  );

  return(
    <Dropdown content={filterItems}>
      <Button
        className="mails__filterBtn"
        classMod="medium--icon--grey"
        icon={faFilter}
        title="Фильтр"/>
    </Dropdown>
  );

}

class MailsFilterContainer extends Component {

  static propTypes = {
    filter: PropTypes.string,
    filterMails: PropTypes.func
  };

  onFilterChange = query => {
    this.props.filterMails(query)
  }

  render() {

    const {filter} = this.props;

    return(
      <MailsFilter
        filter={filter}
        onFilterChange={this.onFilterChange}
      />
    );
  }

}

const mapStateToProps = ({mails: {filter}}) => {
  return {filter};
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterMails: query => dispatch(filterMails(query))
  };
}

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MailsFilterContainer)