import { useState, useEffect, useContext} from 'react'
import musicService from 'services/music'
import MusicContext from '../store/music-context';
import CardList from 'components/CardList'
import Player from 'components/Player'

const HomePage = (props) => {
	const [newReleases, setNewReleases] = useState([])
	const [featuredPlaylists, setFeaturedPlaylists] = useState([])
	const [categories, setCategories] = useState([]);

	const musicCtxt = useContext(MusicContext);
	const [isPlaying] = useState([]);
	const track = musicCtxt.selectedTrack

	const generalMap = (item) => {
		return {
			id: item.id,
			name: item.name,
			image: item.images?.[0]?.url,
			artists: item.artists?.map(artist => artist.name).join(', '),
			url: item.type === "playlist" ? item.external_urls : null
		}
	} 

	const categoriesMap = (category) => {
		return {
			id: category.id,
			name: category.name,
			image: category.icons?.[0]?.url,
			href: `https://open.spotify.com/genre/${category.id}`
		}
	}

	useEffect(() => {
		musicService.getCategories().then(({categories: { items } }) => setCategories(items.map(categoriesMap)))
		musicService.getNewReleases().then(({albums: { items }}) => setNewReleases(items.map(generalMap)))
		musicService.getFeaturedPlayists().then(({playlists: { items }}) => setFeaturedPlaylists(items.map(generalMap)))
	}, [])

	return (
			<>
				<section className="app__page-section">
					<h1 className="app__page-title">featuredTunes</h1>
					<CardList section="Released this week" actions={true} data={newReleases}/>
					<CardList section="Featured Playlists" data={featuredPlaylists}/>
					<CardList section="Browse" data={categories}/>
				</section>
				{isPlaying && <Player data={track}/>}
			</>

	);
}

export default HomePage;
