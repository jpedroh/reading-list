import { Heading } from "react-aria-components";
import { twc } from "react-twc";

export const Header = {
  Root: twc.header`flex items-center justify-between gap-4`,
  Title: twc(Heading).attrs({ level: 1 })`text-2xl md:text-4xl font-bold`,
};
