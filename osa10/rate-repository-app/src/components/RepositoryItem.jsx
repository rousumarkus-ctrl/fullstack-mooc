import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import Stat from './Stat';
import theme from '../theme';

const styles = StyleSheet.create({
  firstLine: { flexDirection: 'row' },
  descriptions: { flexDirection: 'column', flexGrow: 1 },
  background: {
    backgroundColor: 'white',
  },
  image: {
    height: 50,
    width: 50,
    margin: 10,
  },
  languageBackground: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    padding: 5,
  },
  languageText: {
    color: 'white',
  },
  stats: { flexDirection: 'row', justifyContent: 'space-evenly' },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.background}>
      <View style={styles.firstLine}>
        <Image
          style={styles.image}
          source={{ uri: item.ownerAvatarUrl }}
        ></Image>
        <View style={styles.descriptions}>
          <Text fontWeight={'bold'} fontSize={'subheading'}>
            {item.fullName}
          </Text>
          <Text>{item.description}</Text>
          <View style={styles.languageBackground}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        <Stat amount={item.stargazersCount} text={'Stars'}></Stat>
        <Stat amount={item.forksCount} text={'Forks'}></Stat>
        <Stat amount={item.reviewCount} text={'Reviews'}></Stat>
        <Stat amount={item.ratingAverage} text={'Rating'}></Stat>
      </View>
    </View>
  );
};

export default RepositoryItem;
