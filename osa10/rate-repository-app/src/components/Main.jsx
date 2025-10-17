import { StyleSheet, View } from 'react-native';

import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import Review from './Review';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/login" element={<SignIn></SignIn>}></Route>
        <Route
          path=":id"
          element={<SingleRepository></SingleRepository>}
        ></Route>
        <Route path="/review" element={<Review></Review>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/reviews" element={<UserReviews></UserReviews>}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
