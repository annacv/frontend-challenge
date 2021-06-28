import axios from 'axios';
import { clientId, clientSecret } from '../helpers/spotifyAuth';

class MusicService {
  constructor() {
    const token = localStorage.getItem('token');
    if (!token) {
      axios('https://accounts.spotify.com/api/token', {
      headers: {
        Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    }).then((({data: { access_token }}) => {
      localStorage.setItem('token', access_token)
      this.service = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      })
    }))
    } else {
      this.service = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    }
  }

  async getNewReleases() {
    const { data } = await this.service.get('browse/new-releases');
    localStorage.removeItem('token');
    return data;
  }

  async getFeaturedPlayists() {
    const { data } = await this.service.get('browse/featured-playlists');
    localStorage.removeItem('token');
    return data;
  }

  async getCategories() {
    const { data } = await this.service.get('browse/categories');
    localStorage.removeItem('token');
    return data;
  }

  async getTrack(id) {
    const { data } = await this.service.get(`albums/${id}/tracks`);
    const trackId = data.items[0].id 
    const getTrackData = await this.service.get(`tracks/${trackId}`);
    localStorage.removeItem('token');
    return getTrackData;
  }
}

const musicService = new MusicService();

export default musicService;