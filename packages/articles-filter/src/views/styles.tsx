import { Heading, type HeadingProps } from "react-aria-components";
import { twc } from "react-twc";

export const Title = twc(
  Heading,
)<HeadingProps>`uppercase text-sm text-zinc-400 font-bold mb-2`;
