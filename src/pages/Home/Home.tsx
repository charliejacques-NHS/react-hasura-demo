import { useSiteTitle } from '@app/hooks';
import s from './Home.module.scss';

/**
 * The home page of the application
 * @returns {JSX.Element}
 */
const Home = (): JSX.Element => {
  useSiteTitle('home');

  return (
    <div className={s.wrapper}>
      <p>This is the home page!</p>
    </div>
  );
};

export default Home;
