import { useContext } from 'react';
import MusicContext from '../store/music-context';
import Button from './Button.js';

const Card = (props) => {
	const musicCtxt = useContext(MusicContext);
	const isFavorite = musicCtxt.isFavorite(props.id);

	const toggleFavoriteStateHandler = () => {
		if (isFavorite) {
			musicCtxt.removeFavorite(props.id);
		} else {
			musicCtxt.addFavorite({
				id: props.id,
				name: props.title,
				artists: props.subtitle,
				image: props.image,
				actions:props.actions
			});
		}
	}

	const play = () => {
		musicCtxt.playTrack(props.id);
	}

	return (
		<div className="card" key={props.id}>
			<h3 className="card__title">{props.title.toLowerCase()}</h3>
			<p className="card__subtitle">{props.subtitle}</p>
			<img className="card__image" src={props.image} alt={`${props.title} cover`} />
			{ props.actions && <div className="card__actions">
				<Button
					ariaLabel="Play button"
					icon="FaPlay"
					className="btn__play"
					onClick={play}
				/>
				<Button
					ariaLabel="Favorites button"
					icon="FaHeart"
					className={isFavorite ? 'btn__favorite--is-favorite' : 'btn__favorite'}
					onClick={toggleFavoriteStateHandler}
				/>
			</div> }
		</div>
	);
}

export default Card;

