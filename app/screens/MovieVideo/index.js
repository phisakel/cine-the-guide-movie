import React from 'react';
import i18n from 'i18n-js';
import { WebView } from 'react-native-webview';

import Screen from '../../components/common/Screen';
import Spinner from '../../components/common/Spinner';

import styles from './styles';

const Loading = () => <Spinner style={styles.container} />;

const MovieVideo = ({ navigation }) => {
  const { key } = navigation.state.params;

  return (
    <Screen>
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${key}?start=0` }}
        startInLoadingState
        renderLoading={Loading}
      />
    </Screen>
  );
};

MovieVideo.navigationOptions = () => ({
  title: i18n('Trailer')
});

export default MovieVideo;
