import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Asset } from 'expo-asset';
import { Feather } from '@expo/vector-icons';
import { Assets as StackAssets } from 'react-navigation-stack';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import Screen from '../../components/common/Screen';
import Spinner from '../../components/common/Spinner';
import NotificationCard from '../../components/cards/NotificationCard';
import FilterModal from '../../components/modals/FilterModal';
import MovieListRow from '../../components/cards/rows/MovieListRow';
import MovieRow from '../../components/cards/rows/MovieRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';
import request from '../../services/api';
import { getItem } from '../../utils/asyncStorage';
import { getTodayDate } from '../../utils/dates';
import { darkBlue } from '../../utils/colors';
import styles from './styles';

export const en = {
  Home: 'Home',Search: 'Search',MostPopular: 'Most popular',LessPopular: 'Less popular',
  Date: 'Date',Releases: 'Releases',Old: 'Old',Filter:'Filter',Confirm:'Confirm',
  Synopsis: 'Synopsis',Readmore: 'Read more',Readless: 'Read less',
  Maincast: 'Main cast',Maintechnicalteam: 'Main technical team',Producer: 'Producer',
  Trailer: 'Trailer',More: 'More',Attention: 'Attention',MovieDetails:'Movie details'
};
export const el = {
  Home: 'Ταινίες',Search: 'Αναζήτηση',MostPopular: 'Πιο δημοφιλείς',LessPopular: 'Λιγότερο δημοφιλείς',
  HigherRevenue:'Περισσ. εισπράξεις',LowestRevenue:'Λιγότερες εισπράξεις',
  Date: 'Ημερομηνία',Releases: 'Καινούργιες',Old: 'Παλιές',Filter:'Φίλτρα',Confirm:'Εντάξει',
  Synopsis: 'Περίληψη',Readmore: 'Περισσότερα',Readless: 'Λιγότερα',
  Maincast: 'Ηθοποιοί',Maintechnicalteam: 'Τεχνική ομάδα',Producer: 'Παραγωγός',
  Trailer: 'Τρέϊλερ',More: 'Περισσότερα',Attention: 'Σφάλμα',MovieDetails:'Λεπτομέρειες ταινίας'
};

i18n.fallbacks = false;
i18n.translations = { el, en  };
i18n.locale = 'el'; // Localization.locale;

const MovieList = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasAdultContent, setHasAdultContent] = useState(false);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    filterType: 'popularity.desc',
    filterName: i18n.t('MostPopular')
  });
  const [view, setView] = useState({ numColumns: 1, keyGrid: 1 });
  const {
    params: { id = null, name = null, typeRequest = 'discover' } = {}
  } = navigation.state;

  useEffect(() => {
    (async () => {
      try {
        Asset.loadAsync(StackAssets);
        navigation.setParams({ handleFilter });

        const adultContentStorage = await getItem(
          '@ConfigKey',
          'hasAdultContent'
        );

        setHasAdultContent(adultContentStorage);
        requestMoviesList();
      } catch (error) {
        requestMoviesList();
      }
    })();
  }, []);

  requestMoviesList = async () => {
    try {
      setIsLoading(true);

      const { filterType } = filter;
      const dateRelease = getTodayDate();

      const data = await request(`${typeRequest}/movie`, {
        page,
        'release_date.lte': dateRelease,
        sort_by: filterType,
        with_release_type: '1|2|3|4|5|6|7',
        include_adult: hasAdultContent,
        ...getQueryRequest()
      });

      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefresh(false);
      setIsError(false);
      setTotalPages(data.total_pages);
      setResults(isRefresh ? data.results : [...results, ...data.results]);
    } catch (err) {
      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefresh(false);
      setIsError(true);
    }
  };

  getQueryRequest = () => {
    if (typeRequest === 'discover') {
      return id ? { with_genres: `${id}` } : null;
    }

    if (typeRequest === 'search') {
      return { query: `${name.trim()}` };
    }

    return null;
  };

  renderItem = (item, type, isSearch, numColumns, navigate) => (
    <MovieRow
      item={item}
      type={type}
      isSearch={isSearch}
      numColumns={numColumns}
      navigate={navigate}
    />
  );

  renderFooter = () => {
    if (isLoadingMore) return <Spinner size="small" />;

    if (totalPages !== page && results.length > 0) {
      return (
        <View style={styles.loadingMore}>
          <TouchableOpacity
            style={styles.loadingButton}
            onPress={handleLoadMore}
          >
            <Text style={styles.loadingText}>Load more</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (results.length > 0) return <View style={styles.loadingMore} />;

    return null;
  };

  handleRefresh = async () => {
    await setIsRefresh(true);
    await setPage(1);
    await requestMoviesList();
  };

  handleLoadMore = async () => {
    await setIsLoadingMore(true);
    await setPage(page + 1);
    await requestMoviesList();
  };

  handleGrid = () => {
    const { numColumns, keyGrid } = view;

    setView({ numColumns: numColumns === 1 ? 2 : 1, keyGrid: keyGrid + 1 });
  };

  handleFilter = () => {
    setIsVisible(!isVisible);
  };

  handleSwitchMovie = async (type, name, visible) => {
    const { filterType } = filter;

    if (type !== filterType) {
      await setPage(1);
      await setResults([]);
      await setFilter({ filterType: type, filterName: name });
      await setIsVisible(visible);
      await requestMoviesList();
    } else {
      setIsVisible(visible);
    }
  };

  const { navigate } = navigation;
  const { filterName } = filter;
  const { numColumns, keyGrid } = view;

  return (
    <Screen>
      <View style={styles.container}>
        {isLoading && !isRefresh && !isLoadingMore ? (
          <Spinner />
        ) : isError ? (
          <NotificationCard icon="alert-octagon" onPress={requestMoviesList} />
        ) : results.length === 0 ? (
          <NotificationCard
            icon="thumbs-down"
            textError="No results available."
          />
        ) : (
          <View style={styles.containerList}>
            {results.length > 0 && (
              <View style={styles.containerMainText}>
                <Text style={styles.textMain} numberOfLines={1}>
                  {typeRequest === 'discover' ? filterName : name}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.buttonGrid,
                    numColumns === 2 && styles.buttonGridActive
                  ]}
                  onPress={handleGrid}
                >
                  <Feather name="grid" size={22} color={darkBlue} />
                </TouchableOpacity>
              </View>
            )}
            <MovieListRow
              data={results}
              type="normal"
              isSearch={false}
              keyGrid={keyGrid}
              numColumns={numColumns}
              refreshing={isRefresh}
              onRefresh={handleRefresh}
              ListFooterComponent={renderFooter}
              navigate={navigate}
              renderItem={renderItem}
            />
          </View>
        )}
        <FilterModal
          isVisible={isVisible}
          filter={filter}
          onVisible={handleFilter}
          onFilter={handleSwitchMovie}
          style={styles.bottomModal}
        />
      </View>
    </Screen>
  );
};

MovieList.navigationOptions = ({ navigation }) => {
  const { handleFilter, name, routeName, typeRequest = 'discover' } =
    navigation.state.params || {};

  return {
    title: name || routeName,
    headerRight: typeRequest === 'discover' && (
      <TouchableOpacity style={styles.buttonFilter} onPress={handleFilter}>
        <Feather name="filter" size={23} color={darkBlue} />
      </TouchableOpacity>
    )
  };
};

export default MovieList;
