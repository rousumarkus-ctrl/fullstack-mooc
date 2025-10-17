import { Link, useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import { ItemSeparator } from './RepositoryList';
import useDelete from '../hooks/useDelete';

const styles = StyleSheet.create({
  firstLine: { flexDirection: 'row', justifyContent: 'space-around' },
  descriptions: { flexDirection: 'column', flexGrow: 1 },
  background: {
    backgroundColor: 'white',
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  separator: {
    height: 10,
  },
  rating: {
    color: theme.colors.primary,
  },
  blueLinkBackground: {
    backgroundColor: theme.colors.primary,
    margin: 5,
    padding: 5,
    flexGrow: 1,
  },
  redLinkBackground: {
    backgroundColor: theme.colors.error,
    margin: 5,
    padding: 5,
    flexGrow: 1,
  },
});

export const ReviewItem = ({ review, userReviews, refetch }) => {
  const [mutate, result] = useDelete();
  const deleteRev = async () => {
    try {
      const result = await mutate({ id: review.id });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmit = async () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: deleteRev }]
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.firstLine}>
        <View style={styles.circle}>
          <Text
            fontSize={'subheading'}
            fontWeight={'bold'}
            style={styles.rating}
          >
            {review.rating}
          </Text>
        </View>
        <View style={styles.descriptions}>
          <Text fontSize={'subheading'} fontWeight={'bold'}>
            {userReviews ? review.repository.fullName : review.user.username}
          </Text>
          <Text>{format(review.createdAt, 'dd-MM-yyyy')}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {userReviews && (
        <View style={styles.firstLine}>
          <Link
            to={`/${review.repositoryId}`}
            style={styles.blueLinkBackground}
          >
            <Text style={styles.linkText}>View repository</Text>
          </Link>
          <Pressable style={styles.redLinkBackground} onPress={onSubmit}>
            <Text style={styles.linkText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const variables = { repositoryId: id, first: 10 };
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repository = data?.repository;
  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];
  const reviews = reviewNodes;

  const onEndReach = () => {
    handleFetchMore();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showUrl={true} />
      )}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReach}
    />
  );
};

export default SingleRepository;
