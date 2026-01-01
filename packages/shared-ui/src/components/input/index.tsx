"use client";

import { Input as RACInput } from "react-aria-components";
import { twc } from "react-twc";

export const Input = twc(
  RACInput,
)`border rounded-lg p-3 w-full border-zinc-700 bg-zinc-800 bg-opacity-30 hover:bg-opacity-100 focus:bg-opacity-100 transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600`;
