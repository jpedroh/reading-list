import type { ComponentProps } from "react";
import { Heading, type HeadingProps } from "react-aria-components";
import { twc } from "react-twc";

export const HeaderRoot = twc.header<
  ComponentProps<"header">
>`flex items-center justify-between gap-4`;

export const HeaderTitle = twc(Heading).attrs({
  level: 1,
})<HeadingProps>`text-2xl md:text-4xl font-bold`;
