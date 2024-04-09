import { useQuery } from 'urql';
import { useNavigate } from 'react-router-dom';
import { Digital } from 'react-activity';
import s from './SignIn.module.scss';
import { useAuthContext } from '@app/context';
import { ACTIONS } from '@app/graphql';
import { SignInForm } from '@app/forms';
import { ROUTES } from '@app/types';

/**
 * Sign in page
 * @returns {JSX.Element}
 */
const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const { username, setUserId, setRole } = useAuthContext();
  const [{ data, fetching, error }] = useQuery({
    query: ACTIONS.GET_USER_DETAILS,
    variables: { username },
    pause: username === '',
  });

  if (fetching) return <Digital />;

  const userId = data?.get_user_details.user_id;
  const role = data?.get_user_details.group_name;
  if (userId && role) {
    setRole(role);
    setUserId(userId);
    navigate(ROUTES.HOME);
  }

  return (
    <div className={s.wrapper}>
      {error && <p>{JSON.stringify(error)}</p>}
      <SignInForm />
    </div>
  );
};

export default SignIn;
