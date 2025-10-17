import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const review = async ({ ownerName, rating, repositoryName, text }) => {
    const { data } = await mutate({
      variables: { review: { ownerName, rating, repositoryName, text } },
    });
    return data;
  };

  return [review, result];
};

export default useReview;
