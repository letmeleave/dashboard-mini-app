import type { FC, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({ name, label, onChange, value }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input id={name} onChange={onChange} value={value} />
    </div>
  );
};

export default Input;
