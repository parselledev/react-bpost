import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from '../../../utils/compose';
import {searchMails} from '../../../actions/mailsActions';
import Input from '../../UI/Input/Input';

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
    searchMails: PropTypes.func
  }

  onSearchChange = e => {
    this.props.searchMails(e.target.value);
  }

  render() {

    const {search} = this.props;

    return(
      <MailsSearch
        search={search}
        onSearchChange={this.onSearchChange}/>
    );
  }
}

const mapStateToProps = ({mails: {search}}) => {
  return {search};
}

const mapDispatchToProps = dispatch => {
  return {
    searchMails: query => dispatch(searchMails(query))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MailsSearchContainer)