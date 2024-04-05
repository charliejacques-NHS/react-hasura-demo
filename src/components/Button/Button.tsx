import { HTMLProps } from 'react';
import s from './Button.module.scss';
import { BUTTON_TYPE } from './enums';

/**
 * Props Type Interface for {@link Button}
 */
export interface ButtonProps extends HTMLProps<HTMLButtonElement> {}

/**
 * Component which renders a button
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
const Button = ({
  className,
  type = 'button',
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      className={[s.button, className || ''].join(' ')}
      type={type as BUTTON_TYPE}
    />
  );
};

export default Button;
