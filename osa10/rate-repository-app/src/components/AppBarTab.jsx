import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  item: {
    marginRight: 10,
  },
});

const AppBarTab = ({ to, text, onPress }) => {
  return (
    <Link to={to} style={styles.item} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;
