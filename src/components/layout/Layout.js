import Background from '../Background.js';
import Icon from '../Icon.js';
import Sidebar from './Sidebar.js';

const Layout = (props) => {
	return (
		<div className="app__container">
			<header className="header">
				<div className="header__brand">
					<div className="header__brand--icon-container">
						<Icon ariaLabel="Brand Kiwi bird icon" icon="FaKiwiBird" className="header__brand--icon" />
					</div>
					<p className="header__brand--name">uMusic</p>
				</div>
				<Sidebar />
			</header>
			<main className="app__main" role="main">
				<Background />
				{props.children}
			</main>
		</div>
	);
}

export default Layout;
