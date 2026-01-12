import type { ComponentProps } from "react";
import { twc } from "react-twc";

export const Form = twc.form<ComponentProps<"form">>`flex flex-col gap-4`;
