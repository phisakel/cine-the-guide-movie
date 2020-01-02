import { StyleSheet,Dimensions } from 'react-native';
import { blue } from '../../../../utils/colors';

export const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  containerCast: {
    marginLeft: 0,
    marginRight: 9,
    alignItems: 'flex-start',
    width: width/3-20
  },
  titleCast: {
    marginTop: 10,
    color: blue,
    textAlign: 'center'
  },
  titleCharacter: {
    fontWeight: 'bold'
  },
  castPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 13
  },
  productionCompaniesPhoto: {
    width: '100%',
    height: 60,
    borderRadius: 4,
    marginTop: 13
  }
});

export default styles;
