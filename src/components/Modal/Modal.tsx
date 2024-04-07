import { createPortal } from 'react-dom';
import s from './Modal.module.scss';
import { PropsWithChildren } from 'react';

/**
 * Props Type Interface for {@link Modal}
 */
export interface ModalProps extends PropsWithChildren {
  show: boolean;
}

/**
 * Component wrapper for a Modal
 * @param {ModalProps} props
 * @returns {JSX.Element}
 */
const Modal = ({ show, children }: ModalProps): JSX.Element => {
  const container = document.getElementById('modal-portal');

  if (!container) throw new Error('No Modal Root Container found!');

  return createPortal(
    <div className={[s.wrapper, s[!show ? 'hidden' : '']].join(' ')}>
      {children}
    </div>,
    container,
  );
};

export default Modal;
