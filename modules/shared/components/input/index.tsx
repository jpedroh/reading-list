'use client'

import { InputHTMLAttributes } from "react";
import styles from './index.module.css';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className">

export function Input(props: Props) {
    return <input className={styles.container} {...props} />
}