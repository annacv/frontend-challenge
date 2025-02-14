import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { MusicContextProvider } from 'store/music-context';

import Layout from './components/layout/Layout.js';
import FavoritesPage from './pages/Favorites';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';

import './assets/scss/App.scss';

const App = () => {
	return (
		<BrowserRouter>
			<MusicContextProvider>
				<Layout>
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route exact path="/favorites">
							<FavoritesPage />
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</Layout>
			</MusicContextProvider>
		</BrowserRouter>
	);
}

export default App;
