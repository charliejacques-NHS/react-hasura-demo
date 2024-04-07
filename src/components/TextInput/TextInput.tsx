import { HTMLProps } from 'react';
import s from './TextInput.module.scss';

/**
 * Props Type interface for {@link TextInput}
 */
export interface TextInputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'type' | 'onChange'> {
  onChange: (text: string) => void;
  label?: string;
}

/**
 * Component for rendering a styled Text Input
 * @param {TextInputProps} props
 * @returns {JSX.Element}
 */
const TextInput = ({
  className,
  onChange,
  label,
  ...props
}: TextInputProps): JSX.Element => {
  return (
    <div className={s.wrapper}>
      {label && <label className={s.label}>{label}</label>}
      <input
        className={[s.input, className].join(' ')}
        type="text"
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default TextInput;
