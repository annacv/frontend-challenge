import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MusicContext from '../store/music-context';
import CardList from '../components/CardList';
import Dialog from '../components/Dialog.js';
import Player from 'components/Player'

const FavoritesPage = () => {
	const history = useHistory();
	const musicCtxt = useContext(MusicContext);
	const [isPlaying] = useState([]);
	const track = musicCtxt.selectedTrack
	let content;

	const browseHandler = () => {
		history.push('/');
	}

	if (musicCtxt.totalFavorites === 0) {
		content = (
			<section role="dialog">
				<Dialog
					className="info"
					title="You got no favorites yet"
					subtitle="Start adding some !"
					label="Add favorites"
					onClick={browseHandler}
				/>
			</section>
		);
	} else {
		content = <CardList section="Your tunes" actions={true} data={musicCtxt.favorites} show={4} />;
	}

	return (
		<>
			<div className="app__page-section">
				<h1 className="app__page-title">favoriteTunes</h1>
				<section role="contentinfo">{content}</section>
			</div>
			{isPlaying && musicCtxt.totalFavorites && <Player data={track}/>}
		</>
	);
}

export default FavoritesPage;
