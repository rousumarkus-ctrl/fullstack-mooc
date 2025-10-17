import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (type, searchKeyword) => {
  let orderBy = '';
  let orderDirection = '';
  switch (type) {
    case 'highest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    default:
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
  }
  const variables = { orderBy, orderDirection, searchKeyword, first: 10 };
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositories = data?.repositories;

  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
