import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';

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
  username: yup
    .string()
    .min(5, 'Username must be between 5 and 30 letters')
    .max(50, 'Username must be between 5 and 30 letters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be between 5 and 50 letters')
    .max(50, 'Password must be between 5 and 50 letters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

export const SignUpContainer = ({ onSubmit }) => {
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
          formik.touched.username &&
            formik.errors.username &&
            styles.errorBorder,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      ></TextInput>
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.errorBorder,
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
      ></TextInput>
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirm &&
            formik.errors.passwordConfirm &&
            styles.errorBorder,
        ]}
        placeholder="Confirm password"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        secureTextEntry
      ></TextInput>
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.error}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ textAlign: 'center', color: 'white' }}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password, passwordConfirm } = values;

    try {
      const result = await signUp({ username, password });
      if (result) {
        await signIn({ username, password });
      }

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit}></SignUpContainer>;
};

export default SignUp;
