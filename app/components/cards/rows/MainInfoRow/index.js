import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import i18n from 'i18n-js';
import SectionRow from '../SectionRow';
import styles from './styles';

const MainInfoRow = ({ data = {} }) => (
  <View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      <SectionRow key={111} title={i18n.t('Duration')} hasSubTitle>
        <Text style={styles.description}>{data.Duration}</Text>
      </SectionRow>
      <SectionRow key={112} title={i18n.t('Genre')} hasSubTitle>
        <Text style={styles.description}>{data.Genre}</Text>
      </SectionRow>
    </ScrollView>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      <SectionRow key={113} title={i18n.t('Language')} hasSubTitle>
        <Text style={styles.description}>{data.Language}</Text>
      </SectionRow>
      <SectionRow key={114} title={i18n.t('Release')} hasSubTitle>
        <Text style={styles.description}>{data.Release}</Text>
      </SectionRow>
      <SectionRow key={115} title={i18n.t('Adult')} hasSubTitle>
        <Text style={styles.description}>{i18n.t(data.Adult)}</Text>
      </SectionRow>
    </ScrollView>
  </View>
);

export default MainInfoRow;
