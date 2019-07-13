import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.sass';
import logo from '../../assets/img/logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEnvelopeOpen,
  faNewspaper,
  faClipboardList,
  faAddressBook
} from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component {

  state = {
    visible: false
  };

  handleNavToggle = () => {
    this.setState({visible: !this.state.visible});
  }

  render() {

    const {visible} = this.state;

    return(
      <div className="app__sidebar">
        <div className="sidebar__header">
          <img src={logo} alt="Логотип Добро почта" className="sidebar__logo"/>
        </div>
  
        <button
          className="sidebar__navBtn"
          onClick={this.handleNavToggle}
        ></button>
  
        <nav className={`sidebar__nav ${visible ? 'visible' : ''}`}>
          <NavLink to="/" className="nav__link" activeClassName="is-active" exact>
            <FontAwesomeIcon icon={faEnvelopeOpen} className="nav__icon"/>
            Список писем
          </NavLink>
          {/* <div className="nav__line"></div> */}
          {/* <NavLink to="/news" className="nav__link" activeClassName="is-active" exact>
            <FontAwesomeIcon icon={faNewspaper} className="nav__icon"/>
            Новости
          </NavLink> */}
          <NavLink to="/rules" className="nav__link" activeClassName="is-active" exact>
            <FontAwesomeIcon icon={faClipboardList} className="nav__icon"/>
            Правила
          </NavLink>
          <NavLink to="/contacts" className="nav__link" activeClassName="is-active" exact>
            <FontAwesomeIcon icon={faAddressBook} className="nav__icon"/>
            Контакты
          </NavLink>
          {/* <NavLink to="/donate" className="nav__link" activeClassName="is-active" exact>Пожертования</NavLink> */}
        </nav>
      </div>
    );
  }
}

export default Sidebar;