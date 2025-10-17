import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { ItemSeparator } from './RepositoryList';
import { FlatList } from 'react-native';
import { ReviewItem } from './SingleRepository';

const UserReviews = () => {
  const result = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const refetch = result.refetch;

  const edges = result.data?.me.reviews.edges;
  const reviewNodes = edges ? edges.map((edge) => edge.node) : [];
  const reviews = reviewNodes;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} userReviews={true} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default UserReviews;
