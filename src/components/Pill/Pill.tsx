import s from './Pill.module.scss';

/**
 * Props Type Interface for {@link Pill}
 */
export interface PillProps {
  className?: string;
  text: string;
  onClick?: () => void;
}

/**
 * Component to display a pill
 * @param {PillProps} props
 * @returns {JSX.Element}
 */
const Pill = ({ className, text, onClick }: PillProps): JSX.Element => {
  return (
    <span
      className={[s.wrapper, s[onClick ? 'clickable' : ''], className].join(
        ' ',
      )}
      onClick={onClick}>
      {text}
    </span>
  );
};

export default Pill;
