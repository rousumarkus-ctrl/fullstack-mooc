import { View, StyleSheet, Pressable, ScrollView } from 'react-native';

import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal>
        {
          <>
            <AppBarTab to={'/'} text={'Repositories'}></AppBarTab>
            <AppBarTab to={'/login'} text={'Sign in'}></AppBarTab>
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
