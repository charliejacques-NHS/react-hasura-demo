import { FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BUTTON_TYPE, Button, TextInput } from '@app/components';
import s from './SignIn.module.scss';
import { useAuthContext } from '@app/context';

/**
 * Form for signing in to the web page
 * @returns {JSX.Element}
 */
const SignIn = (): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [formError, setFormError] = useState<string>();
  const { t } = useTranslation();
  const { setUsername: setGlobalUsername } = useAuthContext();

  const submitHandler: FormEventHandler = e => {
    e.preventDefault();
    if (username !== '') {
      setGlobalUsername(username);
    } else {
      setFormError(t('usernameFormError'));
    }
  };

  return (
    <form className={s.wrapper} onSubmit={submitHandler}>
      {formError && <p>{formError}</p>}
      <h1>{t('signIn')}</h1>
      <TextInput
        placeholder={t('usernamePlaceholder')}
        value={username}
        onChange={text => setUsername(text)}
      />
      <Button type={BUTTON_TYPE.SUBMIT}>{t('continue')}</Button>
    </form>
  );
};

export default SignIn;
