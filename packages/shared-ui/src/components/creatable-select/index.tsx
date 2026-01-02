import type { ComponentPropsWithoutRef } from "react";
import ReactCreatableSelect from "react-select/creatable";

export function CreatableSelect(
  props: ComponentPropsWithoutRef<typeof ReactCreatableSelect>,
) {
  return (
    <ReactCreatableSelect
      classNames={{
        menu: (_) => "!bg-zinc-800",
        option: (state) =>
          state.isFocused ? "!bg-blue-800 !bg-opacity-50" : "",
        control: (state) => {
          const className =
            "!border !rounded-lg !p-1 !w-full !bg-zinc-800 !bg-opacity-30 hover:!bg-opacity-100 focus:!bg-opacity-100 !transition-all !duration-300 hover:!border-white";
          return `${className} ${
            state.isFocused ? "!border-white" : "!border-zinc-700"
          }`;
        },
        multiValue: (_) => "!bg-blue-800 !bg-opacity-70 !rounded-md",
        multiValueLabel: (_) => "!text-white !px-2",
        multiValueRemove: (_) =>
          "!bg-blue-800 !bg-opacity-80 hover:!bg-red-800 hover:!bg-opacity-70 !rounded-r-md",
        input: (_) => "!text-white placeholder:!text-zinc-400 ",
      }}
      {...props}
    />
  );
}
