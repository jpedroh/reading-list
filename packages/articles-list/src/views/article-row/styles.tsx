import type { ComponentProps } from "react";
import {
  Link as RACLink,
  type LinkProps as RACLinkProps,
} from "react-aria-components";
import { twc } from "react-twc";

export const Container = twc.li<
  ComponentProps<"li">
>`border border-zinc-700 bg-zinc-800 bg-opacity-30 hover:bg-opacity-100 transition-all duration-300 rounded-xl p-4 flex flex-col gap-4 relative focus-within:ring-2 focus-within:ring-blue-600`;

export const Title = twc(RACLink)<RACLinkProps>`
  text-xl font-bold after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 outline-none
`;

export const Info = twc.div<
  ComponentProps<"div">
>`flex items-center justify-between text-zinc-400 overflow-auto`;

export const DateAdded = twc.span<ComponentProps<"span">>`hidden md:block`;

export const TagsList = twc.ul<ComponentProps<"ul">>`flex gap-2`;

export const Tag = twc.li<
  ComponentProps<"li">
>`bg-blue-800 bg-opacity-50 text-white py-1 text-sm px-3 rounded-xl`;
