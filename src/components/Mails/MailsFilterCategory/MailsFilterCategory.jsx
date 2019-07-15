import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import {createStructuredSelector} from 'reselect';

import {selectMailsFilterCategory} from 'Redux/mails/mails.selectors';
import {mailsFilterCategory} from 'Redux/mails/mails.actions';

import './MailsFilterCategory.sass';

class MailsFilterCategory extends Component {

  static propTypes = {
    category: PropTypes.string,
    mailsFilterCategory: PropTypes.func
  };

  state = {
    activeCategory: this.props.category
  }

  handleCategoryChange = (query) => {
    this.setState({activeCategory: query});
    this.props.mailsFilterCategory(query);
  }

  render() {

    const {category} = this.props;

    const categories = {
      'ACTIVE': 'Активные',
      'MINE': 'Мои',
      'COMPLETED': 'Готовые'
    };

    return(
      <nav className="mails__category">
        {
          Object.keys(categories).map(key => {
            const active = key == category;
            return(
              <button
                key={key}
                className={`category__link ${active ? 'active' : ''}`}
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

const mapStateToProps = createStructuredSelector({
  category: selectMailsFilterCategory
});

const mapDispatchToProps = (dispatch) => ({
  mailsFilterCategory: query => dispatch(mailsFilterCategory(query))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MailsFilterCategory);