import { Image, Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import Stat from './Stat';
import theme from '../theme';
import { openURL } from 'expo-linking';

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
  linkBackground: {
    backgroundColor: theme.colors.primary,
    padding: 5,
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
  },
});

const RepositoryItem = ({ item, showUrl }) => {
  if (!item) {
    return <></>;
  }
  return (
    <View testID="repositoryItem" style={styles.background}>
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
      {showUrl && (
        <Pressable
          style={styles.linkBackground}
          onPress={() => openURL(item.url)}
        >
          <Text style={styles.linkText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
