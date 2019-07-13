import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from '../../../utils/compose';
import {categoryMails} from '../../../actions/mailsActions';
import './MailsCategory.sass';

class MailsCategory extends Component {

  static propTypes = {
    category: PropTypes.string,
    categoryMails: PropTypes.func
  };

  state = {
    activeCategory: this.props.category
  }

  handleCategoryChange = (query) => {
    this.setState({activeCategory: query});
    this.props.categoryMails(query);
  }

  render() {

    const {category} = this.props;

    const categories = {
      'ACTIVE': 'Активные',
      'MINE': 'Мои',
      'COMPLETED': 'Готовые'
    };

    return(
      <nav className="header__nav">
        {
          Object.keys(categories).map(key => {
            const active = key == category;
            return(
              <button
                key={key}
                className={`nav__link ${active ? 'active' : ''}`}
                onClick={() => this.handleCategoryChange(key)}>
                {categories[key]}
              </button>
            );
          })
        }
      </nav>
    );
  }
}

const mapStateToProps = ({mails:{category}}) => {
  return {category}
}

const mapDispatchToProps = (dispatch) => {
  return {
    categoryMails: query => dispatch(categoryMails(query))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MailsCategory);