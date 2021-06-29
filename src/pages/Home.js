import { useState, useEffect, useContext} from 'react'
import musicService from 'services/music'
import MusicContext from '../store/music-context';
import CardList from 'components/CardList'
import Player from 'components/Player'

const HomePage = () => {
	const [newReleases, setNewReleases] = useState([])
	const [featuredPlaylists, setFeaturedPlaylists] = useState([])
	const [categories, setCategories] = useState([]);

	const musicCtxt = useContext(MusicContext);
	const [isPlaying] = useState([]);
	const track = musicCtxt.selectedTrack

	const generalMap = (item) => {
		if (item.type === "playlist") {
			return {
				id: item.id,
				name: item.name,
				image: item.images?.[0]?.url,
				artists: item.artists?.map(artist => artist.name).join(', '),
				url: item.external_urls
			}
		} else {
			return {
				id: item.id,
				name: item.name,
				image: item.images?.[0]?.url,
				artists: item.artists?.map(artist => artist.name).join(', ')
			}
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
				<div className="app__page-section">
					<h1 className="app__page-title">featuredTunes</h1>
					<section role="contentinfo"><CardList section="Released this week" actions={true} data={newReleases}/></section>
					<section role="contentinfo"><CardList section="Featured Playlists" data={featuredPlaylists}/></section>
					<section role="contentinfo"><CardList section="Browse" data={categories}/></section>
				</div>
				{isPlaying && <Player data={track}/>}
			</>

	);
}

export default HomePage;
