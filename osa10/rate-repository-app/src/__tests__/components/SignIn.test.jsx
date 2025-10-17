import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit}></SignInContainer>);

      fireEvent.changeText(
        screen.getByPlaceholderText('Username'),
        'myusername'
      );
      fireEvent.changeText(
        screen.getByPlaceholderText('Password'),
        'mypassword'
      );
      fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'myusername',
          password: 'mypassword',
        });
      });
    });
  });
});
