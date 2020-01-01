import i18n from 'i18n-js';
import MovieList from '../screens/MovieList';
import Configuration from '../screens/Configuration';
import MovieDetails from '../screens/MovieDetails';
import Search from '../screens/Search';
import MovieVideo from '../screens/MovieVideo';

import { ROUTES } from './routes';

export const MoviesScreen = {
  [ROUTES.MOVIE_LIST]: {
    screen: MovieList,
    title: i18n.t('Home'),
    navigationOptions: {
      title: i18n.t('Home')
    }
  },
  [ROUTES.MOVIE_DETAILS]: {
    screen: MovieDetails
  },
  [ROUTES.MOVIE_VIDEO]: {
    screen: MovieVideo
  }
};

export const SearchScreen = {
  [ROUTES.SEARCH]: {
    screen: Search,
    title: i18n.t('Search'),
    navigationOptions: {
      title: i18n.t('Search')
    }
  },
  [ROUTES.SEARCH_RESULTS]: {
    screen: MovieList
  },
  [ROUTES.MOVIE_DETAILS]: {
    screen: MovieDetails
  },
  [ROUTES.MOVIE_VIDEO]: {
    screen: MovieVideo
  }
};

export const ConfigurationScreen = {
  [ROUTES.CONFIGURATION]: {
    screen: Configuration,
    title: i18n.t('More'),
    navigationOptions: {
      title: i18n.t('More')
    }
  }
};
