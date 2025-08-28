/* Backend api */
import axios from 'axios';
import {
  API_ENDPOINTS,
  ARTISTS_PER_PAGE,
  BASE_URL,
  FEEDBACKS_PER_QUEUE,
} from './constants';

axios.defaults.baseURL = BASE_URL;

export const getArtists = async page => {
  const { data } = await axios.get(
    `${API_ENDPOINTS.ARTISTS}?limit=${ARTISTS_PER_PAGE}&page=${page}`
  );
  return data;
};

export const getArtistById = async id => {
  const { data } = await axios.get(`${API_ENDPOINTS.ARTIST_BY_Id}${id}`);
  return data;
};

export const getArtistAlbumsById = async id => {
  const { data } = await axios.get(
    `${API_ENDPOINTS.ARTIST_BY_Id}${id}${API_ENDPOINTS.ARTIST_ALBUMS_BY_ID}`
  );
  return data;
};

export const getFeedbacks = async (page = 1) => {
  const { data } = await axios.get(
    `${API_ENDPOINTS.FEEDBACKS}?limit=${FEEDBACKS_PER_QUEUE}&page=${page}`
  );
  return data;
};

export const getGenres = async () => {
  const { data } = await axios.get(`${API_ENDPOINTS.GENRES}`);
  return data;
};

export const searchArtist = async (query, page = 1, sorted = 0, genre = '') => {
  const { data } = await axios.get(
    `${
      API_ENDPOINTS.ARTISTS
    }?limit=${ARTISTS_PER_PAGE}&page=${page}&name=${query}${
      sorted === 2 ? `&sortName=desc` : sorted === 1 ? `&sortName=asc` : ''
    }${genre ? `&genre=${genre}` : ''}`
  );
  return data;
};

export const addNewFeedback = async (name, rating, descr /* , closeFunc */) => {
  await axios.post(`${API_ENDPOINTS.FEEDBACKS}`, {
    name,
    rating,
    descr,
  });
};
