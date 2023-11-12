import { MouseEventHandler, FC } from 'react';
import styles from './button.module.css';

interface ButtonProps {
  text: string;
  handler: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  text,
  handler,
  disabled = false,
}) => {
  return (
    <button
      type='button'
      className={styles.button}
      onClick={handler}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
