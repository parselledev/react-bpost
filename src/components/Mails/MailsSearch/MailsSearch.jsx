import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import {createStructuredSelector} from 'reselect';

import {selectMailsSearch} from 'Redux/mails/mails.selectors';
import {mailsSearch} from 'Redux/mails/mails.actions';

import Input from 'Components/UI/Input/Input';
import './MailsSearch.sass';

const MailsSearch = ({search, onSearchChange}) => {
  return(
    <Input
      className="mails__search"
      type="text"
      value={search}
      placeholder="Поиск..."
      onChange={onSearchChange}
      value={search}/>
  );
}

class MailsSearchContainer extends Component {

  static propTypes = {
    search: PropTypes.string,
    mailsSearch: PropTypes.func
  }

  onSearchChange = e => {
    this.props.mailsSearch(e.target.value);
  }

  render() {
    return(
      <MailsSearch
        search={this.props.search}
        onSearchChange={this.onSearchChange}/>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  search: selectMailsSearch
});

const mapDispatchToProps = dispatch => ({
  mailsSearch: query => dispatch(mailsSearch(query))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MailsSearchContainer)