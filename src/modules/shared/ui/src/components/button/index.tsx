"use client";

import {
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from "react-aria-components";
import { twc } from "react-twc";

export const Button = twc(RACButton)<
  RACButtonProps & { asChild?: boolean }
>`rounded-md bg-blue-800 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40`;
