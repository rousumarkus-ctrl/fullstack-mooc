import { View, StyleSheet, Pressable, ScrollView } from 'react-native';

import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';
import { useApolloClient, useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  const user = data?.me;
  const logOut = async () => {
    console.log('logging out');
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal>
        {
          <>
            <AppBarTab to={'/'} text={'Repositories'}></AppBarTab>
            {!user && (
              <>
                <AppBarTab to={'/login'} text={'Sign in'}></AppBarTab>
                <AppBarTab to={'/signup'} text={'Sign up'}></AppBarTab>
              </>
            )}
            {user && (
              <>
                <AppBarTab to={'/review'} text={'Create a review'}></AppBarTab>
                <AppBarTab to={'/reviews'} text={'My reviews'}></AppBarTab>
                <AppBarTab
                  to={'/'}
                  text={'Sign out'}
                  onPress={logOut}
                ></AppBarTab>
              </>
            )}
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
