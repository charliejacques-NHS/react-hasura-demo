import { HTMLProps } from 'react';
import s from './TextInput.module.scss';

/**
 * Props Type interface for {@link TextInput}
 */
export interface TextInputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'type' | 'onChange'> {
  onChange: (text: string) => void;
}

/**
 * Component for rendering a styled Text Input
 * @param {TextInputProps} props
 * @returns {JSX.Element}
 */
const TextInput = ({
  className,
  onChange,
  ...props
}: TextInputProps): JSX.Element => {
  return (
    <input
      className={[s.wrapper, className].join(' ')}
      type="text"
      onChange={e => onChange(e.target.value)}
      {...props}
    />
  );
};

export default TextInput;
