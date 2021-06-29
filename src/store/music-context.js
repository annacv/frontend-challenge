import { createContext, useState, useEffect } from 'react';
import musicService from 'services/music'
import Dialog from '../components/Dialog.js';

const MusicContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteTune) => {},
  removeFavorite: (tuneId) => {},
  isFavorite: (tuneId) => {},
  selectedTrack: {},
  playTrack: (trackId) => {}
});

export const MusicContextProvider = (props) => {
  const [favoritesTunes, setFavoritesTunes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [track, setTrack] = useState([])
  const [isPlaying, setIsPlaying] = useState(false);

  const tracksMap = (track) => {
		return {
			id: track.id,
			name: track.name,
			image: track.album.images?.[2]?.url,
			uri: track.uri
		}
	}

  const addFavoriteHandler = (favoriteTune) => {
    setFavoritesTunes((prevFavoritesTunes) => {
      return prevFavoritesTunes.concat(favoriteTune);
    });
  }

  const removeFavoriteHandler = (tuneId) => {
    setFavoritesTunes((prevFavoritesTunes) => {
      return prevFavoritesTunes.filter((tune) => tune.id !== tuneId);
    });
  }

  const isFavoriteHandler = (tuneId) => {
    return favoritesTunes.some((tune) => tune.id === tuneId);
  }

  const playHandler = (trackId) => {
    if (isPlaying) {
      setIsPlaying(false)
    }
    musicService.getTrack(trackId).then((response) => {
			const trackData = response.data
			setTrack([trackData].map(tracksMap))
			setIsPlaying(true)
		})
  }

  const context = {
    favorites: favoritesTunes,
    totalFavorites: favoritesTunes.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    isFavorite: isFavoriteHandler,
    selectedTrack: track,
    playTrack: playHandler
  };

  useEffect(() => {
    const loading = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(loading);
  },[])

  if (isLoading) {
    return (
      <section className="app__page-section">
        <Dialog
          className="loading"
          title="Loading ..."
          subtitle="please wait !"
        />
      </section>
		);
  }

  return <MusicContext.Provider value={context}>{props.children}</MusicContext.Provider>;
}

export default MusicContext;