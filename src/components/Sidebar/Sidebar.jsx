import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.sass';
import logo from 'Assets/img/logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faBars,
	faEnvelopeOpen,
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

		const navLinks = [
			{
				to: "/",
				icon: faEnvelopeOpen,
				title: "Список писем",
				exact: true
			},
			{
				to: "/rules",
				icon: faClipboardList,
				title: "Правила",
				exact: true
			},
			{
				to: "/contacts",
				icon: faAddressBook,
				title: "Контакты",
				exact: true
			}
		];

		console.log(navLinks);

		return(
			<div className="app__sidebar">
				<div className="sidebar__header">
					<img src={logo} alt="Логотип Добро почта" className="sidebar__logo"/>
				</div>

				<FontAwesomeIcon
					icon={faBars}
					className="sidebar__navBtn"
					onClick={this.handleNavToggle}/>
	
				<nav className={`sidebar__nav ${this.state.visible ? 'visible' : ''}`}>
					{
						navLinks.map((link, index)=> {
							return(
								<NavLink
									key={index}
									to={link.to}
									className="nav__link"
									activeClassName="is-active"
									exact={link.exact}
									onClick={this.handleNavToggle}>
									<FontAwesomeIcon icon={link.icon} className="nav__icon"/>
									{link.title}
								</NavLink>
							);
						})
					}
				</nav>
			</div>
		);
	}
}

export default Sidebar;