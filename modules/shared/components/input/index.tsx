"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./index.module.css";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  props,
  ref
) {
  return <input ref={ref} className={styles.container} {...props} />;
});
