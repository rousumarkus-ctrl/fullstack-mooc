import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import useReview from '../hooks/useReview';

const styles = StyleSheet.create({
  background: { backgroundColor: 'white' },
  input: {
    borderWidth: 1,
    margin: 5,
  },
  error: { color: theme.colors.error, paddingLeft: 10 },
  errorBorder: { borderColor: theme.colors.error },
  button: { margin: 5, backgroundColor: theme.colors.primary },
});

const validationSchema = yup.object().shape({
  owner: yup.string().required('Repository owner name is required'),
  name: yup.string().required('Reposity name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  review: yup.string(),
});

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  review: '',
};

export const ReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.background}>
      <TextInput
        style={[
          styles.input,
          formik.touched.owner && formik.errors.owner && styles.errorBorder,
        ]}
        placeholder="Repository owner name"
        value={formik.values.owner}
        onChangeText={formik.handleChange('owner')}
      ></TextInput>
      {formik.touched.owner && formik.errors.owner && (
        <Text style={styles.error}>{formik.errors.owner}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.name && formik.errors.name && styles.errorBorder,
        ]}
        placeholder="Repository name"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
      ></TextInput>
      {formik.touched.name && formik.errors.name && (
        <Text style={styles.error}>{formik.errors.name}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && styles.errorBorder,
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      ></TextInput>
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.review && formik.errors.review && styles.errorBorder,
        ]}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
      ></TextInput>
      {formik.touched.review && formik.errors.review && (
        <Text style={styles.error}>{formik.errors.review}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ textAlign: 'center', color: 'white' }}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const Review = () => {
  const navigate = useNavigate();
  const [mutate, result] = useReview();

  const onSubmit = async (values) => {
    const { owner, name, rating, review } = values;

    try {
      const result = await mutate({
        ownerName: owner,
        repositoryName: name,
        rating: Number(rating),
        text: review,
      });
      navigate(`/${result.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewContainer onSubmit={onSubmit}></ReviewContainer>;
};

export default Review;
