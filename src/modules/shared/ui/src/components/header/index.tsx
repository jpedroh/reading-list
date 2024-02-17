"use client";

import { Heading } from "react-aria-components";
import { twc } from "react-twc";

export const HeaderRoot = twc.header`flex items-center justify-between gap-4`;

export const HeaderTitle = twc(Heading).attrs({
  level: 1,
})`text-2xl md:text-4xl font-bold`;
