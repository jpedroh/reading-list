import type { ComponentProps } from "react";
import { twc } from "react-twc";

export const Container = twc.div<
  ComponentProps<"div">
>`flex md:flex-col gap-2 overflow-auto`;

export const TagItem = twc.label<
  ComponentProps<"label"> & { checked: boolean }
>(
  ({ checked: selected }) =>
    `border border-zinc-700 bg-zinc-800 hover:bg-opacity-100 transition-all duration-300 rounded-xl flex gap-2 cursor-pointer p-3 ring-inset focus-within:ring-2 focus-within:ring-blue-600 outline-none ${
      selected ? "bg-opacity-100" : "bg-opacity-30"
    }`,
);
