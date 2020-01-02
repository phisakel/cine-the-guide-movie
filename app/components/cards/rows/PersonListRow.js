import React from 'react';
import { FlatList, View } from 'react-native';

const PersonListRow = ({data,type,keyItem,ListEmptyComponent,onTeamDetail,renderItem}) => (
  <View>
    <FlatList data={data.slice(0,Math.min(data.length,3))} horizontal showsHorizontalScrollIndicator={false} removeClippedSubviews keyExtractor={item =>
        keyItem === 'creditId' ? item.credit_id.toString() : item.id.toString()
      }
      ListEmptyComponent={ListEmptyComponent} 
      renderItem={({ item }) => renderItem(item, type, onTeamDetail)}
    />
    {data.length>3 && <FlatList data={data.slice(3,Math.min(data.length,6))} horizontal showsHorizontalScrollIndicator={false} removeClippedSubviews keyExtractor={item =>
      keyItem === 'creditId' ? item.credit_id.toString() : item.id.toString()
    }
    ListEmptyComponent={ListEmptyComponent} 
    renderItem={({ item }) => renderItem(item, type, onTeamDetail)}
    />}
  </View>
);

export default PersonListRow;
