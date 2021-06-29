import { Link } from 'react-router-dom';
import Icon from '../Icon.js';

const Sidebar = () => {
	return (
		<nav className="sidebar" role="navigation">
			<ul className="sidebar__list">
				<li className="sidebar__list-item">
					<Link to="/" className="sidebar__list-item--link">
						<Icon ariaLabel="Head phones icon" icon="FaHeadphonesAlt" className="sidebar__list-item--icon" />
						<span className="sidebar__list-item--text">Discover</span>
					</Link>
				</li>
				<li className="sidebar__list-item">
					<Link to="/favorites" className="sidebar__list-item--link">
						<Icon ariaLabel="Favorites icon" icon="FaHeart" className="sidebar__list-item--icon" />
						<span className="sidebar__list-item--text">Favorites</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Sidebar;
